import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/cart-context';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function ShoppingCart() {
  const { state, closeCart, removeItem, updateQuantity, cartTotal } = useCart();
  const { items, isOpen } = state;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>
        
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 py-4">
              <div className="flex flex-col gap-5 px-1">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={item.imageSrc || '/placeholder.svg'}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && (
                            <>
                              {item.size && <span>•</span>}
                              <span>Color: {item.color}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            onClick={() => removeItem(item.productId, item.variantId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-4 px-1">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button className="w-full">Checkout</Button>
                <Button variant="outline" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
            <Button onClick={closeCart}>Continue Shopping</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}