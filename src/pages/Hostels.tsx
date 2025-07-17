import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, MapPin, Wifi, Zap, Droplets, Users, Filter, GraduationCap, Bed, Menu, Loader2 } from "lucide-react";
import AdCarousel from "@/components/AdCarousel";

const Hostels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || "");
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || "");
  const [roomType, setRoomType] = useState(searchParams.get('roomType') || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allRooms, setAllRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);

  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University",
    "Federal University of Agriculture Abeokuta",
    "Federal University of Agriculture Makurdi",
    "University of Port Harcourt",
    "Federal University of Technology, Minna",
    "Bayero University Kano"
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case '24/7 power':
        return <Zap className="w-3 h-3" />;
      case 'water supply':
        return <Droplets className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  const updateURLParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setAllRooms([]);
    setHasMore(true);
    updateURLParams({ search: value });
  };

  const handleCampusChange = (value: string) => {
    setSelectedCampus(value);
    setCurrentPage(1);
    setAllRooms([]);
    setHasMore(true);
    updateURLParams({ campus: value });
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    setCurrentPage(1);
    setAllRooms([]);
    setHasMore(true);
    updateURLParams({ priceRange: value });
  };

  const handleRoomTypeChange = (value: string) => {
    setRoomType(value);
    setCurrentPage(1);
    setAllRooms([]);
    setHasMore(true);
    updateURLParams({ roomType: value });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCampus("");
    setPriceRange("");
    setRoomType("");
    setCurrentPage(1);
    setAllRooms([]);
    setHasMore(true);
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('page', currentPage.toString());
        queryParams.set('limit', '10');

        if (searchTerm) queryParams.set('search', searchTerm);
        if (selectedCampus) queryParams.set('campus', selectedCampus);
        if (priceRange) queryParams.set('priceRange', priceRange);
        if (roomType) queryParams.set('roomType', roomType);

        const res = await fetch(`https://hostelng.onrender.com/all-rooms?${queryParams}`, { credentials: "include" });
        const data = await res.json();

        if (data.rooms) {
          setAllRooms(prev => [...prev, ...data.rooms]);
          setHasMore(data.rooms.length > 0);
          setTotalRooms(data.total || 0);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage, searchTerm, selectedCampus, priceRange, roomType]);

  const lastRoomElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">Hostel.ng</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/rooms" className="text-primary font-medium">Browse Rooms</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            <Link to="/agent-login" className="text-muted-foreground hover:text-primary">Agent Login</Link>
          </nav>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/rooms" className="text-lg font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>Browse Rooms</Link>
                <Link to="/about" className="text-lg text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link to="/contact" className="text-lg text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <Link to="/agent-login" className="text-lg text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Agent Login</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <AdCarousel />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Student Room</h1>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search rooms..." value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedCampus} onValueChange={handleCampusChange}>
              <SelectTrigger><SelectValue placeholder="Select campus" /></SelectTrigger>
              <SelectContent>
                {campuses.map(campus => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={roomType} onValueChange={handleRoomTypeChange}>
              <SelectTrigger><SelectValue placeholder="Room type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Single Room">Single Room</SelectItem>
                <SelectItem value="One Bedroom">One Bedroom</SelectItem>
                <SelectItem value="Two Bedroom">Two Bedroom</SelectItem>
                <SelectItem value="Shared Room">Shared Room</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={handlePriceRangeChange}>
              <SelectTrigger><SelectValue placeholder="Price range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="under-400k">Under ₦400,000</SelectItem>
                <SelectItem value="400k-550k">₦400,000 - ₦550,000</SelectItem>
                <SelectItem value="above-550k">Above ₦550,000</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearAllFilters}>
              <Filter className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          </div>
        </div>

        {/* Rooms */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {allRooms.map((room, index) => {
            const isLast = index === allRooms.length - 1;
            return (
              <div key={room._id} ref={isLast ? lastRoomElementRef : null}>
                <Link to={`/room/${room._id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition">
                    <img src={room.images[0]} alt={room.name} className="w-full h-32 md:h-48 object-cover" />
                    <CardContent className="p-2 md:p-4">
                      <h3 className="font-semibold text-sm md:text-lg mb-1">{room.name}</h3>
                      <p className="text-muted-foreground text-xs md:text-sm mb-1 flex items-center gap-1">
                      <GraduationCap className="w-2 h-2 md:w-3 md:h-3 flex-shrink-0" />
                      <span className="line-clamp-1">{room.campus}</span>
                    </p>
                      <p className="text-xs text-muted-foreground">{room.location}</p>
                      <Badge variant="outline" className="text-xs mt-2">{room.roomType}</Badge>
                      <p className="text-sm font-bold text-primary mt-2">₦{(room.yearlyPrice / 1000).toFixed(0)}k/year</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>

        {isLoading && (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
          </div>
        )}
        {!hasMore && !isLoading && (
          <div className="text-center text-muted-foreground py-6">🎉 You've reached the end!</div>
        )}
      </div>
    </div>
  );
};

export default Hostels;
