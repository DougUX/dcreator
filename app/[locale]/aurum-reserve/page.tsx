import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AurumHero from "@/components/aurum/AurumHero";
import AurumFeatures from "@/components/aurum/AurumFeatures";
import AurumStory from "@/components/aurum/AurumStory";
import AurumTestimonials from "@/components/aurum/AurumTestimonials";
import AurumCTA from "@/components/aurum/AurumCTA";

export default function AurumReservePage() {
    return (
        <div className="min-h-screen bg-[rgb(var(--aurum-bg))] text-[rgb(var(--aurum-fg))]">
            <Header />
            <main>
                <AurumHero />
                <AurumFeatures />
                <AurumStory />
                <AurumTestimonials />
                <AurumCTA />
            </main>
            <Footer />
        </div>
    );
}
