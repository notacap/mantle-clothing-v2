"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CollectionHeader({ title, productCount, onSort }) {
  const [sortOption, setSortOption] = useState('default');
  
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSort(value);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Breadcrumb */}
      <div style={{ 
        marginBottom: '1rem',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Home
        </Link>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <Link href="/shop" style={{ color: '#6b7280', textDecoration: 'none' }}>
          Shop
        </Link>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span style={{ color: '#111827' }}>{title}</span>
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {title}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {productCount} {productCount === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        {/* Sort Options */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <label htmlFor="sort" style={{ color: '#4b5563' }}>Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            style={{
              padding: '0.5rem 2rem 0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              color: '#111827',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
} 