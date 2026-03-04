import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
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
                    action: `Viewed 3D Bottle: ${id}`,
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
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/30 selection:text-white">
            <Header />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center min-h-screen gap-12 lg:gap-24">

                {/* 3D Bottle Showcase (Left side on desktop, top on mobile) */}
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4] flex-shrink-0 animate-fade-in-up">
                    <div className="absolute inset-0 bg-white/5 rounded-[3rem] shadow-[0_0_80px_rgba(255,255,255,0.02)] border border-white/5 pointer-events-none" />
                    <Image
                        src="/images/perfume_bottle_3d.png"
                        alt={resolvedParams.id}
                        fill
                        className="object-contain drop-shadow-2xl mix-blend-lighten scale-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none rounded-[3rem]" />
                </div>

                {/* Content & Telemetry Info (Right side on desktop, bottom on mobile) */}
                <div className="flex flex-col items-start max-w-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/10 uppercase tracking-widest">
                            Secure Asset
                        </span>
                        <span className="text-green-500/80 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Telemetry Active
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6 text-white uppercase">
                        {resolvedParams.id.replace(/-/g, " ")}
                    </h1>

                    <p className="text-lg md:text-xl text-white/50 font-light mb-12 leading-relaxed">
                        This high-fidelity 3D rendering is currently secured behind the Confidential Collection firewall. Your interaction is securely logged via JWT session streaming.
                    </p>

                    <Link
                        href="/work#confidential"
                        className="group relative px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-xs rounded-full overflow-hidden flex items-center justify-center gap-3 transition-all hover:scale-105 hover:bg-gray-200 shadow-xl"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return to Gallery
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
