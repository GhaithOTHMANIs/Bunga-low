const mongoose = require("mongoose");
const Bungalow = require("../models/Bungalow");
const Reservation = require("../models/Reservation");

async function getAllBungalows(req, res) {
  try {
    const bungalows = await Bungalow.find();
    res.status(200);
    res.render("bungalows", { bungalows });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error retrieving bungalows", details: err.message });
  }
}

async function getBungalowDetails(req, res) {
  const id = req.params.id;

  try {
    const bungalow = await Bungalow.findById(id);
    if (!bungalow) {
      return res.status(404).json({ error: "Bungalow not found" });
    }
    res.status(200).render("bungalow_detail", { bungalow });
  } catch (err) {
    console.error("Error retrieving bungalow details:", err);
    res.status(500).json({
      error: "Error retrieving bungalow details",
      details: err.message,
    });
  }
}

async function addBungalowPage(req, res) {
  try {
    const bungalows = await Bungalow.find();
    console.log(bungalows);
    res.render("bungalow_create", { bungalows });
  } catch (err) {
    res.status(500).send("Error fetching bungalows: " + err.message);
  }
}
async function addBungalow(req, res) {
  const { address, description, type, status, price, images, location } =
    req.body;

  try {
    const newBungalow = new Bungalow({
      address,
      description,
      type,
      status,
      price,
      images,
      location,
    });

    await newBungalow.save();
    res.status(201).json({ message: "Bungalow added successfully!" });
  } catch (err) {
    console.error("Error adding bungalow:", err);
    res
      .status(500)
      .json({ error: "Error adding bungalow", details: err.message });
  }
}

async function editBungalowPage(req, res) {
  const bungalowId = req.params.id;
  console.log(bungalowId);

  try {
    const bungalow = await Bungalow.findById(bungalowId);

    if (!bungalow) {
      return res.status(404).send("Bungalow not found");
    }
    console.log(bungalow);
    res.render("bungalow_edit", { bungalow });
  } catch (err) {
    res.status(500).send("Error fetching bungalow: " + err.message);
  }
}

async function editBungalow(req, res) {
  const { address, description, type, status, price, images, location } =
    req.body;
  console.log(location);
  let imagesArray = images;
  if (typeof images === "string") {
    imagesArray = images.split(",").map((url) => ({ url: url.trim() }));
  }

  const data = {
    address,
    description,
    type,
    status,
    price,
    images: imagesArray,
    location: {
      type: "Point",
      coordinates: [location.coordinates[0], location.coordinates[1]],
    },
  };

  try {
    const updatedBungalow = await Bungalow.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updatedBungalow) {
      return res.status(404).send("Bungalow not found");
    }

    res.json({
      message: "Bungalow updated successfully",
      bungalow: updatedBungalow,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating bungalow", details: err.message });
  }
}

async function deleteBungalow(req, res) {
  const { id } = req.params;

  try {
    const deletedBungalow = await Bungalow.findByIdAndDelete(id);

    if (!deletedBungalow) {
      console.log("Bungalow not found or already deleted.");
      return res.status(404).send("Bungalow not found or already deleted.");
    }

    const updatedReservations = await Reservation.updateMany(
      { bungalow: id },
      { $set: { status: "cancelled" } }
    );

    console.log("Bungalow deleted successfully:", deletedBungalow);
    console.log(
      "Updated associated reservations to 'cancelled':",
      updatedReservations.modifiedCount
    );

    res.send(
      `Bungalow deleted successfully, and ${updatedReservations.modifiedCount} associated reservations were updated to 'cancelled'.`
    );
  } catch (err) {
    console.error("Error deleting bungalow:", err);
    res.status(500).send("An error occurred while deleting the bungalow.");
  }
}

async function locateBungalow(req, res) {
  try {
    const bungalowId = req.params.id;
    const bungalow = await Bungalow.findById(bungalowId);

    if (!bungalow) {
      return res.status(404).json({ error: "Bungalow not found" });
    }

    if (!bungalow.location || !bungalow.location.coordinates) {
      return res
        .status(400)
        .json({ error: "Location not available for this bungalow" });
    }

    const [longitude, latitude] = bungalow.location.coordinates;

    res.status(200).json({ latitude, longitude });
  } catch (err) {
    console.error("Error locating bungalow:", err);
    res
      .status(500)
      .json({ error: "Error locating bungalow", details: err.message });
  }
}

async function getAllBungalowsAPI(req, res) {
  try {
    const bungalows = await Bungalow.find();
    res.status(200).json({ bungalows });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error retrieving bungalows", details: err.message });
  }
}

async function searchBungalow(req, res) {
  const query = req.query.q;

  try {
    const bungalows = await Bungalow.find({
      $or: [
        { address: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(bungalows);
  } catch (error) {
    console.error("Error searching for bungalows:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllBungalows,
  getBungalowDetails,
  addBungalowPage,
  addBungalow,
  editBungalowPage,
  editBungalow,
  deleteBungalow,
  locateBungalow,
  getAllBungalowsAPI,
  searchBungalow,
};
