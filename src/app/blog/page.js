import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blog | Mantle Clothing",
  description: "Explore articles on sustainable fashion, ethical manufacturing, and the latest from Mantle Clothing.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          {/* Blog content will go here */}
        </div>
      </main>
    </>
  );
} 