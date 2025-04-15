import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default async function handler(req, res) {
  console.log('🟡 API called'); //added this to debug check

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!API_KEY) {
    console.log('❌ API key missing'); //added this to check bug
    return res.status(500).json({ message: 'Missing Google Maps API Key' });
  }

  try {
    const { title, category, description, address } = req.body;
    console.log('📦 Request body received:', req.body);

    if (!title || !category || !description || !address) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 🌍 Geocode
    console.log('📍 Sending to Geocoding API...');
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );
    console.log('📡 Google Response Status:', geoRes.status);
    const data = await geoRes.json();
    console.log('🌍 Geocoding data:', data);

    if (!data.results || !data.results[0]) {
      console.log('❌ Invalid geocode result');
      return res.status(400).json({ message: 'Invalid address' });
    }

    const location = data.results[0].geometry.location;

    // 💾 Save to DB
    console.log('💾 Saving to DB...');
    const newAlert = await prisma.alert.create({
      data: {
        title,
        category,
        description,
        address,
        latitude: location.lat,
        longitude: location.lng,
      },
    });

    console.log('✅ Alert saved:', newAlert);
    res.status(200).json({ message: 'Alert submitted', alert: newAlert });

  } catch (error) {
    console.error('❌ FINAL ERROR:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
