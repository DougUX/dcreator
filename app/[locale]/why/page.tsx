import WhyMeScrollLayout from "@/components/WhyMeScrollLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WhyPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <div>
                    <WhyMeScrollLayout />
                </div>
            </main>
            <Footer />
        </div>
    );
}
