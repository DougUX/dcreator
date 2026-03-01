import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesLoader from "@/components/services/ServicesLoader";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesStickyList from "@/components/services/ServicesStickyList";
import ServicesProjectGallery from "@/components/services/ServicesProjectGallery";
import ServicesClientList from "@/components/services/ServicesClientList";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black relative">
            <ServicesLoader />
            <Header />
            <main className="relative">
                <ServicesHero />
                <ServicesStickyList />
                <ServicesProjectGallery />
                <ServicesClientList />
            </main>
            <Footer />
        </div>
    );
}
