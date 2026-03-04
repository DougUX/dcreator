import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const isProduction = !!process.env.UPSTASH_REDIS_REST_URL;

const redis = isProduction
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
    : null;

// Helper to secure the admin route via a simple query parameter mapping or manual JWT check
export default async function AdminActivityDashboard({ searchParams }: { searchParams: { pass?: string } }) {

    // Simple admin password gating
    const ADMIN_PASS = process.env.NEXT_PUBLIC_CONFIDENTIAL_PASSWORD || "unlock2026";

    if (searchParams.pass !== ADMIN_PASS) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
                <p className="text-white/60">Append `?pass=your_password` to the URL to view activity logs.</p>
            </div>
        );
    }

    // Retrieve all activity streams
    let allActivity: { phone: string; authData: any; logs: any[] }[] = [];

    if (redis) {
        // Fetch all user keys
        const userKeys = await redis.keys("user:*");

        for (const userKey of userKeys) {
            const phone = userKey.replace("user:", "");
            const authData = await redis.get(userKey);

            // Fetch list of activity arrays for this phone
            // `lrange <key> 0 -1` fetches the entire list
            const logs = await redis.lrange(`activity:${phone}`, 0, -1);

            allActivity.push({
                phone,
                authData,
                logs: logs || []
            });
        }
    } else {
        // Mock payload for Local Testing
        allActivity = [
            {
                phone: "+44 7911 123456",
                authData: { code: "123456", name: "Client A" },
                logs: [
                    { action: "Login", timestamp: new Date().toISOString() },
                    { action: "Viewed Project: project-01", timestamp: new Date(Date.now() - 30000).toISOString() },
                    { action: "Viewed Project: project-04", timestamp: new Date(Date.now() - 60000).toISOString() }
                ]
            }
        ];
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 lg:p-20 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 border-b border-white/10 pb-6 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-2">
                            Confidential Telemetry
                        </h1>
                        <p className="text-white/40">Real-time database access logs and user click streams.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium tracking-wide text-green-400 uppercase">System Active</span>
                    </div>
                </div>

                {allActivity.length === 0 ? (
                    <div className="bg-[#111] border border-white/5 p-12 rounded-3xl text-center flex flex-col items-center">
                        <svg className="w-10 h-10 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <h3 className="text-xl text-white font-medium mb-1">No Activity Found</h3>
                        <p className="text-white/40">The Upstash Redis database is empty. No users have logged in yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {allActivity.map((session, i) => (
                            <div key={i} className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                                {/* Header */}
                                <div className="bg-[#161616] px-8 py-5 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                                            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-medium tracking-wider font-mono text-white/90">{session.phone}</h2>
                                            <p className="text-xs tracking-wider uppercase text-white/40 mt-1">Auth Code: {session.authData?.code || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-white/60">
                                        {session.logs.length} Events Logged
                                    </div>
                                </div>

                                {/* Log Streams */}
                                <div className="p-8">
                                    {session.logs.length === 0 ? (
                                        <p className="text-white/30 text-sm italic">No stream datagrams traced.</p>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            {session.logs.map((log, idx) => (
                                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-l-2 pl-4 border-white/10 hover:border-white/30 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                                        <span className="text-base font-light text-white/80">{log.action || "Unknown Action"}</span>
                                                    </div>
                                                    <span className="text-xs font-mono text-white/30 truncate">
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
