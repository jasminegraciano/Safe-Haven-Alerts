import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const alerts = await prisma.alert.findMany();
      res.status(200).json(alerts);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      res.status(500).json({ error: 'Unable to fetch alerts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// 🔍 Google Geocoding function inside the same file
async function geocodeAddress(address) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Invalid address');
  }

  const location = data.results[0].geometry.location;
  return {
    lat: location.lat,
    lng: location.lng,
  };
}
