"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, getProductImageUrl, getProductSecondaryImageUrl } from '@/services/woocommerce';

export default function ProductGrid({ products }) {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Handle image error
  const handleImageError = (productId, isSecondary = false) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [isSecondary ? 'secondary' : 'primary']: true
      }
    }));
  };

  // Get fallback image
  const getFallbackImage = (index) => {
    const fallbackImages = [
      '/images/DSCF1858.jpg',
      '/images/DSCF4564-scaled.jpg',
      '/images/DSCF6361-scaled.jpg',
      '/images/DSCF4744-scaled-e1608145214695.jpg'
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  // Function to strip HTML tags from description
  const stripHtml = (html) => {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return html?.replace(/<[^>]*>?/gm, '') || '';
    }
    
    // Client-side rendering
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    return doc.body.textContent || '';
  };

  // Function to get short description
  const getShortDescription = (product) => {
    if (product.short_description) {
      const text = stripHtml(product.short_description);
      return text.substring(0, 60) + (text.length > 60 ? '...' : '');
    }
    
    if (product.description) {
      const text = stripHtml(product.description);
      return text.substring(0, 60) + (text.length > 60 ? '...' : '');
    }
    
    return 'Sustainable eco-friendly apparel';
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '1rem 0'
    }}>
      {products.map((product, index) => (
        <Link 
          href={`/shop/product/${product.id}`} 
          key={product.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            overflow: 'hidden', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            setHoveredProduct(product.id);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            setHoveredProduct(null);
          }}
          >
            <div style={{ height: '300px', position: 'relative', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
              <Image
                src={hoveredProduct === product.id
                  ? (imageErrors[product.id]?.secondary 
                      ? getFallbackImage((index + 1) % 4)
                      : getProductSecondaryImageUrl(product))
                  : (imageErrors[product.id]?.primary 
                      ? getFallbackImage(index)
                      : getProductImageUrl(product))}
                alt={product.name}
                fill
                style={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                  transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)',
                  opacity: 1
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => handleImageError(product.id, hoveredProduct === product.id)}
                priority={index < 6} // Prioritize loading the first 6 images
              />
            </div>
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                {product.name}
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '1rem', flexGrow: 1 }}>
                {getShortDescription(product)}
              </p>
              <p style={{ fontWeight: 'bold', color: '#9CB24D' }}>
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 