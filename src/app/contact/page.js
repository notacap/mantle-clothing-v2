import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Contact | Mantle Clothing",
  description: "Get in touch with Mantle Clothing. We're here to answer your questions about our sustainable apparel.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          {/* Contact content will go here */}
        </div>
      </main>
    </>
  );
} 