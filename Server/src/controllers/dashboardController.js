import mongoose from "mongoose";
import Blog from "../models/BlogModel.js";
import Plant from "../models/PlantModel.js";
import PlantRequest from "../models/PlantRequestModel.js";

export const getFarmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user.sub;

    const [plantOverview, earnings, recentActivity] = await Promise.all([
      Plant.aggregate([
        { $match: { farmerId: new mongoose.Types.ObjectId(farmerId) } },
        {
          $group: {
            _id: null,
            totalPlants: { $sum: 1 },
            totalStock: { $sum: "$quantity" },
            totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
            avgPrice: { $avg: "$price" },
          },
        },
      ]),

      PlantRequest.aggregate([
        {
          $match: {
            plantId: { $in: await Plant.find({ farmerId }).distinct("_id") },
            status: "completed",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            revenue: { $sum: "$requestedPrice" },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]),

      Promise.all([
        Blog.find({ author: farmerId }).sort("-createdAt").limit(3),
        PlantRequest.find({
          plantId: { $in: await Plant.find({ farmerId }).distinct("_id") },
        })
          .sort("-createdAt")
          .limit(5)
          .populate("sellerId", "name"),
      ]),
    ]);

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        overview: {
          totalPlants: plantOverview[0]?.totalPlants || 0,
          totalStock: plantOverview[0]?.totalStock || 0,
          totalValue: plantOverview[0]?.totalValue || 0,
          avgPrice: plantOverview[0]?.avgPrice || 0,
        },
        earnings: {
          monthly: earnings,
          total: earnings.reduce((sum, month) => sum + month.revenue, 0),
        },
        recentActivity: {
          blogs: recentActivity[0],
          orders: recentActivity[1].map((order) => ({
            id: order._id,
            buyer: order.sellerId.name,
            amount: order.requestedPrice,
            status: order.status,
            date: order.createdAt,
          })),
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

    const [orderStats, spending, inventory] = await Promise.all([
      // Order stats
      PlantRequest.aggregate([
        { $match: { sellerId: new mongoose.Types.ObjectId(sellerId) } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            total: { $sum: "$requestedPrice" },
          },
        },
      ]),

      // Monthly spending
      PlantRequest.aggregate([
        { $match: { sellerId: new mongoose.Types.ObjectId(sellerId) } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
            spent: { $sum: "$requestedPrice" },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]),

      // Current inventory
      PlantRequest.aggregate([
        {
          $match: {
            sellerId: new mongoose.Types.ObjectId(sellerId),
            status: "completed",
          },
        },
        {
          $lookup: {
            from: "plants",
            localField: "plantId",
            foreignField: "_id",
            as: "plant",
          },
        },
        { $unwind: "$plant" },
        {
          $group: {
            _id: "$plant.name",
            quantity: { $sum: "$quantity" },
            spent: { $sum: "$requestedPrice" },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      StatusCode: 200,
      IsSuccess: true,
      Result: {
        orders: {
          status: orderStats.reduce((acc, stat) => {
            acc[stat._id] = {
              count: stat.count,
              total: stat.total,
            };
            return acc;
          }, {}),
          total: orderStats.reduce((sum, stat) => sum + stat.count, 0),
        },
        spending: {
          monthly: spending,
          total: spending.reduce((sum, month) => sum + month.spent, 0),
        },
        inventory: inventory.map((item) => ({
          name: item._id,
          quantity: item.quantity,
          value: item.spent,
        })),
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
