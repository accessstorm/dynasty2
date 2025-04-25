import { useState, useEffect } from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { ProductCardProps } from '../components/ProductCard';
import StaticProductService from '../services/StaticProductService';
import { IconFilter } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

const Neckties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([3400, 18000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Color filters with counts for neckties
  const colorFilters = [
    { color: 'blue', label: 'Blue', count: 10, colorCode: '#1e3a8a' },
    { color: 'black', label: 'Black', count: 8, colorCode: '#000000' },
    { color: 'grey', label: 'Grey', count: 7, colorCode: '#6b7280' },
    { color: 'green', label: 'Green', count: 6, colorCode: '#166534' },
    { color: 'burgundy', label: 'Burgundy', count: 4, colorCode: '#800020' },
    { color: 'navy', label: 'Navy Blue', count: 4, colorCode: '#172554' },
    { color: 'red', label: 'Red', count: 3, colorCode: '#b91c1c' },
    { color: 'white', label: 'White', count: 3, colorCode: '#ffffff' },
    { color: 'brown', label: 'Brown', count: 2, colorCode: '#8b4513' },
  ];
  
  useEffect(() => {
    // Get products from static service
    const { neckties } = StaticProductService.getStaticProducts();
    setProducts(neckties);
    
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const colors = searchParams.get('colors');
    const sort = searchParams.get('sort');
    
    // Set initial filters from URL if present
    const initialPriceRange: [number, number] = [
      minPrice ? parseInt(minPrice) : 3400,
      maxPrice ? parseInt(maxPrice) : 18000
    ];
    const initialColors = colors ? colors.split(',') : [];
    const initialSort = sort || 'newest';
    
    setPriceRange(initialPriceRange);
    setSelectedColors(initialColors);
    setSortOption(initialSort);
    
    // Apply initial filters
    applyFilters(initialPriceRange, initialColors, initialSort, neckties);
  }, [location.search]);
  
  // Update URL with current filter state
  const updateURLParams = (
    prices: [number, number], 
    colors: string[], 
    sort: string | null
  ) => {
    const params = new URLSearchParams();
    
    // Only add price parameters if they differ from defaults
    if (prices[0] !== 3400) {
      params.set('minPrice', prices[0].toString());
    }
    if (prices[1] !== 18000) {
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
      filtered.sort((a, b) => b.id - a.id);
    }
    
    setFilteredProducts(filtered);
    return filtered;
  };
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="py-8">
      {/* Page Title */}
      <Container size="xl" className="mb-6 px-6 md:px-8">
        <Text component="h1" className="text-3xl font-serif text-center mb-2">Neckties Collection</Text>
        <Text className="text-center text-gray-600 mb-8">
          Discover our exquisite collection of handcrafted neckties, made from the finest materials
        </Text>
        
        {/* Results Header */}
        <div className="mb-2 flex justify-between items-center">
          <Text>
            Showing all {filteredProducts.length} results
          </Text>
          {isMobile && (
            <Button
              onClick={toggleMobileFilter}
              className="bg-black text-white"
              radius="md"
              size="sm"
              leftSection={<IconFilter size={16} />}
            >
              Filters
            </Button>
          )}
        </div>
      </Container>
      
      <Container size="xl" className="px-6 md:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 md:pr-8">
            {isMobile ? (
              isMobileFilterOpen && (
                <FilterSidebar
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  colorFilters={colorFilters}
                  onColorFilterChange={handleColorFilterChange}
                  selectedColors={selectedColors}
                />
              )
            ) : (
              <FilterSidebar
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                colorFilters={colorFilters}
                onColorFilterChange={handleColorFilterChange}
                selectedColors={selectedColors}
              />
            )}
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Neckties; 