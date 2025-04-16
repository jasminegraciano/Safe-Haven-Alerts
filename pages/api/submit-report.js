import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("📝 API: Received alert submission");
    const { title, category, description, address, latitude, longitude } = req.body;
    console.log("Request data:", { title, category, description, address, latitude, longitude });

    // Validate required fields
    if (!title || !category || !description || !address || !latitude || !longitude) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ 
        message: "Missing required fields",
        receivedData: { title, category, description, address, latitude, longitude }
      });
    }

    // Validate category
    const validCategories = ['COMMUNITY_CENTER', 'PUBLIC_SAFETY', 'LAW_ENFORCEMENT_PRESENCE', 'HOTSPOT'];
    if (!validCategories.includes(category)) {
      console.error("❌ Invalid category:", category);
      return res.status(400).json({ 
        message: "Invalid category",
        validCategories 
      });
    }

    // Create the alert
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
    return res.status(200).json({ 
      message: "Alert created successfully",
      alert 
    });

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