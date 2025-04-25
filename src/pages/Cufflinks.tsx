import { useState, useEffect } from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { ProductCardProps } from '../components/ProductCard';
import StaticProductService from '../services/StaticProductService';
import { IconFilter } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

// Sample cufflinks data
const cufflinksData: ProductCardProps[] = [
  {
    id: 101,
    name: "Silver Square Cufflinks",
    description: "Classic sterling silver square cufflinks with subtle engraving",
    price: 7999,
    color: "silver",
    image: "/images/cufflinks1.jpg",
    isNew: true,
    link: `/product/101`
  },
  {
    id: 102,
    name: "Gold Knot Cufflinks",
    description: "Elegant gold-plated knot design cufflinks",
    price: 9499,
    color: "gold",
    image: "/images/cufflinks2.jpg",
    isNew: false,
    link: `/product/102`
  },
  {
    id: 103,
    name: "Onyx Round Cufflinks",
    description: "Sophisticated black onyx stone set in silver",
    price: 8499,
    color: "black",
    image: "/images/cufflinks3.jpg",
    isNew: true,
    link: `/product/103`
  },
  {
    id: 104,
    name: "Navy Blue Enamel",
    description: "Navy blue enamel with silver detailing",
    price: 7299,
    color: "blue",
    image: "/images/cufflinks4.jpg",
    isNew: true,
    link: `/product/104`
  },
  {
    id: 105,
    name: "Burgundy Stone",
    description: "Deep burgundy stone set in gold plating",
    price: 8999,
    color: "burgundy",
    image: "/images/cufflinks5.jpg",
    isNew: false,
    link: `/product/105`
  },
  {
    id: 106,
    name: "Silver Initial",
    description: "Personalized silver initial cufflinks",
    price: 10999,
    color: "silver",
    image: "/images/cufflinks6.jpg",
    isNew: true,
    link: `/product/106`
  }
];

const Cufflinks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([7000, 11000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Color filters with counts for cufflinks
  const colorFilters = [
    { color: 'silver', label: 'Silver', count: 2, colorCode: '#C0C0C0' },
    { color: 'gold', label: 'Gold', count: 1, colorCode: '#D4AF37' },
    { color: 'black', label: 'Black', count: 1, colorCode: '#000000' },
    { color: 'blue', label: 'Blue', count: 1, colorCode: '#0047AB' },
    { color: 'burgundy', label: 'Burgundy', count: 1, colorCode: '#800020' },
  ];
  
  useEffect(() => {
    // Set the static cufflinks data
    setProducts(cufflinksData);
    
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const colors = searchParams.get('colors');
    const sort = searchParams.get('sort');
    
    // Set initial filters from URL if present
    const initialPriceRange: [number, number] = [
      minPrice ? parseInt(minPrice) : 7000,
      maxPrice ? parseInt(maxPrice) : 11000
    ];
    const initialColors = colors ? colors.split(',') : [];
    const initialSort = sort || 'newest';
    
    setPriceRange(initialPriceRange);
    setSelectedColors(initialColors);
    setSortOption(initialSort);
    
    // Apply initial filters
    applyFilters(initialPriceRange, initialColors, initialSort, cufflinksData);
  }, [location.search]);
  
  // Update URL with current filter state
  const updateURLParams = (
    prices: [number, number], 
    colors: string[], 
    sort: string | null
  ) => {
    const params = new URLSearchParams();
    
    // Only add price parameters if they differ from defaults
    if (prices[0] !== 7000) {
      params.set('minPrice', prices[0].toString());
    }
    if (prices[1] !== 11000) {
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
        <Text component="h1" className="text-3xl font-serif text-center mb-2">Cufflinks Collection</Text>
        <Text className="text-center text-gray-600 mb-8">
          Elevate your formal attire with our selection of premium cufflinks, crafted for distinction
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

export default Cufflinks; 