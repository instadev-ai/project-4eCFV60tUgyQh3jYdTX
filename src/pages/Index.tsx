import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold">StyleShop</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Shop</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Categories</a>
              <a href="#" className="text-sm font-medium hover:text-primary">About</a>
              <a href="#" className="text-sm font-medium hover:text-primary">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-muted py-20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Modern E-Commerce Experience
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Explore our collection of premium products with a seamless shopping experience.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/product/product-1">View Demo Product</Link>
              </Button>
              <Button variant="outline" size="lg">
                Browse Collection
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">
              Check out our latest arrivals and bestsellers.
            </p>
            
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Featured Product Card */}
              <div className="group overflow-hidden rounded-lg border bg-background p-3">
                <div className="aspect-square overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg"
                    alt="Premium Cotton T-Shirt"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium">Premium Cotton T-Shirt</h3>
                  <p className="text-sm text-muted-foreground">$29.99</p>
                </div>
                <div className="mt-4">
                  <Button asChild className="w-full">
                    <Link to="/product/product-1">View Product</Link>
                  </Button>
                </div>
              </div>
              
              {/* More product cards would go here */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="group overflow-hidden rounded-lg border bg-background p-3">
                  <div className="aspect-square overflow-hidden rounded-md bg-muted">
                    <img
                      src="/placeholder.svg"
                      alt="Product"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 space-y-1">
                    <h3 className="font-medium">Product Name</h3>
                    <p className="text-sm text-muted-foreground">$XX.XX</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Coming Soon
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted py-10">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium">StyleShop</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Modern e-commerce experience with a focus on quality and customer satisfaction.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">All Products</a></li>
              <li><a href="#" className="hover:text-foreground">New Arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Best Sellers</a></li>
              <li><a href="#" className="hover:text-foreground">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Support</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground">FAQs</a></li>
              <li><a href="#" className="hover:text-foreground">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-foreground">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Connect</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground">Twitter</a></li>
              <li><a href="#" className="hover:text-foreground">Facebook</a></li>
              <li><a href="#" className="hover:text-foreground">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} StyleShop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;