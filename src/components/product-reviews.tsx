import React, { useState } from 'react';
import { ProductReview } from '@/types/product';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
}

export function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

  // Calculate rating distribution
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const markHelpful = (reviewId: string) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: true
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-5 w-5",
                    star <= Math.round(rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="font-medium">
              {rating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on {reviewCount} reviews
          </p>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-2 text-sm">{star}</span>
                <Progress 
                  value={((ratingCounts[star] || 0) / reviews.length) * 100} 
                  className="h-2 w-full" 
                />
                <span className="w-8 text-right text-sm text-muted-foreground">
                  {ratingCounts[star] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{review.title}</h4>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{review.author}</span>
                <span>•</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
              
              <p className="text-sm">{review.content}</p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-xs"
                  disabled={helpfulReviews[review.id]}
                  onClick={() => markHelpful(review.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>
                    {helpfulReviews[review.id] ? 'Marked as helpful' : 'Mark as helpful'}
                  </span>
                  {(review.helpful || 0) > 0 && (
                    <span className="text-muted-foreground">
                      ({(review.helpful || 0) + (helpfulReviews[review.id] ? 1 : 0)})
                    </span>
                  )}
                </Button>
              </div>
              
              <Separator className="mt-4" />
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}