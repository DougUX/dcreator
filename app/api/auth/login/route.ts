import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import * as jose from "jose";

// Fallback logic for local environment without real DB keys yet
const isProduction = !!process.env.UPSTASH_REDIS_REST_URL;

const redis = isProduction
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
    : null;

// The secure secret for signing our JWT session cookies
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_local_secret_for_development_only_12345"
);

export async function POST(req: Request) {
    try {
        const { phone, code } = await req.json();

        if (!phone || !code) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        let isValid = false;

        if (isProduction && redis) {
            // Check the database for the user's phone number
            // Expected Redis structure: `user:+447911123456` -> `{ code: "123456", name: "Client" }`
            const userData = await redis.get(`user:${phone}`) as { code: string } | null;

            if (userData && userData.code === code) {
                isValid = true;
                // Log the successful login action
                await redis.lpush(`activity:${phone}`, {
                    action: "Login",
                    timestamp: new Date().toISOString(),
                });
            }
        } else {
            // Development Fallback: If no Redis keys, just accept any phone number with code "123456"
            if (code === "123456") {
                isValid = true;
            }
        }

        if (!isValid) {
            return NextResponse.json({ error: "Invalid phone number or access code." }, { status: 401 });
        }

        // Generate a secure JWT containing the user's phone number
        const token = await new jose.SignJWT({ phone })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30d") // 30 day persistent login
            .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true });

        // Set the secure HTTP-only cookie to authenticate future requests (like /confidential/[id])
        response.cookies.set("confidential_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return response;

    } catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
