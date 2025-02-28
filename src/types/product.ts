export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  imageSrc?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details?: string[];
  brand?: string;
  category: string;
  tags?: string[];
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  variants: ProductVariant[];
  images: string[];
  relatedProducts?: RelatedProduct[];
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  imageSrc: string;
}