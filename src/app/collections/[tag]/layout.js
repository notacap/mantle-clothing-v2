export async function generateMetadata({ params }) {
  const tag = params.tag;
  const title = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${title} Collection | Mantle Clothing`,
    description: `Shop our ${title} collection. Sustainable, eco-friendly apparel for conscious consumers.`,
    openGraph: {
      title: `${title} Collection | Mantle Clothing`,
      description: `Shop our ${title} collection. Sustainable, eco-friendly apparel for conscious consumers.`,
      url: `https://mantleclothing.com/collections/${tag}`,
      siteName: 'Mantle Clothing',
      type: 'website',
    },
  };
}

export default function CollectionLayout({ children }) {
  return children;
} 