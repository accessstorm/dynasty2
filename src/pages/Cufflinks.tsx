import React, { useState, useEffect } from 'react';
import { Container, Text, Button, Drawer, Loader } from '@mantine/core';
import { IconFilter, IconAlertCircle, IconAdjustments, IconMoodSad } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { getStaticProducts } from '../services/StaticProductService';
import { ProductCardProps } from '../services/StaticProductService';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';

// Define color filters with their counts
const colorFilters = [
  { color: 'silver', label: 'Silver', count: 5, colorCode: '#C0C0C0' },
  { color: 'gold', label: 'Gold', count: 5, colorCode: '#D4AF37' },
  { color: 'black', label: 'Black', count: 3, colorCode: '#000000' },
  { color: 'blue', label: 'Blue', count: 4, colorCode: '#1E3A8A' },
  { color: 'red', label: 'Red', count: 3, colorCode: '#B91C1C' }
];

const Cufflinks = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1800, 3500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [openedDrawer, setOpenedDrawer] = useState<boolean>(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Load products and apply initial URL filters
  useEffect(() => {
    const fetchCufflinks = async () => {
      try {
        setLoading(true);
        
        // Get all products from the static service
        const allProducts = getStaticProducts();
        
        // Filter only cufflinks
        const cufflinksProducts = allProducts.cufflinks;
        
        setProducts(cufflinksProducts);
        
        // Parse URL parameters for initial filter state
        const params = new URLSearchParams(location.search);
        
        // Set initial price range from URL or use defaults
        const minPrice = params.get('minPrice') ? parseInt(params.get('minPrice') || '1800') : 1800;
        const maxPrice = params.get('maxPrice') ? parseInt(params.get('maxPrice') || '3500') : 3500;
        setPriceRange([minPrice, maxPrice]);
        
        // Set initial colors from URL
        const urlColors = params.get('colors')?.split(',') || [];
        setSelectedColors(urlColors);
        
        // Set initial sort option from URL
        const sort = params.get('sort') || 'newest';
        setSortOption(sort);
        
        // Apply filters with URL parameters
        applyFilters(
          [minPrice, maxPrice],
          urlColors,
          sort,
          cufflinksProducts
        );
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load cufflinks. Please try again later.');
        setLoading(false);
        console.error('Error fetching cufflinks:', err);
      }
    };
    
    fetchCufflinks();
  }, [location.search]);
  
  // Update URL with current filter state
  const updateURLParams = (
    prices: [number, number], 
    colors: string[], 
    sort: string | null
  ) => {
    const params = new URLSearchParams();
    
    // Only add price parameters if they differ from defaults
    if (prices[0] !== 1800) {
      params.set('minPrice', prices[0].toString());
    }
    if (prices[1] !== 3500) {
      params.set('maxPrice', prices[1].toString());
    }
    
    // Add color parameters if any are selected
    if (colors.length > 0) {
      params.set('colors', colors.join(','));
    }
    
    // Add sort parameter if not default
    if (sort && sort !== 'newest') {
      params.set('sort', sort);
    }
    
    // Update URL without full page reload
    const newSearch = params.toString() ? `?${params.toString()}` : '';
    navigate({ search: newSearch }, { replace: true });
  };
  
  // Handle price filter change
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    const newFiltered = applyFilters(range, selectedColors, sortOption);
    updateURLParams(range, selectedColors, sortOption);
    return newFiltered;
  };
  
  // Handle color filter change
  const handleColorFilterChange = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(updatedColors);
    const newFiltered = applyFilters(priceRange, updatedColors, sortOption);
    updateURLParams(priceRange, updatedColors, sortOption);
    return newFiltered;
  };
  
  // Apply all filters
  const applyFilters = (
    prices: [number, number], 
    colors: string[], 
    sort: string | null,
    productList = products
  ) => {
    let filtered = [...productList];
    
    // Apply price filter - ensure values are treated as numbers
    filtered = filtered.filter(product => {
      return product.price >= prices[0] && product.price <= prices[1];
    });
    
    // Apply color filter if any colors selected
    if (colors.length > 0) {
      filtered = filtered.filter(product => 
        product.color && colors.includes(product.color.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      filtered.sort((a, b) => {
        // Sort by isNew first, then by id
        if (a.isNew === b.isNew) {
          return b.id - a.id;
        }
        return a.isNew ? -1 : 1;
      });
    }
    
    setFilteredProducts(filtered);
    return filtered;
  };
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  // Format price for display
  const formatPrice = (value: number) => `₹${value.toLocaleString('en-IN')}`;
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <Text component="h1" className="text-3xl font-serif text-center mb-2">Cufflinks Collection</Text>
          <Text className="text-center text-gray-600 mb-8">
            Discover our exquisite collection of handcrafted cufflinks
          </Text>
        </Container>
        
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader size="lg" />
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <Text component="h1" className="text-3xl font-serif text-center mb-2">Cufflinks Collection</Text>
          <Text className="text-center text-gray-600 mb-8">
            Discover our exquisite collection of handcrafted cufflinks
          </Text>
        </Container>
        
        <div className="text-center text-red-600 min-h-[300px] flex items-center justify-center">
          <div>
            <IconAlertCircle size={40} className="mx-auto mb-4" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Container size="xl" className="mb-6 px-6 md:px-8">
        <Text component="h1" className="text-3xl font-serif text-center mb-2">Cufflinks Collection</Text>
        <Text className="text-center text-gray-600 mb-8">
          Discover our exquisite collection of handcrafted cufflinks
        </Text>
      </Container>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 min-h-[300px] flex items-center justify-center">
          <div>
            <IconAlertCircle size={40} className="mx-auto mb-4" />
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="md:hidden w-full mb-4">
            <Button 
              fullWidth 
              leftSection={<IconAdjustments size={20} />}
              onClick={() => setOpenedDrawer(true)}
              variant="outline"
            >
              Filters
            </Button>
          </div>
          
          {/* Responsive drawer for mobile filters */}
          <Drawer
            opened={openedDrawer}
            onClose={() => setOpenedDrawer(false)}
            title="Filters"
            padding="lg"
            position="right"
          >
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              colorFilters={colorFilters}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              sortOption={sortOption}
              setSortOption={setSortOption}
              formatPrice={formatPrice}
              minPrice={3400}
              maxPrice={18000}
              step={100}
            />
          </Drawer>
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-1/4 min-w-[220px]">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              colorFilters={colorFilters}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              sortOption={sortOption}
              setSortOption={setSortOption}
              formatPrice={formatPrice}
              minPrice={3400}
              maxPrice={18000}
              step={100}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Text className="text-lg">{filteredProducts.length} products</Text>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 border rounded-md">
                <IconMoodSad size={40} className="mx-auto mb-4 text-gray-400" />
                <Text size="lg">No products match your filters</Text>
                <Button 
                  variant="subtle" 
                  onClick={() => {
                    setPriceRange([1800, 3500]);
                    setSelectedColors([]);
                    setSortOption('newest');
                  }} 
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} columns={isMobile ? 2 : 3} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cufflinks; 