import express from 'express';
import cors from 'cors';

// rest of your server code


const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * In-memory storage for device locations.
 * Key: deviceId, Value: { lat, lng, updatedAt }
 */
const locations = {};

// POST endpoint to update device location
app.post('/api/location/update', (req, res) => {
  const { device_id, lat, lng } = req.body;

  if (!device_id || !lat || !lng) {
    return res.status(400).json({ error: 'device_id, lat, and lng are required' });
  }

  locations[device_id] = {
    lat,
    lng,
    updatedAt: new Date().toISOString(),
  };

  console.log(`Location updated for ${device_id}:`, locations[device_id]);

  res.json({ status: 'success', location: locations[device_id] });
});

// GET endpoint to get latest location of a device
app.get('/api/location/:deviceId', (req, res) => {
  const deviceId = req.params.deviceId;

  const location = locations[deviceId];

  if (!location) {
    return res.status(404).json({ error: 'Location not found for device ' + deviceId });
  }

  res.json(location);
});

app.listen(port, () => {
  console.log(`GPS Tracking backend running on http://localhost:${port}`);
});
