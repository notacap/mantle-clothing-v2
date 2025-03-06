"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ButtonWithHover from './ButtonWithHover';

export default function ProductCategories() {
  // Hover state for each category
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Category data
  const categories = [
    {
      id: 'rain',
      name: 'The Rain Collection',
      image: '/images/home-1.jpg',
      link: '/shop/rain-collection'
    },
    {
      id: 'range',
      name: 'The Range Collection',
      image: '/images/home-4.jpg',
      link: '/shop/range-collection'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: '/images/home-2.jpg',
      link: '/shop/accessories'
    },
    {
      id: 'all',
      name: 'Shop All',
      image: '/images/home-3.jpg',
      link: '/shop'
    }
  ];

  return (
    <section style={{ 
      padding: '4rem 1rem', 
      boxSizing: 'border-box',
      width: '100%',
      overflow: 'hidden'
    }}>
      <h2 style={{ 
        fontSize: '1.875rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '2.5rem' 
      }}>
        Explore Our Collections
      </h2>
      
      {isMobile ? (
        // Mobile layout - stacked cards with fixed height
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          {categories.map((category) => (
            <div key={category.id} style={{ height: '250px', width: '100%', boxSizing: 'border-box' }}>
              <CategoryCard 
                category={category}
                isHovered={hoveredCategory === category.id}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                height="100%"
                alwaysShowButton={true}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop layout - creative grid without overlapping
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          {/* Top row - two large cards side by side */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem',
            marginBottom: '1.5rem',
            height: '400px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
              <CategoryCard 
                key={categories[0].id}
                category={categories[0]}
                isHovered={hoveredCategory === categories[0].id}
                onMouseEnter={() => setHoveredCategory(categories[0].id)}
                onMouseLeave={() => setHoveredCategory(null)}
                height="100%"
              />
            </div>
            <div style={{ flex: '1 1 50%', boxSizing: 'border-box' }}>
              <CategoryCard 
                key={categories[1].id}
                category={categories[1]}
                isHovered={hoveredCategory === categories[1].id}
                onMouseEnter={() => setHoveredCategory(categories[1].id)}
                onMouseLeave={() => setHoveredCategory(null)}
                height="100%"
              />
            </div>
          </div>
          
          {/* Bottom row - creative asymmetric layout */}
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem',
            height: '300px',
            boxSizing: 'border-box',
            width: '100%'
          }}>
            {/* Left card - slightly wider */}
            <div style={{ flex: '1.2 1 0%', boxSizing: 'border-box' }}>
              <CategoryCard 
                key={categories[2].id}
                category={categories[2]}
                isHovered={hoveredCategory === categories[2].id}
                onMouseEnter={() => setHoveredCategory(categories[2].id)}
                onMouseLeave={() => setHoveredCategory(null)}
                height="100%"
              />
            </div>
            
            {/* Right card - slightly narrower */}
            <div style={{ flex: '0.8 1 0%', boxSizing: 'border-box' }}>
              <CategoryCard 
                key={categories[3].id}
                category={categories[3]}
                isHovered={hoveredCategory === categories[3].id}
                onMouseEnter={() => setHoveredCategory(categories[3].id)}
                onMouseLeave={() => setHoveredCategory(null)}
                height="100%"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Extracted category card component for reuse
function CategoryCard({ category, isHovered, onMouseEnter, onMouseLeave, height = 'auto', alwaysShowButton = false }) {
  return (
    <div 
      style={{ 
        position: 'relative',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        height: height,
        width: '100%',
        boxSizing: 'border-box'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <Image
          src={category.image}
          alt={category.name}
          fill
          style={{ 
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={category.id === 'rain' || category.id === 'range'}
        />
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
          transition: 'background-color 0.3s ease',
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.4)',
          boxSizing: 'border-box'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          }}>
            {category.name}
          </h3>
          
          <div style={{
            opacity: isHovered || alwaysShowButton ? 1 : 0,
            transform: isHovered || alwaysShowButton ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <ButtonWithHover href={category.link} variant="filled">
              Explore
            </ButtonWithHover>
          </div>
        </div>
      </div>
    </div>
  );
} 