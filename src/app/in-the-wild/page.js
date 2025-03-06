import Navbar from "@/components/Navbar";

export const metadata = {
  title: "In The Wild | Mantle Clothing",
  description: "See Mantle Clothing in action. Real people wearing our sustainable apparel in real-world adventures.",
};

export default function InTheWildPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">In The Wild</h1>
          {/* In The Wild content will go here */}
        </div>
      </main>
    </>
  );
} 