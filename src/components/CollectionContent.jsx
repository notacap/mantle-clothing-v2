"use client";

import { useState, useEffect } from 'react';
import { getProductsByTag } from "@/services/woocommerce";
import ProductGrid from "@/components/ProductGrid";
import CollectionHeader from "@/components/CollectionHeader";

export default function CollectionContent({ tag, title }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ orderby: 'date', order: 'desc' });

  const loadProducts = async (page = 1, orderby = sortConfig.orderby, order = sortConfig.order, append = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const response = await getProductsByTag(tag, 24, page, orderby, order);
      
      if (response.products) {
        if (append) {
          setProducts(prev => [...prev, ...response.products]);
          setSortedProducts(prev => [...prev, ...response.products]);
        } else {
          setProducts(response.products);
          setSortedProducts(response.products);
        }
        setPagination(response.pagination);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadProducts(1);
  }, [tag]);

  const handleSort = (sortOption) => {
    let orderby = 'date';
    let order = 'desc';

    switch (sortOption) {
      case 'price-asc':
        orderby = 'price';
        order = 'asc';
        break;
      case 'price-desc':
        orderby = 'price';
        order = 'desc';
        break;
      case 'newest':
        orderby = 'date';
        order = 'desc';
        break;
      default:
        // Default sorting (featured)
        orderby = 'date';
        order = 'desc';
    }

    setSortConfig({ orderby, order });
    setCurrentPage(1);
    loadProducts(1, orderby, order);
  };

  const handleLoadMore = async () => {
    if (pagination?.hasNextPage && !isLoadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await loadProducts(nextPage, sortConfig.orderby, sortConfig.order, true);
    }
  };

  return (
    <main style={{ backgroundColor: '#F8F8F8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <CollectionHeader 
          title={`${title} Collection`}
          productCount={pagination?.totalProducts || products.length}
          onSort={handleSort}
        />
        
        {isLoading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 1rem',
            color: '#4b5563'
          }}>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 1rem',
            color: '#ef4444'
          }}>
            <p>{error}</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <>
            <ProductGrid products={sortedProducts} />
            {pagination && pagination.hasNextPage && (
              <div style={{ 
                textAlign: 'center',
                marginTop: '2rem'
              }}>
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  style={{
                    backgroundColor: isLoadingMore ? '#d1d5db' : '#9CB24D',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={e => !isLoadingMore && (e.target.style.backgroundColor = '#8ba344')}
                  onMouseLeave={e => !isLoadingMore && (e.target.style.backgroundColor = '#9CB24D')}
                >
                  {isLoadingMore ? 'Loading...' : 'Load More Products'}
                </button>
              </div>
            )}
          </>
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
  );
} 