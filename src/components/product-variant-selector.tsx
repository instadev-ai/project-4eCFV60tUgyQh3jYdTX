import React from 'react';
import { cn } from '@/lib/utils';
import { ProductVariant } from '@/types/product';
import { Check } from 'lucide-react';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: ProductVariantSelectorProps) {
  // Get unique sizes and colors from variants
  const sizes = Array.from(new Set(variants.filter(v => v.size).map(v => v.size)));
  const colors = Array.from(new Set(variants.filter(v => v.color).map(v => v.color)));

  // Find available variants for the current selection
  const availableSizes = selectedVariant?.color
    ? variants.filter(v => v.color === selectedVariant.color).map(v => v.size)
    : sizes;

  const availableColors = selectedVariant?.size
    ? variants.filter(v => v.size === selectedVariant.size).map(v => v.color)
    : colors;

  // Find a variant by size and color
  const findVariant = (size?: string, color?: string) => {
    return variants.find(v => 
      (!size || v.size === size) && 
      (!color || v.color === color)
    );
  };

  // Handle size selection
  const handleSizeSelect = (size?: string) => {
    if (!size) return;
    
    const newVariant = findVariant(
      size,
      selectedVariant?.color
    );
    
    if (newVariant) {
      onSelectVariant(newVariant);
    }
  };

  // Handle color selection
  const handleColorSelect = (color?: string) => {
    if (!color) return;
    
    const newVariant = findVariant(
      selectedVariant?.size,
      color
    );
    
    if (newVariant) {
      onSelectVariant(newVariant);
    }
  };

  return (
    <div className="space-y-6">
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Size</span>
            <button className="text-xs text-primary hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isAvailable = availableSizes.includes(size);
              const isSelected = selectedVariant?.size === size;
              
              return (
                <button
                  key={size}
                  className={cn(
                    "flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background",
                    !isAvailable && "cursor-not-allowed opacity-50"
                  )}
                  disabled={!isAvailable}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-medium">Color: {selectedVariant?.color}</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isAvailable = availableColors.includes(color);
              const isSelected = selectedVariant?.color === color;
              
              // This is a simplified color mapping - in a real app, you'd use actual color values
              const colorMap: Record<string, string> = {
                'Black': 'bg-black',
                'White': 'bg-white',
                'Red': 'bg-red-500',
                'Blue': 'bg-blue-500',
                'Green': 'bg-green-500',
                'Yellow': 'bg-yellow-500',
                'Purple': 'bg-purple-500',
                'Pink': 'bg-pink-500',
                'Gray': 'bg-gray-500',
              };
              
              const bgColor = colorMap[color as string] || 'bg-gray-200';
              
              return (
                <button
                  key={color}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                    isSelected ? "border-primary ring-2 ring-primary" : "border-input",
                    !isAvailable && "cursor-not-allowed opacity-50"
                  )}
                  disabled={!isAvailable}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                >
                  <span className={cn("h-7 w-7 rounded-full", bgColor)}>
                    {isSelected && (
                      <Check className={cn(
                        "h-full w-full p-1.5",
                        color === 'White' ? "text-black" : "text-white"
                      )} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}