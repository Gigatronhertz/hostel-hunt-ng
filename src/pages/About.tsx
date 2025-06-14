
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Car, Shield, Users, GraduationCap, CheckCircle, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Hostel.ng
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-muted-foreground hover:text-primary transition-colors">
              Browse Rooms
            </Link>
            <Link to="/about" className="text-primary font-medium">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary transition-colors">
              Agent Login
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/rooms" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Rooms
                </Link>
                <Link 
                  to="/about" 
                  className="text-lg font-medium text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/agent-login" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agent Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About
            <span className="text-primary block">Hostel.ng</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connecting Nigerian students with safe, affordable, and quality accommodation near their universities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe every student deserves a safe, comfortable, and affordable place to call home during their university journey. 
                Hostel.ng bridges the gap between students seeking quality accommodation and verified property owners.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform ensures transparency, safety, and convenience in the student housing search process across Nigeria's top universities.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                alt="Students studying together"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free Ride Service Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Car className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">FREE Inspection Rides</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide complimentary transportation to room inspections because we believe 
              seeing your future home in person should be accessible to every student.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Book Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Schedule your room inspection and we'll arrange free transportation to the location.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Free Pick-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our driver will pick you up from a convenient location near your campus.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Safe Return</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After the inspection, we'll safely transport you back to your starting point.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Hostel.ng Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Search & Filter</h3>
              <p className="text-muted-foreground text-sm">
                Browse rooms by university, price range, and amenities. Our advanced filters help you find exactly what you need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Book Inspection</h3>
              <p className="text-muted-foreground text-sm">
                Pay a small inspection fee and schedule a visit. We'll provide free transportation to the room.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Inspect & Decide</h3>
              <p className="text-muted-foreground text-sm">
                Visit the room in person, meet the landlord, and assess if it's the right fit for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Move In</h3>
              <p className="text-muted-foreground text-sm">
                Complete your yearly payment and move into your new home. Enjoy peace of mind with verified accommodations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Hostel.ng?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Verified Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All rooms are verified and inspected by our team to ensure quality and safety standards.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Car className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Free Transportation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complimentary rides to room inspections so you can see before you commit.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Student-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designed specifically for Nigerian students with affordable pricing and campus proximity.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <GraduationCap className="w-8 h-8 text-primary mb-2" />
                <CardTitle>University Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Serving all major Nigerian universities with expanding coverage nationwide.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Transparent Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hidden fees, clear pricing, and honest property descriptions you can trust.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our support team is always available to help with any questions or concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Room?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have found their ideal accommodation through Hostel.ng
          </p>
          <Link to="/rooms">
            <Button size="lg" variant="secondary" className="text-primary">
              Browse Rooms Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Hostel.ng</h3>
              <p className="text-muted-foreground">
                Your trusted platform for finding quality student accommodation across Nigerian universities.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/rooms">Browse Rooms</Link></li>
                <li><Link to="/about">How It Works</Link></li>
                <li><Link to="/contact">Safety Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">For Agents</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/agent-login">Agent Login</Link></li>
                <li><Link to="/agent-dashboard">List Your Room</Link></li>
                <li><Link to="/about">Agent Guide</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/about">FAQ</Link></li>
                <li><Link to="/about">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Hostel.ng. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
