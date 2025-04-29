import { useState, useEffect } from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { ProductCardProps } from '../components/ProductCard';
import StaticProductService from '../services/StaticProductService';
import { IconFilter } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { luxuryClasses } from '../components/LuxuryTheme';

const Neckties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([700, 1000]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    // Get products from static service
    const { neckties } = StaticProductService.getStaticProducts();
    setProducts(neckties);
    
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    
    // Set initial filters from URL if present
    const initialPriceRange: [number, number] = [
      minPrice ? parseInt(minPrice) : 700,
      maxPrice ? parseInt(maxPrice) : 1000
    ];
    const initialSort = sort || 'newest';
    
    setPriceRange(initialPriceRange);
    setSortOption(initialSort);
    
    // Apply initial filters
    applyFilters(initialPriceRange, initialSort, neckties);
  }, [location.search]);
  
  // Update URL with current filter state
  const updateURLParams = (
    prices: [number, number], 
    sort: string | null
  ) => {
    const params = new URLSearchParams();
    
    // Only add price parameters if they differ from defaults
    if (prices[0] !== 700) {
      params.set('minPrice', prices[0].toString());
    }
    if (prices[1] !== 1000) {
      params.set('maxPrice', prices[1].toString());
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
    const newFiltered = applyFilters(range, sortOption);
    updateURLParams(range, sortOption);
    return newFiltered;
  };
  
  // Handle sorting option change
  const handleSortChange = (option: string | null) => {
    setSortOption(option);
    const newFiltered = applyFilters(priceRange, option);
    updateURLParams(priceRange, option);
    return newFiltered;
  };
  
  // Apply all filters
  const applyFilters = (
    prices: [number, number], 
    sort: string | null,
    productList = products
  ) => {
    let filtered = [...productList];
    
    // Apply price filter - ensure values are treated as numbers
    filtered = filtered.filter(product => {
      return product.price >= prices[0] && product.price <= prices[1];
    });
    
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
        <Text component="h1" className={luxuryClasses.pageTitle}>NECKTIES COLLECTION</Text>
        <Text className={luxuryClasses.pageSubtitle}>
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
                  setPriceRange={handlePriceRangeChange}
                  sortOption={sortOption}
                  setSortOption={handleSortChange}
                  formatPrice={(val: number) => `₹${val}`}
                  minPrice={700}
                  maxPrice={1000}
                  step={50}
                />
              )
            ) : (
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={handlePriceRangeChange}
                sortOption={sortOption}
                setSortOption={handleSortChange}
                formatPrice={(val: number) => `₹${val}`}
                minPrice={700}
                maxPrice={1000}
                step={50}
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