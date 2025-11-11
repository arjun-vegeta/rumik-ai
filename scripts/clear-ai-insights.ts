import { prisma } from "../lib/prisma";

async function clearAIInsights() {
  try {
    const result = await prisma.aIInsight.deleteMany({});
    console.log(`✅ Deleted ${result.count} AI insights from database`);
    console.log("All AI insights cleared. They will be regenerated when you click 'Generate AI Insights'");
  } catch (error) {
    console.error("Error clearing AI insights:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearAIInsights();
