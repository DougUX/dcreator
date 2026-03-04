import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfidentialGatedView from "@/components/confidential/ConfidentialGatedView";

export default function ConfidentialPage() {
    return (
        <div className="min-h-screen bg-black relative">
            <Header />
            <main className="relative">
                <ConfidentialGatedView />
            </main>
            <Footer />
        </div>
    );
}
