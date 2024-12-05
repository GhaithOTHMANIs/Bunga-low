const mongoose = require('mongoose');
const Bungalow = require('../models/Bungalow');

async function getAllBungalows(req, res) {
    try {
        const bungalows = await Bungalow.find();
        res.status(200);
        res.render('bungalows', { bungalows });
      } catch (err) {
        res.status(500).json({ error: 'Error retrieving bungalows', details: err.message });
      }
    
}

async function getBungalowDetails(req, res) {
    const id  = req.params.id;

  try {
    const bungalow = await Bungalow.findById(id);
    if (!bungalow) {
      return res.status(404).json({ error: 'Bungalow not found' });
    }
    res.status(200).render('bungalow_detail', { bungalow });
  } catch (err) {
    console.error('Error retrieving bungalow details:', err);
    res.status(500).json({ error: 'Error retrieving bungalow details', details: err.message });
  }
}

async function addBungalowPage(req, res) {
    res.render('bungalow_create');
}

async function addBungalow(req, res) {
    const { address, description, type, status, price, images, location } = req.body;

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
    res.status(201).json({ message: 'Bungalow added successfully!' });
  } catch (err) {
    console.error('Error adding bungalow:', err);
    res.status(500).json({ error: 'Error adding bungalow', details: err.message });
  }
    
}

async function editBungalowPage(req, res) {
  const bungalowId = req.params.id;
  console.log(bungalowId);

  try {
    const bungalow = await Bungalow.findById(bungalowId);
    
    if (!bungalow) {
      return res.status(404).send('Bungalow not found');
    }
    console.log(bungalow);
    res.render('bungalow_edit', { bungalow });
  } catch (err) {
    res.status(500).send('Error fetching bungalow: ' + err.message);
  }
}

async function editBungalow(req, res) {
  const { address, description, type, status, price, images, location } = req.body;
  console.log(location)
let imagesArray = images;
if (typeof images === 'string') {
  imagesArray = images.split(',').map(url => ({ url: url.trim() }));
}

const data = {
  address,
  description,
  type,
  status,
  price,
  images: imagesArray,
  location: {
    type: 'Point',
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
    return res.status(404).send('Bungalow not found');
  }

  res.json({ message: 'Bungalow updated successfully', bungalow: updatedBungalow });
} catch (err) {
  res.status(500).json({ error: 'Error updating bungalow', details: err.message });
}

}


async function deleteBungalow(req, res) {
    const {id} = req.params;

    try {
        const deletedBungalow = await Bungalow.findByIdAndDelete(id);

        if (!deletedBungalow) {
        console.log('Bungalow not found or already deleted.');
        } else {
        console.log('Bungalow deleted successfully:', deletedBungalow);
        }
    } catch (err) {
        console.error('Error deleting bungalow:', err);
    }
    res.send('Bungalow deleted successfully');
}

async function locateBungalow(req, res) {
    res.send('not implemented yet');
}


module.exports = {
    getAllBungalows,
    getBungalowDetails,
    addBungalowPage,
    addBungalow,
    editBungalowPage,
    editBungalow,
    deleteBungalow,
    locateBungalow
} 