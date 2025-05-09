import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log("❌ Wrong method:", req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("📝 API: Received request");
    console.log("Request body:", req.body);
    
    const { title, category, description, address, latitude, longitude } = req.body;

    // Validate required fields
    if (!title || !category || !description || !address || !latitude || !longitude) {
      console.error("❌ API: Missing required fields");
      console.log("Received data:", { title, category, description, address, latitude, longitude });
      return res.status(400).json({ 
        message: "Missing required fields",
        receivedData: { title, category, description, address, latitude, longitude }
      });
    }

    // Validate category enum
    const validCategories = ['COMMUNITY_CENTER', 'PUBLIC_SAFETY', 'LAW_ENFORCEMENT_PRESENCE', 'HOTSPOT'];
    if (!validCategories.includes(category)) {
      console.error("❌ API: Invalid category:", category);
      return res.status(400).json({ 
        message: "Invalid category",
        validCategories,
        receivedCategory: category
      });
    }

    console.log("🔍 API: Creating alert with data:", {
      title,
      category,
      description,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });

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

    console.log("✅ API: Alert created successfully:", alert);
    return res.status(200).json({
      message: "Alert created successfully",
      alert: alert
    });
    
  } catch (error) {
    console.error("❌ API Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Check for specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        message: "This alert already exists",
        error: error.message
      });
    }
    
    return res.status(500).json({ 
      message: "Error creating alert",
      error: error.message,
      code: error.code
    });
  } finally {
    await prisma.$disconnect();
  }
} 