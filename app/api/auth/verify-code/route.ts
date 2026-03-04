import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
    ? Redis.fromEnv()
    : null;

export async function POST(req: Request) {
    try {
        const { phone, code } = await req.json();

        if (!phone || !code) {
            return NextResponse.json({ error: "Missing phone or code" }, { status: 400 });
        }

        let isVerified = false;

        // Verify using Upstash Redis
        if (redis) {
            const storedCode = await redis.get(`auth_code:${phone}`);

            if (storedCode && storedCode.toString() === code) {
                isVerified = true;
                // Delete the code so it cannot be reused
                await redis.del(`auth_code:${phone}`);
            }
        } else {
            // Development fallback block allowing UI verification without a real database
            if (code === "123456") {
                isVerified = true;
                console.log(`[Redis Mock] Bypassed verification for ${phone} using root code.`);
            }
        }

        if (isVerified) {
            // TODO: Optional: Set a secure HttpOnly JWT cookie here if we want persistence via middleware.
            return NextResponse.json({ success: true, message: "Verification successful" });
        } else {
            return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 });
        }

    } catch (error) {
        console.error("Error verifying auth code:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
