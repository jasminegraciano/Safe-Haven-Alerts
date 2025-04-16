import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("🔍 Attempting to fetch alerts from database...");
    
    const alerts = await prisma.alert.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        latitude: true,
        longitude: true,
        address: true,
        createdAt: true
      }
    });
    
    console.log("✅ Successfully fetched alerts:", JSON.stringify(alerts, null, 2));
    
    if (!alerts || alerts.length === 0) {
      console.log("ℹ️ No alerts found in database");
      return res.status(200).json([]);
    }

    return res.status(200).json(alerts);
    
  } catch (error) {
    console.error("❌ Database error:", error);
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({ 
      message: "Error fetching alerts",
      error: error.message 
    });
  } finally {
    await prisma.$disconnect();
  }
}
