import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div id="top">
          <Hero />
        </div>
      </main>

      <Footer />
    </div>
  );
}
