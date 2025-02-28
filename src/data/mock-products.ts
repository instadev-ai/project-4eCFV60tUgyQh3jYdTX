import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Premium Cotton T-Shirt',
    description: 'Our signature premium cotton t-shirt offers unmatched comfort and durability. Made from 100% organic cotton, this shirt features a relaxed fit and is perfect for everyday wear.',
    details: [
      '100% organic cotton',
      'Relaxed fit',
      'Machine washable',
      'Pre-shrunk fabric',
      'Ethically manufactured'
    ],
    brand: 'EcoStyle',
    category: 'Clothing',
    tags: ['t-shirt', 'cotton', 'organic', 'casual'],
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        id: 'review-1',
        author: 'Alex Johnson',
        rating: 5,
        date: '2023-10-15',
        title: 'Best t-shirt I\'ve ever owned',
        content: 'This t-shirt is incredibly comfortable and the quality is outstanding. After multiple washes, it still looks brand new. Definitely worth the price!',
        helpful: 28
      },
      {
        id: 'review-2',
        author: 'Sam Wilson',
        rating: 4,
        date: '2023-09-22',
        title: 'Great quality, slightly large',
        content: 'The material is excellent and feels premium. My only issue is that it runs slightly larger than expected. Consider sizing down if you prefer a more fitted look.',
        helpful: 15
      },
      {
        id: 'review-3',
        author: 'Jamie Smith',
        rating: 5,
        date: '2023-11-03',
        title: 'Perfect everyday shirt',
        content: 'This has become my go-to shirt for everyday wear. The fabric is soft yet durable, and the color hasn\'t faded at all after washing.',
        helpful: 7
      }
    ],
    variants: [
      {
        id: 'variant-1-1',
        size: 'S',
        color: 'Black',
        price: 29.99,
        inventory: 25,
        imageSrc: '/images/black-tshirt-front.jpg'
      },
      {
        id: 'variant-1-2',
        size: 'S',
        color: 'White',
        price: 29.99,
        inventory: 18,
        imageSrc: '/images/white-tshirt-front.jpg'
      },
      {
        id: 'variant-1-3',
        size: 'M',
        color: 'Black',
        price: 29.99,
        inventory: 30,
        imageSrc: '/images/black-tshirt-front.jpg'
      },
      {
        id: 'variant-1-4',
        size: 'M',
        color: 'White',
        price: 29.99,
        inventory: 22,
        imageSrc: '/images/white-tshirt-front.jpg'
      },
      {
        id: 'variant-1-5',
        size: 'L',
        color: 'Black',
        price: 29.99,
        inventory: 15,
        imageSrc: '/images/black-tshirt-front.jpg'
      },
      {
        id: 'variant-1-6',
        size: 'L',
        color: 'White',
        price: 29.99,
        inventory: 20,
        imageSrc: '/images/white-tshirt-front.jpg'
      },
      {
        id: 'variant-1-7',
        size: 'XL',
        color: 'Black',
        price: 32.99,
        inventory: 10,
        imageSrc: '/images/black-tshirt-front.jpg'
      },
      {
        id: 'variant-1-8',
        size: 'XL',
        color: 'White',
        price: 32.99,
        inventory: 12,
        imageSrc: '/images/white-tshirt-front.jpg'
      }
    ],
    images: [
      '/images/black-tshirt-front.jpg',
      '/images/black-tshirt-back.jpg',
      '/images/black-tshirt-detail.jpg',
      '/images/white-tshirt-front.jpg',
      '/images/white-tshirt-back.jpg'
    ],
    relatedProducts: [
      {
        id: 'related-1',
        name: 'Slim Fit Jeans',
        price: 59.99,
        imageSrc: '/images/slim-jeans.jpg',
        rating: 4.5,
        reviewCount: 87
      },
      {
        id: 'related-2',
        name: 'Canvas Sneakers',
        price: 49.99,
        imageSrc: '/images/canvas-sneakers.jpg',
        rating: 4.3,
        reviewCount: 64
      },
      {
        id: 'related-3',
        name: 'Casual Hoodie',
        price: 45.99,
        imageSrc: '/images/casual-hoodie.jpg',
        rating: 4.7,
        reviewCount: 112
      },
      {
        id: 'related-4',
        name: 'Leather Belt',
        price: 24.99,
        imageSrc: '/images/leather-belt.jpg',
        rating: 4.4,
        reviewCount: 38
      }
    ],
    featured: true,
    bestSeller: true
  }
];

// For demo purposes, we'll use placeholder images
export const placeholderImages = {
  product: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  related: '/placeholder.svg'
};

// Function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

// Function to get a product with placeholder images
export const getProductWithPlaceholders = (id: string): Product | undefined => {
  const product = mockProducts.find(product => product.id === id);
  
  if (!product) return undefined;
  
  // Create a deep copy and replace images with placeholders
  const productWithPlaceholders = JSON.parse(JSON.stringify(product)) as Product;
  productWithPlaceholders.images = placeholderImages.product;
  
  if (productWithPlaceholders.relatedProducts) {
    productWithPlaceholders.relatedProducts = productWithPlaceholders.relatedProducts.map(related => ({
      ...related,
      imageSrc: placeholderImages.related
    }));
  }
  
  productWithPlaceholders.variants = productWithPlaceholders.variants.map(variant => ({
    ...variant,
    imageSrc: placeholderImages.related
  }));
  
  return productWithPlaceholders;
};