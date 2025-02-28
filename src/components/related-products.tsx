import React from 'react';
import { RelatedProduct } from '@/types/product';
import { Star } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">You might also like</h3>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="space-y-3">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                
                <div className="space-y-1 text-sm">
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-3 w-3",
                            star <= Math.round(product.rating) 
                              ? "fill-primary text-primary" 
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(product.price)}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}