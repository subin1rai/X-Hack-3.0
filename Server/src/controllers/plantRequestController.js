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
