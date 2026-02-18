import Header from "@/components/Header";
import Hero from "@/components/Hero";
import YearStatement from "@/components/YearStatement";
import WhyMeWebGLTimeline from "@/components/WhyMeWebGLTimeline";
import FeaturedWork from "@/components/FeaturedWork";
import ServicesAccordion from "@/components/ServicesAccordion";
import Stats from "@/components/Stats";
import Clients from "@/components/Clients";
import LetsWork from "@/components/LetsWork";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import StackedPanels from "@/components/StackedPanels";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <ScrollEffects>
        <main>
          <StackedPanels>
            <div id="top" className="relative h-full">
              <Hero />
            </div>

            <div id="about" className="relative h-full bg-[rgb(var(--bg))]">
              <YearStatement />
            </div>

            <div id="clients" className="relative h-full bg-[rgb(var(--bg))]">
              <Clients />
            </div>

            <div id="why" data-stack="flow" className="relative h-full bg-[rgb(var(--bg))]">
              <WhyMeWebGLTimeline />
            </div>

            <div id="services" className="relative h-full bg-[rgb(var(--bg))]">
              <ServicesAccordion />
            </div>

            <div id="work" className="relative h-full bg-[rgb(var(--bg))]">
              <FeaturedWork />
            </div>

            <div id="contact" className="relative h-full bg-[rgb(var(--bg))]">
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
          </StackedPanels>
        </main>
      </ScrollEffects>

      <Footer />
    </div>
  );
}
