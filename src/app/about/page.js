import Navbar from "@/components/Navbar";
import Image from "next/image";
import ButtonWithHover from "@/components/ButtonWithHover";

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
      <main className="bg-[#F8F8F8]">
        {/* Hero Banner with Slogan */}
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          <Image 
            src="/images/banner-2.jpg"
            alt="Mantle Clothing - About Us Banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }} />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="text-center" style={{ color: 'white' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                Work can be shitty.<br />
                Your clothes don't have to be.
              </h1>
              <ButtonWithHover href="/shop" variant="filled" style={{ color: 'white' }}>
                Shop Now
              </ButtonWithHover>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Who We Are</h2>
            <div className="space-y-6 text-lg text-gray-700 text-center">
              <p>
                Mantle Clothing was founded with a simple mission: to create high-quality, sustainable apparel that stands up to the demands of modern life while minimizing environmental impact.
              </p>
              <p>
                Born from the belief that clothing should be both functional and responsible, we set out to design garments that combine durability, comfort, and style—all while maintaining our commitment to ethical manufacturing practices.
              </p>
              <p>
                Our team brings together expertise from the worlds of outdoor apparel, sustainable textiles, and ethical production to create clothing that you can feel good about wearing, day after day.
              </p>
            </div>
          </div>
        </section>

        {/* Why Mantle Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Mantle?</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Sustainable Materials</h3>
                <p className="text-gray-700">
                  We source eco-friendly fabrics that reduce environmental impact without compromising on quality or performance.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Ethical Production</h3>
                <p className="text-gray-700">
                  Every garment is made in facilities that uphold fair labor practices and provide safe working conditions for all employees.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Built to Last</h3>
                <p className="text-gray-700">
                  Our clothing is designed and constructed to withstand daily wear and tear, reducing the need for frequent replacements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">The Team</h2>
            
            {/* Team Image */}
            <div className="mb-16 relative w-full max-w-3xl mx-auto h-[400px] md:h-[500px]">
              <Image 
                src="/images/team-photo.jpg" 
                alt="The Mantle Clothing Team" 
                fill
                className="object-cover object-center rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600 mb-4">Founder & CEO</p>
                <p className="text-gray-700">
                  With a background in law enforcement and a passion for quality apparel, John founded Mantle Clothing to create gear that stands up to the toughest conditions.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">Mike Smith</h3>
                <p className="text-gray-600 mb-4">Head of Design</p>
                <p className="text-gray-700">
                  Mike brings his tactical experience and eye for detail to create functional, durable clothing that performs when it matters most.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">David Johnson</h3>
                <p className="text-gray-600 mb-4">Operations Director</p>
                <p className="text-gray-700">
                  David oversees our production and ensures that every Mantle product meets our rigorous standards for quality and durability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values and Commitments Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Values</h2>
            <div className="space-y-6 text-lg text-gray-700 text-center">
              <p>
                At Mantle Clothing, we believe that great apparel shouldn't come at the expense of our planet or the people who make it. Our core values guide everything we do:
              </p>
              <div className="space-y-6 max-w-2xl mx-auto">
                <p><strong>Sustainability:</strong> We prioritize eco-friendly materials and processes that minimize environmental impact.</p>
                <p><strong>Quality:</strong> We create durable products designed to last, reducing waste and consumption.</p>
                <p><strong>Transparency:</strong> We're open about our supply chain and manufacturing processes.</p>
                <p><strong>Community:</strong> We support the communities where our products are made through fair wages and safe working conditions.</p>
              </div>
              <p>
                These aren't just words—they're commitments that shape our decisions every day. From material selection to packaging choices, we're constantly working to improve our practices and reduce our footprint.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 