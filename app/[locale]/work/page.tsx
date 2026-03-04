import WorksGrid from "@/components/WorksGrid";
import WorksScatteredHero from "@/components/WorksScatteredHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfidentialGatedView from "@/components/confidential/ConfidentialGatedView";

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-[#080808] text-white">
            <Header />
            <main>
                <WorksScatteredHero />
                <div className="bg-[#080808] relative z-10">
                    <WorksGrid />
                </div>
                {/* Embedded Confidential Popup Flow */}
                <ConfidentialGatedView />
            </main>
            <Footer />
        </div>
    );
}
