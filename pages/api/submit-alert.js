import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, category, description, address, latitude, longitude } = req.body;

    // Validate required fields
    if (!title || !category || !description || !address || !latitude || !longitude) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ 
        message: "Missing required fields",
        receivedData: req.body 
      });
    }

    // Validate category enum
    const validCategories = ['COMMUNITY_CENTER', 'PUBLIC_SAFETY', 'LAW_ENFORCEMENT_PRESENCE', 'HOTSPOT'];
    if (!validCategories.includes(category)) {
      console.error("❌ Invalid category:", category);
      return res.status(400).json({ 
        message: "Invalid category",
        validCategories 
      });
    }

    const alert = await prisma.alert.create({
      data: {
        title,
        category,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    });

    console.log("✅ Alert created successfully:", alert);
    return res.status(200).json(alert);
    
  } catch (error) {
    console.error("❌ Error creating alert:", error);
    return res.status(500).json({ 
      message: "Error creating alert",
      error: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
} 