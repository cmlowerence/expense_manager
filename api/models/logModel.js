const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  dateTime: { type: Date, default: Date.now},
  userName: { type: String, required: true },
  itemName: { type: String, required: true },
  itemQuantity: { type: Number, required: true },
  totalExpense: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  remarks: { type: String, required: false },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;