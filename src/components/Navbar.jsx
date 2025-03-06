"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = () => {
        setIsMenuOpen(false);
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isMobile ? 'space-between' : 'center', 
          height: '6rem',
          boxSizing: 'border-box'
        }}>
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0 }} aria-label="Mantle Clothing Home">
            <Image 
              src="/images/logo.svg" 
              alt="Mantle Clothing Logo" 
              width={134} 
              height={70} 
              priority
              style={{ height: '3rem', width: 'auto' }}
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ 
              width: '65%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <nav style={{ 
                display: 'flex', 
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <NavLink href="/shop">Shop</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/partners">Partners</NavLink>
                <NavLink href="/in-the-wild">In The Wild</NavLink>
                <NavLink href="/contact">Contact</NavLink>
                <Link 
                  href="/cart" 
                  style={{ 
                    color: '#4b5563', 
                    marginLeft: '2rem',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                  }}
                  aria-label="Shopping Cart"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#9CB24D'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4b5563'}
                >
                  <ShoppingCart style={{ height: '1.5rem', width: '1.5rem' }} />
                </Link>
              </nav>
            </div>
          )}

          {/* Mobile Navigation Toggle */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link 
                href="/cart" 
                style={{ 
                  color: '#4b5563', 
                  marginRight: '1rem',
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }}
                aria-label="Shopping Cart"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart style={{ height: '1.5rem', width: '1.5rem' }} />
              </Link>
              
              <button
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4b5563',
                  zIndex: 60
                }}
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '300px',
              backgroundColor: 'white',
              boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease',
              zIndex: 55,
              padding: '6rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <MobileNavLink href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
              <MobileNavLink href="/partners" onClick={() => setIsMenuOpen(false)}>Partners</MobileNavLink>
              <MobileNavLink href="/in-the-wild" onClick={() => setIsMenuOpen(false)}>In The Wild</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
            </nav>
          </div>
        )}
        
        {/* Overlay for mobile menu */}
        {isMobile && isMenuOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 50
            }}
            onClick={toggleMenu}
          />
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      style={{ 
        color: '#4b5563', 
        fontWeight: 500, 
        marginLeft: '2rem',
        position: 'relative',
        transition: 'color 0.3s ease',
        padding: '0.5rem 0',
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#5D6B2D'; // Darker shade of accent for contrast
        const underline = e.currentTarget.querySelector('.underline');
        if (underline) {
          underline.style.width = '100%';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#4b5563';
        const underline = e.currentTarget.querySelector('.underline');
        if (underline) {
          underline.style.width = '0';
        }
      }}
    >
      <span>{children}</span>
      <span 
        className="underline"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '0',
          height: '2px',
          backgroundColor: '#9CB24D',
          transition: 'width 0.3s ease'
        }}
      />
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link 
      href={href} 
      style={{ 
        color: '#4b5563', 
        fontWeight: 500,
        fontSize: '1.125rem',
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb',
        textDecoration: 'none',
        display: 'block',
        width: '100%'
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
} 