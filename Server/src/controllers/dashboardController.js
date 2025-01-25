import mongoose from "mongoose";
import Blog from "../models/BlogModel.js";
import Plant from "../models/PlantModel.js";
import PlantRequest from "../models/PlantRequestModel.js";

export const getFarmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user.sub;

    if (!farmerId) {
      return res.status(401).json({
        StatusCode: 401,
        IsSuccess: false,
        ErrorMessage: [{ message: "Authentication required" }],
      });
    }

    const [totalBlogs, totalPlants, plantRequests, commentStats, plantStats] =
      await Promise.all([
        Blog.countDocuments({ author: farmerId }),
        Plant.countDocuments({ farmerId }),
        PlantRequest.countDocuments({
          plantId: { $in: await Plant.find({ farmerId }).distinct("_id") },
        }),
        Blog.aggregate([
          { $match: { author: new mongoose.Types.ObjectId(farmerId) } },
          { $unwind: "$comments" },
          { $group: { _id: null, total: { $sum: 1 } } },
        ]),
        Plant.aggregate([
          { $match: { farmerId: new mongoose.Types.ObjectId(farmerId) } },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$price" },
              averagePrice: { $avg: "$price" },
            },
          },
        ]),
      ]);

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        summary: {
          totalBlogs,
          totalPlants,
          totalRequests: plantRequests,
          totalComments: commentStats[0]?.total || 0,
          totalRevenue: plantStats[0]?.totalRevenue || 0,
          averagePlantPrice: plantStats[0]?.averagePrice || 0,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: error.message }],
    });
  }
};

export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user.sub;

    const dashboardData = await Promise.all([
      PlantRequest.countDocuments({ sellerId }),
      PlantRequest.aggregate([
        { $match: { sellerId: new mongoose.Types.ObjectId(sellerId) } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      PlantRequest.aggregate([
        {
          $match: {
            sellerId: new mongoose.Types.ObjectId(sellerId),
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: "$requestedPrice" },
            averagePrice: { $avg: "$requestedPrice" },
          },
        },
      ]),
    ]);

    const [totalRequests, requestsByStatus, financialStats] = dashboardData;

    const statusCounts = requestsByStatus.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        summary: {
          totalRequests,
          requestsByStatus: statusCounts,
          totalSpent: financialStats[0]?.totalSpent || 0,
          averageRequestPrice: financialStats[0]?.averagePrice || 0,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: [{ message: error.message }],
    });
  }
};
