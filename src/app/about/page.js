import Navbar from "@/components/Navbar";

export const metadata = {
  title: "About | Mantle Clothing",
  description: "Learn about Mantle Clothing's mission, values, and commitment to sustainable fashion and ethical manufacturing.",
  openGraph: {
    title: "About | Mantle Clothing",
    description: "Learn about Mantle Clothing's mission, values, and commitment to sustainable fashion and ethical manufacturing.",
    url: "https://mantleclothing.com/about",
    siteName: "Mantle Clothing",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: '#F8F8F8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>About Us</h1>
          {/* About content will go here */}
        </div>
      </main>
    </>
  );
} 