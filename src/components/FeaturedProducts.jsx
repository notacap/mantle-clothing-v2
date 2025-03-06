"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function FeaturedProducts() {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if scrolling is possible in either direction
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Initial check
      checkScrollability();
      
      // Add scroll event listener
      scrollContainer.addEventListener('scroll', checkScrollability);
      
      // Add resize event listener
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  // Improved scroll functions with item-based scrolling
  const scrollLeft = () => {
    if (!scrollContainerRef.current || isScrolling || !canScrollLeft) return;
    
    setIsScrolling(true);
    
    // Calculate scroll distance based on item width + gap
    const itemWidth = 280; // Width of each product card
    const gap = 24; // Gap between items (1.5rem)
    const scrollDistance = -(itemWidth + gap);
    
    // Get current scroll position to determine target position
    const currentPosition = scrollContainerRef.current.scrollLeft;
    const targetPosition = Math.max(0, currentPosition + scrollDistance);
    
    // Smooth scroll to the target position
    scrollContainerRef.current.scrollTo({
      left: targetPosition,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => setIsScrolling(false), 500);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current || isScrolling || !canScrollRight) return;
    
    setIsScrolling(true);
    
    // Calculate scroll distance based on item width + gap
    const itemWidth = 280; // Width of each product card
    const gap = 24; // Gap between items (1.5rem)
    const scrollDistance = itemWidth + gap;
    
    // Smooth scroll by one item width
    scrollContainerRef.current.scrollTo({
      left: scrollContainerRef.current.scrollLeft + scrollDistance,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => setIsScrolling(false), 500);
  };

  return (
    <section style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '4rem 1rem',
      overflow: 'hidden', // Prevent content from extending beyond container
      position: 'relative'
    }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>
        Featured Products
      </h2>
      
      <div style={{ position: 'relative', padding: '0 40px' }}>
        {/* Left scroll button */}
        <button 
          onClick={scrollLeft}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
          style={{
            position: 'absolute',
            left: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollLeft ? 'pointer' : 'default',
            opacity: canScrollLeft ? 1 : 0.5,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          onMouseDown={(e) => canScrollLeft && (e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)')}
          onMouseUp={(e) => canScrollLeft && (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
          onMouseLeave={(e) => canScrollLeft && (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
        >
          <span style={{ 
            borderTop: '2px solid #9CB24D', 
            borderLeft: '2px solid #9CB24D', 
            width: '10px', 
            height: '10px', 
            transform: 'rotate(-45deg)', 
            display: 'block', 
            marginLeft: '5px',
            opacity: canScrollLeft ? 1 : 0.5
          }}></span>
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="featured-products"
          style={{ 
            display: 'flex',
            overflowX: 'auto',
            gap: '1.5rem',
            paddingBottom: '0.75rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#9CB24D #e5e7eb',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            width: '100%'
          }}
        >
          {/* Product items */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Link 
              href={`/shop/product-${item}`} 
              key={item}
              style={{ 
                flex: '0 0 auto',
                width: '280px',
                textDecoration: 'none',
                color: 'inherit',
                scrollSnapAlign: 'start'
              }}
            >
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                overflow: 'hidden', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ height: '300px', backgroundColor: '#e5e7eb', position: 'relative' }}>
                  {/* Product image placeholder */}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Product {item}</h3>
                  <p style={{ color: '#4b5563', marginBottom: '1rem' }}>Sustainable eco-friendly apparel</p>
                  <p style={{ fontWeight: 'bold', color: '#9CB24D' }}>${(59 + item * 10).toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          onClick={scrollRight}
          aria-label="Scroll right"
          disabled={!canScrollRight}
          style={{
            position: 'absolute',
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollRight ? 'pointer' : 'default',
            opacity: canScrollRight ? 1 : 0.5,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          onMouseDown={(e) => canScrollRight && (e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)')}
          onMouseUp={(e) => canScrollRight && (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
          onMouseLeave={(e) => canScrollRight && (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
        >
          <span style={{ 
            borderTop: '2px solid #9CB24D', 
            borderRight: '2px solid #9CB24D', 
            width: '10px', 
            height: '10px', 
            transform: 'rotate(45deg)', 
            display: 'block', 
            marginRight: '5px',
            opacity: canScrollRight ? 1 : 0.5
          }}></span>
        </button>
      </div>
      
      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .featured-products::-webkit-scrollbar {
          height: 6px;
        }
        
        .featured-products::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 3px;
        }
        
        .featured-products::-webkit-scrollbar-thumb {
          background-color: #9CB24D;
          border-radius: 3px;
        }
        
        .featured-products {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: thin;  /* Firefox */
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
} 