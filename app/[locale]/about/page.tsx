import YearStatement from "@/components/YearStatement";
import Clients from "@/components/Clients";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen relative">
            <Header />
            <main>
                <div className="bg-[rgb(var(--bg))] relative">
                    <YearStatement />
                </div>
                <div className="bg-[rgb(var(--bg))]">
                    <Clients />
                </div>
            </main>
            <Footer />
        </div>
    );
}
