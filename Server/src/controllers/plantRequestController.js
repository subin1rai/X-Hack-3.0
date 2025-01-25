import PlantRequest from "../models/PlantRequestModel.js";
import Plant from "../models/PlantModel.js";

export const createPlantRequest = async (req, res) => {
  try {
    const { plantId } = req.params;
    const { quantity, requestedPrice, deliveryLocation, deliveryDate, notes } =
      req.body;

    if (!req.user.sub) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: [{ message: "Seller authentication required" }],
        Result: null,
      });
    }

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "Plant not found" }],
        Result: null,
      });
    }

    const request = new PlantRequest({
      sellerId: req.user.sub,
      plantId,
      quantity,
      requestedPrice,
      deliveryLocation,
      deliveryDate: new Date(deliveryDate),
      notes,
    });

    await request.save();

    const populatedRequest = await PlantRequest.findById(request._id).populate(
      "plantId",
      "name"
    );

    return res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Request created successfully",
        request: populatedRequest,
      },
    });
  } catch (error) {
    console.error("Error creating plant request:", error);
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: error.message || "Error creating request" }],
      Result: null,
    });
  }
};

export const sellerRequest = async (req, res) => {
  try {
    const sellerId = req.user.sub;
    if (!sellerId) {
      return res.status(403).json({
        StatusCode: 403,
        IsSuccess: false,
        ErrorMessage: [{ message: "Unauthorized access for non-sellers" }],
        Result: null,
      });
    }

    const requests = await PlantRequest.find({ sellerId }).populate(
      "plantId",
      "name quantity price location"
    );

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Seller requests fetched successfully",
        requests,
      },
    });
  } catch (error) {
    console.error("Error fetching seller requests:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching seller requests" }],
      Result: null,
    });
  }
};

export const sellerRequestById = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    if (!sellerId) {
      return res.status(403).json({
        StatusCode: 403,
        IsSuccess: false,
        ErrorMessage: [{ message: "Seller ID and Request ID are required" }],
        Result: null,
      });
    }

    const request = await PlantRequest.findOne({
      sellerId: sellerId,
    }).populate("plantId", "name quantity price location");

    if (!request) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: [{ message: "Request not found" }],
        Result: null,
      });
    }

    res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Seller request fetched successfully",
        request,
      },
    });
  } catch (error) {
    console.error("Error fetching seller request:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching seller request" }],
      Result: null,
    });
  }
};

export const getFarmerSellerRequests = async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      deliveryDate,
      status,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const match = {};

    if (location) {
      match.deliveryLocation = new RegExp(location, "i");
    }

    if (minPrice || maxPrice) {
      match.requestedPrice = {};
      if (minPrice) match.requestedPrice.$gte = Number(minPrice);
      if (maxPrice) match.requestedPrice.$lte = Number(maxPrice);
    }

    if (deliveryDate) {
      const startDate = new Date(deliveryDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(deliveryDate);
      endDate.setHours(23, 59, 59, 999);
      match.deliveryDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    if (status) {
      match.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const requests = await PlantRequest.aggregate([
      {
        $lookup: {
          from: "sellers",
          localField: "sellerId",
          foreignField: "_id",
          as: "sellerDetails",
        },
      },
      {
        $lookup: {
          from: "plants",
          localField: "plantId",
          foreignField: "_id",
          as: "plantDetails",
        },
      },
      {
        $unwind: "$sellerDetails",
      },
      {
        $unwind: "$plantDetails",
      },
      {
        $match: match,
      },
      {
        $project: {
          "sellerDetails.password": 0,
          "sellerDetails.email": 0,
          "sellerDetails.__v": 0,
        },
      },
      {
        $sort: { [sortBy]: order === "desc" ? -1 : 1 },
      },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            {
              $addFields: {
                currentPage: Number(page),
                totalPages: {
                  $ceil: {
                    $divide: ["$total", Number(limit)],
                  },
                },
              },
            },
          ],
          data: [{ $skip: skip }, { $limit: Number(limit) }],
        },
      },
    ]);

    const formattedResponse = {
      metadata: requests[0].metadata[0] || {
        total: 0,
        currentPage: Number(page),
        totalPages: 0,
      },
      requests: requests[0].data.map((request) => ({
        requestId: request._id,
        plantDetails: {
          name: request.plantDetails.name,
          quantity: request.plantDetails.quantity,
          price: request.plantDetails.price,
          location: request.plantDetails.location,
        },
        sellerDetails: {
          name: request.sellerDetails.name,
          phone: request.sellerDetails.phone,
          address: request.sellerDetails.address,
          rating: request.sellerDetails.rating,
        },
        requestDetails: {
          quantity: request.quantity,
          requestedPrice: request.requestedPrice,
          deliveryLocation: request.deliveryLocation,
          deliveryDate: request.deliveryDate,
          status: request.status,
          notes: request.notes,
          createdAt: request.createdAt,
        },
      })),
    };

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: [],
      Result: {
        message: "Seller requests fetched successfully",
        pagination: formattedResponse.metadata,
        requests: formattedResponse.requests,
      },
    });
  } catch (error) {
    console.error("Error fetching seller requests for farmer:", error);
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error fetching seller requests" }],
      Result: null,
    });
  }
};
