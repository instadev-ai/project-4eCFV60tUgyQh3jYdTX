import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductWithPlaceholders } from '@/data/mock-products';
import { ProductGallery } from '@/components/product-gallery';
import { ProductVariantSelector } from '@/components/product-variant-selector';
import { ProductReviews } from '@/components/product-reviews';
import { RelatedProducts } from '@/components/related-products';
import { ShoppingCart } from '@/components/shopping-cart';
import { useCart } from '@/context/cart-context';
import { ProductVariant } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Truck, ShieldCheck, RotateCcw, Heart, Share2, Minus, Plus } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default function ProductPage() {
  const { productId = 'product-1' } = useParams<{ productId: string }>();
  const product = getProductWithPlaceholders(productId);
  const { addItem, openCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
      imageSrc: product.images[0],
    });
    
    openCart();
  };

  return (
    <>
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.brand && (
                <h3 className="text-sm font-medium text-muted-foreground">{product.brand}</h3>
              )}
              <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
              
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= Math.round(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {selectedVariant ? formatCurrency(selectedVariant.price) : formatCurrency(product.variants[0].price)}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(selectedVariant.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground">{product.description}</p>
            
            <ProductVariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-10 w-12 items-center justify-center border-y border-input bg-background text-center">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
            
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-start gap-2">
                <Truck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Secure Payment</h4>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is processed securely
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <RotateCcw className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">30-Day Returns</h4>
                  <p className="text-xs text-muted-foreground">
                    Simple returns up to 30 days from purchase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <Tabs defaultValue="details" className="space-y-8">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <p className="text-muted-foreground">{product.description}</p>
              
              {product.details && product.details.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-medium">Features</h4>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            {product.reviews && product.reviews.length > 0 ? (
              <ProductReviews
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium">No reviews yet</h3>
                <p className="mt-1 text-muted-foreground">
                  Be the first to review this product
                </p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-12" />
        
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <RelatedProducts products={product.relatedProducts} />
        )}
      </div>
      
      <ShoppingCart />
    </>
  );
}