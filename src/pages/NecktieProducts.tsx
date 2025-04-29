import { useState, useEffect } from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { ProductCardProps } from '../components/ProductCard';
import { IconFilter } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { luxuryClasses } from '../components/LuxuryTheme';

// Interface for the necktie data structure from JSON
interface Necktie {
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
  material: string;
}

const NecktieProducts = () => {
  const navigate = useNavigate();
  const [neckties, setNeckties] = useState<Necktie[]>([]);
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([700, 1000]);
  const [sortOption, setSortOption] = useState<string | null>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Fetch neckties data
  useEffect(() => {
    const fetchNeckties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/neckties.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch neckties data');
        }
        
        const data = await response.json();
        setNeckties(data.neckties);
        
        // Convert Necktie to ProductCardProps format
        const productCards: ProductCardProps[] = data.neckties.map((tie: Necktie) => ({
          id: tie.id,
          name: tie.title,
          description: tie.description,
          price: tie.price,
          originalPrice: tie.originalPrice,
          image: tie.image,
          color: tie.color,
          isNew: tie.isNew,
          link: `/necktie-product/${tie.id}`,
          pattern: tie.pattern,
          material: tie.material,
          sku: tie.sku,
          quantity: tie.quantity,
          category: "necktie"
        }));
        
        setProducts(productCards);
        setFilteredProducts(productCards);
        setLoading(false);
      } catch (err) {
        setError('Failed to load neckties. Please try again later.');
        setLoading(false);
        console.error('Error fetching neckties:', err);
      }
    };
    
    fetchNeckties();
  }, []);
  
  // Handle price filter change
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    applyFilters(value, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string | null) => {
    setSortOption(option);
    applyFilters(priceRange, option);
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
      <div className="py-8">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <Text component="h1" className="text-3xl font-serif text-center mb-2">Necktie Collection</Text>
          <Text className="text-center text-gray-600 mb-8">Loading neckties...</Text>
        </Container>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="py-8">
        <Container size="xl" className="mb-6 px-6 md:px-8">
          <Text component="h1" className="text-3xl font-serif text-center mb-2">Necktie Collection</Text>
          <Text className="text-center text-red-600 mb-8">{error}</Text>
        </Container>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {/* Page Title */}
      <Container size="x0" className="mb-6 px-6 md:px-8">
        <div className="pt-16 md:pt-20">
          <Text component="h1" className={luxuryClasses.pageTitle}>NECKTIE COLLECTION</Text>
          <Text className={luxuryClasses.pageSubtitle}>
            Discover our exquisite collection of handcrafted neckties, made from the finest materials for the modern gentleman
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
      
      {/* Main Content */}
      <Container size="xl" className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Hide on mobile when not toggled */}
          <div className={`${
            isMobile 
              ? isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-white overflow-auto p-4' : 'hidden'
              : 'block w-1/5 min-w-[250px]'
          }`}>
            {isMobile && isMobileFilterOpen && (
              <div className="flex justify-between items-center mb-4">
                <Text fw={600}>Filters</Text>
                <Button
                  onClick={toggleMobileFilter}
                  variant="subtle"
                  color="gray"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            )}
            
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={handlePriceChange}
              sortOption={sortOption}
              setSortOption={handleSortChange}
              formatPrice={(val: number) => `₹${val}`}
              minPrice={700}
              maxPrice={1000}
              step={50}
            />
          </div>
          
          {/* Product Grid */}
          <div className={isMobile ? 'w-full' : 'w-4/5'}>
            <ProductGrid 
              products={filteredProducts} 
              columns={isMobile ? 2 : 3} 
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NecktieProducts; 