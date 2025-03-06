import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Shop | Mantle Clothing",
  description: "Browse our collection of sustainable, eco-friendly clothing. Ethically made apparel for conscious consumers.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Shop</h1>
          {/* Shop content will go here */}
        </div>
      </main>
    </>
  );
} 