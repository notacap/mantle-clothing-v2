import { NextResponse } from 'next/server';

/**
 * GET handler for testing the WooCommerce API for featured products
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} - JSON response with API test results
 */
export async function GET(request) {
  try {
    // WooCommerce API URL for products
    const apiUrl = new URL('https://mantle-clothing.com/wp-json/wc/v3/products');
    
    // Add query parameters for featured products
    apiUrl.searchParams.append('featured', 'true');
    apiUrl.searchParams.append('status', 'publish');
    apiUrl.searchParams.append('per_page', '10');
    
    // Add authentication
    apiUrl.searchParams.append('consumer_key', process.env.WOOCOMMERCE_CONSUMER_KEY);
    apiUrl.searchParams.append('consumer_secret', process.env.WOOCOMMERCE_CONSUMER_SECRET);
    
    console.log('Testing WooCommerce API for featured products with URL:', apiUrl.toString());
    
    // Fetch featured products from WooCommerce
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.status}`);
    }
    
    const products = await response.json();
    
    console.log('API Response Status:', response.status);
    console.log('Number of featured products returned:', products.length);
    
    if (products.length > 0) {
      console.log('First featured product structure:', JSON.stringify(products[0], null, 2));
    } else {
      console.log('No featured products found. Checking if any products exist...');
      
      // Try fetching any products to see if the API is working
      const allProductsUrl = new URL('https://mantle-clothing.com/wp-json/wc/v3/products');
      allProductsUrl.searchParams.append('per_page', '5');
      allProductsUrl.searchParams.append('consumer_key', process.env.WOOCOMMERCE_CONSUMER_KEY);
      allProductsUrl.searchParams.append('consumer_secret', process.env.WOOCOMMERCE_CONSUMER_SECRET);
      
      const allProductsResponse = await fetch(allProductsUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (allProductsResponse.ok) {
        const allProducts = await allProductsResponse.json();
        console.log('Found', allProducts.length, 'regular products');
        
        if (allProducts.length > 0) {
          console.log('Sample regular product:', JSON.stringify(allProducts[0], null, 2));
        }
      }
    }
    
    // Return the test results
    return NextResponse.json({
      success: true,
      status: response.status,
      featuredProductCount: products.length,
      sampleFeaturedProduct: products.length > 0 ? products[0] : null,
      allFeaturedProducts: products
    });
  } catch (error) {
    console.error('Error testing WooCommerce API for featured products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 