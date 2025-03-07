import { NextResponse } from 'next/server';

/**
 * GET handler for testing the WooCommerce API
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} - JSON response with API test results
 */
export async function GET(request) {
  try {
    // WooCommerce API URL for products
    const apiUrl = new URL('https://mantle-clothing.com/wp-json/wc/v3/products');
    
    // Add query parameters
    apiUrl.searchParams.append('per_page', '10');
    
    // Add authentication
    apiUrl.searchParams.append('consumer_key', process.env.WOOCOMMERCE_CONSUMER_KEY);
    apiUrl.searchParams.append('consumer_secret', process.env.WOOCOMMERCE_CONSUMER_SECRET);
    
    console.log('Testing WooCommerce API with URL:', apiUrl.toString());
    
    // Fetch products from WooCommerce
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const products = await response.json();
    
    console.log('API Response Status:', response.status);
    console.log('Number of products returned:', products.length);
    
    if (products.length > 0) {
      console.log('First product structure:', JSON.stringify(products[0], null, 2));
    }
    
    // Return the test results
    return NextResponse.json({
      success: true,
      status: response.status,
      productCount: products.length,
      sampleProduct: products.length > 0 ? products[0] : null,
      allProducts: products
    });
  } catch (error) {
    console.error('Error testing WooCommerce API:', error);
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