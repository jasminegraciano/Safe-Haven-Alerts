import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("📝 Received alert data:", req.body);
    
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

    console.log("🔍 Creating alert with data:", {
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

    console.log("✅ Alert created successfully:", alert);
    return res.status(200).json(alert);
    
  } catch (error) {
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Send more detailed error message
    return res.status(500).json({ 
      message: "Error creating alert",
      error: error.message,
      code: error.code
    });
  } finally {
    await prisma.$disconnect();
  }
} 