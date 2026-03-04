import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Dynamically reads the /public/portfolio/confidential/ directory at runtime
// so the client carousel always has the latest images without needing code edits.
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const dirPath = path.join(process.cwd(), "public", "portfolio", "confidential");
        let files: string[] = [];

        if (fs.existsSync(dirPath)) {
            // Read folder and keep only image files
            files = fs.readdirSync(dirPath).filter(f =>
                f.endsWith(".png") || f.endsWith(".jpg") ||
                f.endsWith(".jpeg") || f.endsWith(".webp") || f.endsWith(".gif")
            );
        }

        // Return exactly what was found
        return NextResponse.json({ files });
    } catch (error) {
        console.error("Error reading confidential folder:", error);
        return NextResponse.json({ files: [] });
    }
}
