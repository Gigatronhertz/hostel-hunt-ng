import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, MapPin, Wifi, Zap, Droplets, Users, Filter, GraduationCap, Bed, Menu, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hostels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [selectedCampus, setSelectedCampus] = useState(searchParams.get('campus') || "");
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || "");
  const [roomType, setRoomType] = useState(searchParams.get('roomType') || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('pageNum') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRooms, setTotalRooms] = useState(0);

  // Expanded campuses list with new universities
  const campuses = [
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "Federal University of Technology, Akure",
    "Lagos State University",
    "University of Agriculture, Abeokuta",
    "Federal University of Agriculture, Makurdi",
    "University of Port Harcourt",
    "Federal University of Technology, Minna",
    "Bayero University, Kano"
  ];

  // Expanded rooms data with new campuses


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

  // Room data state
  const [allRooms, setAllRooms] = useState([]);

  // Update URL params when filters or page changes
  const updateURLParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Reset to page 1 when filters change (except when changing page itself)
    if (!updates.pageNum && (updates.search !== undefined || updates.campus !== undefined || updates.priceRange !== undefined || updates.roomType !== undefined)) {
      newParams.set('pageNum', '1');
      setCurrentPage(1);
    }

    setSearchParams(newParams);
  };

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateURLParams({ search: value });
  };

  const handleCampusChange = (value: string) => {
    setSelectedCampus(value);
    updateURLParams({ campus: value });
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    updateURLParams({ priceRange: value });
  };

  const handleRoomTypeChange = (value: string) => {
    setRoomType(value);
    updateURLParams({ roomType: value });
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURLParams({ pageNum: page.toString() });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCampus("");
    setPriceRange("");
    setRoomType("");
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  // Fetch rooms with pagination and filtering
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.set('page', currentPage.toString());
        queryParams.set('limit', '5'); // 12 items per page for grid layout

        if (searchTerm) queryParams.set('search', searchTerm);
        if (selectedCampus) queryParams.set('campus', selectedCampus);
        if (priceRange) queryParams.set('priceRange', priceRange);
        if (roomType) queryParams.set('roomType', roomType);

        const res = await fetch(`https://hostelng.onrender.com/all-rooms?${queryParams.toString()}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await res.json();
        console.log("Fetched rooms:", data);
        
        // Handle both paginated and non-paginated responses
        if (data.rooms) {
          setAllRooms(data.rooms);
          setTotalPages(data.totalPages || 1);
          setTotalRooms(data.total || data.rooms.length);
        } else {
          // Fallback for non-paginated response
          setAllRooms(data);
          setTotalPages(1);
          setTotalRooms(data.length);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setAllRooms([]);
        setTotalPages(1);
        setTotalRooms(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage, searchTerm, selectedCampus, priceRange, roomType]);

  // Use allRooms directly since filtering is done on backend
  const displayRooms = allRooms;

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
            <Link to="/rooms" className="text-primary font-medium">
              Browse Rooms
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
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
                  className="text-lg font-medium text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Rooms
                </Link>
                <Link 
                  to="/about" 
                  className="text-lg text-muted-foreground hover:text-primary transition-colors"
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Student Room</h1>
          
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCampus} onValueChange={handleCampusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={roomType} onValueChange={handleRoomTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single Room">Single Room</SelectItem>
                <SelectItem value="One Bedroom">One Bedroom</SelectItem>
                <SelectItem value="Two Bedroom">Two Bedroom</SelectItem>
                <SelectItem value="Shared Room">Shared Room</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={handlePriceRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Price range (yearly)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-400k">Under ₦400,000</SelectItem>
                <SelectItem value="400k-550k">₦400,000 - ₦550,000</SelectItem>
                <SelectItem value="above-550k">Above ₦550,000</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {isLoading ? "Loading..." : `${totalRooms} room${totalRooms !== 1 ? 's' : ''} found`}
            {selectedCampus && ` around ${selectedCampus}`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading rooms...</span>
          </div>
        )}

        {/* Rooms Grid - 2 columns on mobile, 3 on desktop */}
        {!isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {displayRooms.map((room) => (
            <Link key={room._id} to={`/room/${room._id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg">
<img
  src={room.images[0]}  // Changed from room.image to room.images[0]
  alt={room.name}
  className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
/>
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm font-medium">
                    ⭐ {room.rating}
                  </div>
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-2 md:py-1 text-xs md:text-sm font-medium flex items-center gap-1">
                    <Bed className="w-2 h-2 md:w-3 md:h-3" />
                    {room.bedCount} bed{room.bedCount !== 1 ? 's' : ''}
                  </div>
                </div>
                <CardContent className="p-2 md:p-4">
                  <h3 className="font-semibold text-sm md:text-lg mb-1 line-clamp-1">{room.name}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-1 flex items-center gap-1">
                    <GraduationCap className="w-2 h-2 md:w-3 md:h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{room.campus}</span>
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm mb-2 flex items-center gap-1">
                    <MapPin className="w-2 h-2 md:w-3 md:h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{room.location}</span>
                  </p>
                  <Badge variant="outline" className="text-xs mb-2">
                    {room.roomType}
                  </Badge>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">{room.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        <span className="mr-1">{getAmenityIcon(amenity)}</span>
                        <span className="hidden md:inline">{amenity}</span>
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{room.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm md:text-lg font-bold text-primary">
                        ₦{(room.yearlyPrice / 1000).toFixed(0)}k
                      </span>
                      <span className="text-xs font-normal text-muted-foreground block">per year</span>
                    <span className="text-xs text-muted-foreground hidden md:block">
  Inspection: ₦{(room.inspectionFee ?? 5000).toLocaleString()}
</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs md:text-sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {!isLoading && displayRooms.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or selecting a different campus.
            </p>
            <Button onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hostels;
