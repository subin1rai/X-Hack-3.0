import PlantRequest from "../models/PlantRequestModel.js";
import Plant from "../models/PlantModel.js";

export const createPlantRequest = async (req, res) => {
  try {
    const { plantId } = req.params;
    const { quantity, requestedPrice, deliveryLocation, deliveryDate, notes } =
      req.body;

    if (!quantity || !requestedPrice || !deliveryLocation || !deliveryDate) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: [{ message: "Missing required fields" }],
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
      sellerId: req.user.sellerId,
      plantId,
      quantity,
      requestedPrice,
      deliveryLocation,
      deliveryDate,
      notes,
    });

    await request.save();

    const populatedRequest = await PlantRequest.findById(request._id).populate(
      "plantId",
      "name"
    );

    res.status(201).json({
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
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: "Error creating request" }],
      Result: null,
    });
  }
};
