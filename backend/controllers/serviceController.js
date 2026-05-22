const Service = require("../models/Service");

// Add service
const addService = async (req, res) => {
  try {

    const service = await Service.create(req.body);

    res.status(201).json({
      message: "Service added successfully",
      service,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all services
const getServices = async (req, res) => {
  try {

    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json(services);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update service
const updateService = async (req, res) => {
  try {

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addService,
  getServices,
  updateService,
  deleteService,
};