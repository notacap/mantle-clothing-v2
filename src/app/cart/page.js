import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Shopping Cart | Mantle Clothing",
  description: "Review and checkout your sustainable fashion selections from Mantle Clothing.",
};

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {/* Cart content will go here */}
        </div>
      </main>
    </>
  );
} 