const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  bungalow: {
    type: Schema.Types.ObjectId,
    ref: "Bungalow",
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "End date must be after the start date.",
    },
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
