import Navbar from "@/components/Navbar";
import { getProductsByTag } from "@/services/woocommerce";
import ProductGrid from "@/components/ProductGrid";

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const tag = params.tag;
  const title = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${title} Collection | Mantle Clothing`,
    description: `Shop our ${title} collection. Sustainable, eco-friendly apparel for conscious consumers.`,
  };
}

export default async function CollectionPage({ params }) {
  const tag = params.tag;
  const products = await getProductsByTag(tag, 24);
  
  const title = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {title} Collection
          </h1>
          
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 1rem',
              color: '#4b5563'
            }}>
              <p>No products found in this collection.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 