const Log = require('../models/logModel');

const createLogEntry = async (req, res) => {
  const { userName, itemName, itemQuantity, totalExpense, paymentMethod, remarks } = req.body;

  if (!userName || !itemName || !itemQuantity || !totalExpense || !paymentMethod) {
    return res.status(400).json({ message: 'Please provide all required fields!'});
  }

  try {
    const logEntry = new Log({ userName, itemName, itemQuantity, totalExpense, paymentMethod, remarks });
    await logEntry.save();
    res.status(201).json({ message: 'Log entry created successfully', data: logEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating log entry', error });
  }
};

const viewLogData = async (req, res) => {
  try {
    const expenses = await Log.find();
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses: ", error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createLogEntry, viewLogData };