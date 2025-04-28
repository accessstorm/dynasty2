import { useState, useEffect } from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { ProductCardProps } from '../components/ProductCard';
import { IconFilter } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

// Interface for the gift set data structure from JSON
interface GiftSet {
  id: number;
  title: string;
  sku: string;
  price: number;
  originalPrice: number;
  quantity: number;
  pattern: string;
  description: string;
  styleGuide: string;
  image: string;
  color: string;
  isNew: boolean;
}

const GiftSets = () => {
  const navigate = useNavigate();
  const [giftSets, setGiftSets] = useState<GiftSet[]>([]);
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1800, 3000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Color filters with counts for gift sets
  const colorFilters = [
    { color: 'coral', label: 'Coral', count: 1, colorCode: '#FF7F50' },
    { color: 'rosewood', label: 'Rosewood', count: 1, colorCode: '#65000B' },
    { color: 'navy', label: 'Navy', count: 2, colorCode: '#172554' },
    { color: 'azure', label: 'Azure', count: 1, colorCode: '#007FFF' },
    { color: 'frosted', label: 'Frosted', count: 1, colorCode: '#E8F4F8' },
    { color: 'blush', label: 'Blush', count: 2, colorCode: '#DE5D83' },
    { color: 'gold', label: 'Gold', count: 1, colorCode: '#FFD700' },
    { color: 'midnight', label: 'Midnight', count: 2, colorCode: '#191970' },
    { color: 'emerald', label: 'Emerald', count: 1, colorCode: '#50C878' },
    { color: 'teal', label: 'Teal', count: 2, colorCode: '#008080' },
    { color: 'green', label: 'Green', count: 1, colorCode: '#008000' },
    { color: 'aqua', label: 'Aqua', count: 1, colorCode: '#00FFFF' },
    { color: 'purple', label: 'Purple', count: 1, colorCode: '#800080' },
    { color: 'mint', label: 'Mint', count: 1, colorCode: '#3EB489' },
    { color: 'crimson', label: 'Crimson', count: 2, colorCode: '#DC143C' },
  ];
  
  // Fetch gift sets data
  useEffect(() => {
    const fetchGiftSets = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/giftsets.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gift sets data');
        }
        
        const data = await response.json();
        setGiftSets(data.giftsets);
        
        // Convert GiftSet to ProductCardProps format
        const productCards: ProductCardProps[] = data.giftsets.map((set: GiftSet) => ({
          id: set.id,
          name: set.title,
          description: set.description,
          price: set.price,
          image: set.image,
          color: set.color,
          isNew: set.isNew,
          link: `/gift-set/${set.id}`,
          pattern: set.pattern,
          material: "Microfiber Blend",
          sku: set.sku,
          quantity: set.quantity,
          category: "gift-set"
        }));
        
        setProducts(productCards);
        setFilteredProducts(productCards);
        setLoading(false);
      } catch (err) {
        setError('Failed to load gift sets. Please try again later.');
        setLoading(false);
        console.error('Error fetching gift sets:', err);
      }
    };
    
    fetchGiftSets();
  }, []);
  
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
    if (prices[1] !== 3000) {
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
  
  // Create a wrapper function that matches setSelectedColors signature
  const handleSetSelectedColors = (colors: string[]) => {
    setSelectedColors(colors);
    const newFiltered = applyFilters(priceRange, colors, sortOption);
    updateURLParams(priceRange, colors, sortOption);
    return newFiltered;
  };
  
  // Handle sorting option change
  const handleSortChange = (option: string | null) => {
    setSortOption(option);
    const newFiltered = applyFilters(priceRange, selectedColors, option);
    updateURLParams(priceRange, selectedColors, option);
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
  
  // Loading state
  if (loading) {
    return (
      <div className="py-8 mt-12">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <div className="pt-16 md:pt-20">
            <Text component="h1" className="text-4xl font-serif text-center mb-4" style={{ color: "#000000" }}>Gift Sets Collection</Text>
            <Text className="text-center text-gray-600 mb-10" size="lg">Loading gift sets...</Text>
          </div>
        </Container>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="py-8 mt-12">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <div className="pt-16 md:pt-20">
            <Text component="h1" className="text-4xl font-serif text-center mb-4" style={{ color: "#000000" }}>Gift Sets Collection</Text>
            <Text className="text-center text-red-600 mb-10" size="lg">{error}</Text>
          </div>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="py-1 mt-1">
      {/* Page Title */}
      <Container size="x0" className="mb-6 px-6 md:px-8">
        <div className="pt-16 md:pt-20">
          <Text component="h1" className="text-4xl font-serif text-center mb-4" style={{ color: "#000000" }}>Gift Sets Collection</Text>
          <Text className="text-center text-gray-600 mb-10" size="lg">
            Discover our exquisite collection of gift sets, featuring premium neckties, pocket squares, and cufflinks
          </Text>
        </div>
        
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
                  colorFilters={colorFilters}
                  selectedColors={selectedColors}
                  setSelectedColors={handleSetSelectedColors}
                  sortOption={sortOption}
                  setSortOption={handleSortChange}
                  formatPrice={(val: number) => `₹${val}`}
                  minPrice={1800}
                  maxPrice={3000}
                  step={100}
                />
              )
            ) : (
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={handlePriceRangeChange}
                colorFilters={colorFilters}
                selectedColors={selectedColors}
                setSelectedColors={handleSetSelectedColors}
                sortOption={sortOption}
                setSortOption={handleSortChange}
                formatPrice={(val: number) => `₹${val}`}
                minPrice={1800}
                maxPrice={3000}
                step={100}
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

export default GiftSets; 