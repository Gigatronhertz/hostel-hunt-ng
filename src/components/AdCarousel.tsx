import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExternalLink, ShoppingBag, Smartphone, Car } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  link: string;
  icon: React.ReactNode;
  gradient: string;
}

const AdCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ads: Ad[] = [
    {
      id: "1",
      title: "Get 20% Off Student Essentials",
      description: "Everything you need for your room - from bedding to study supplies. Free delivery to campus!",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      cta: "Shop Now",
      link: "#",
      icon: <ShoppingBag className="w-5 h-5" />,
      gradient: "from-blue-500/10 to-blue-600/10"
    },
    {
      id: "2", 
      title: "Student Discounts on Electronics",
      description: "Laptops, tablets, and gadgets for your studies. Special student pricing available now.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      cta: "View Deals",
      link: "#",
      icon: <Smartphone className="w-5 h-5" />,
      gradient: "from-purple-500/10 to-purple-600/10"
    },
    {
      id: "3",
      title: "Campus Transport Service",
      description: "Reliable rides to campus, malls, and around the city. Download the app for instant booking.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      cta: "Download App",
      link: "#",
      icon: <Car className="w-5 h-5" />,
      gradient: "from-green-500/10 to-green-600/10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {ads.map((ad) => (
            <CarouselItem key={ad.id}>
              <Card className={`bg-gradient-to-r ${ad.gradient} border-0 overflow-hidden hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {ad.icon}
                        </div>
                        <span className="text-sm font-medium text-primary">Sponsored</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{ad.description}</p>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-fit"
                        onClick={() => window.open(ad.link, '_blank')}
                      >
                        {ad.cta}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    {/* Image */}
                    <div className="w-full md:w-48 h-32 md:h-auto">
                      <img 
                        src={ad.image} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;