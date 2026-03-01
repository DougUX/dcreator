import Stats from "@/components/Stats";
import LetsWork from "@/components/LetsWork";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <div className="bg-[rgb(var(--bg))]">
                    <section className="py-12 sm:py-16">
                        <Container>
                            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 sm:p-10">
                                <Reveal>
                                    <div className="grid gap-10">
                                        <div>
                                            <Stats embedded showCards={false} />
                                        </div>

                                        <div>
                                            <Stats embedded showTitle={false} />
                                        </div>

                                        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                                            <div className="lg:col-span-5">
                                                <div className="relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-black">
                                                    <video
                                                        className="h-full w-full object-cover"
                                                        src="/contact.mp4"
                                                        muted
                                                        playsInline
                                                        autoPlay
                                                        loop
                                                        preload="metadata"
                                                    />
                                                    <div className="pointer-events-none absolute inset-0 bg-[rgb(var(--bg))]/35 dark:bg-[rgb(var(--bg))]/25" />
                                                </div>
                                            </div>

                                            <div className="lg:col-span-7">
                                                <LetsWork embedded />
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </Container>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
