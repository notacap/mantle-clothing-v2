import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Partners | Mantle Clothing",
  description: "Learn about Mantle Clothing's partners and collaborations in sustainable fashion and ethical manufacturing.",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Our Partners</h1>
          {/* Partners content will go here */}
        </div>
      </main>
    </>
  );
} 