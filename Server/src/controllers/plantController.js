import Plant from "../models/PlantModel.js";
import cloudinary from "cloudinary";

export const addPlant = async (req, res) => {
  try {
    const farmerId = req.user.sub;
    console.log(farmerId);
    let {
      name,
      quantity,
      price,
      location,
      deliveryTime,
      description,
      category,
      harvestDate,
      shelfLife,
    } = req.body;

    shelfLife = parseInt(shelfLife);

    category = category.toLowerCase();

    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "plant_images",
          public_id: `plant_${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}`,
        });
        imageUrls.push(result.secure_url);
      }
    }

    const plant = new Plant({
      farmerId,
      name,
      quantity,
      price,
      location,
      deliveryTime,
      description,
      category,
      harvestDate,
      shelfLife,
      images: imageUrls,
    });

    await plant.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Plant added successfully",
        plant,
      },
    });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: error.message,
      Result: null,
    });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    let updates = { ...req.body };

    if (updates.shelfLife && typeof updates.shelfLife === "string") {
      const match = updates.shelfLife.match(/\d+/);
      if (match) {
        updates.shelfLife = parseInt(match[0], 10);
      } else {
        return res.status(400).json({
          StatusCode: 400,
          IsSuccess: false,
          ErrorMessage: "Invalid format for shelf life",
          Result: null,
        });
      }
    }

    const plant = await Plant.findOneAndUpdate(
      { _id: plantId, farmerId: req.user.sub },
      updates,
      { new: true, runValidators: true }
    );

    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Plant not found or unauthorized",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Plant updated successfully",
        plant,
      },
    });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error updating plant",
      Result: null,
    });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findOneAndDelete({
      _id: plantId,
      farmerId: req.user.sub,
    });

    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Plant not found or unauthorized",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: { message: "Plant deleted successfully", plantId: plantId },
    });
  } catch (error) {
    console.log("Error deleting plant:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error deleting plant",
      Result: null,
    });
  }
};

export const getFarmerPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ farmerId: req.user.sub });

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Plants fetched successfully",
        plants,
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching plants",
      Result: null,
    });
  }
};

export const getPlantDetails = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findById(plantId);

    if (!plant) {
      return res.status(400).json({
        StatusCode: 400,
        IsSuccess: false,
        ErrorMessage: "Plant not found",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "Plant details fetched successfully",
        plant,
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching plant details",
      Result: null,
    });
  }
};

export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find({});

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: {
        message: "All plants fetched successfully",
        plants,
      },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching all plants x",
      Result: null,
    });
  }
};
