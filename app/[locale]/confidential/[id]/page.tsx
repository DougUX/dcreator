import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { headers } from "next/headers";

import { cookies } from "next/headers";
import * as jose from "jose";

// The Middleware already strictly protects this route using Jose JWT verification.
// If the user reaches this component, they have a valid Next.js server session cookie.

async function logActivity(id: string) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("confidential_session")?.value;
    if (!sessionToken) return;

    try {
        const JWT_SECRET = new TextEncoder().encode(
            process.env.JWT_SECRET || "fallback_local_secret_for_development_only_12345"
        );
        const { payload } = await jose.jwtVerify(sessionToken, JWT_SECRET);
        const phone = payload.phone as string;

        if (process.env.UPSTASH_REDIS_REST_URL) {
            import('@upstash/redis').then(({ Redis }) => {
                const redis = new Redis({
                    url: process.env.UPSTASH_REDIS_REST_URL!,
                    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
                });

                // Track the specific item view metric for this phone number
                redis.lpush(`activity:${phone}`, {
                    action: `Viewed Project: ${id}`,
                    timestamp: new Date().toISOString()
                }).catch(() => { });
            });
        }
    } catch (e) {
        // Silently ignore JWT/Redis errors during tracking
    }
}

export default async function DummyProjectPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const resolvedParams = await params;

    // Trigger the asynchronous telemetry tracking
    await logActivity(resolvedParams.id);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-white/30 selection:text-white">
            <Header />

            <main className="pt-40 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center min-h-[70vh] justify-center text-center">

                <div className="w-16 h-16 rounded-full bg-white/10 mb-8 flex items-center justify-center border border-white/20">
                    <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mb-6">
                    {resolvedParams.id.replace(/-/g, " ").toUpperCase()}
                </h1>

                <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mb-12">
                    This securely protected routing structure ensures that sensitive data is only served to verified client sessions. Your request ID is actively secured via HTTP-only JWT JSON streaming.
                </p>

                <Link
                    href="/confidential"
                    className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide uppercase text-sm rounded-full overflow-hidden flex items-center justify-center gap-3 transition-transform hover:scale-105"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Grid
                </Link>

            </main>

            <Footer />
        </div>
    );
}
