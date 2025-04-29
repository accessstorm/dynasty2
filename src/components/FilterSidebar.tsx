import { useState, useEffect } from 'react';
import { Text, RangeSlider, NumberInput } from '@mantine/core';

export interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortOption: string | null;
  setSortOption: (option: string | null) => void;
  formatPrice: (value: number) => string;
  minPrice: number;
  maxPrice: number;
  step: number;
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  formatPrice,
  minPrice = 3400,
  maxPrice = 18000,
  step = 100
}: FilterSidebarProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  
  // Update local price range when props change
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);
  
  const handlePriceRangeChange = (value: [number, number]) => {
    setLocalPriceRange(value);
    // Apply price filter immediately without needing the Filter button
    setPriceRange(value);
  };
  
  const handleMinPriceChange = (value: number) => {
    if (value >= 0 && value <= localPriceRange[1]) {
      const newRange: [number, number] = [value, localPriceRange[1]];
      setLocalPriceRange(newRange);
      setPriceRange(newRange);
    }
  };
  
  const handleMaxPriceChange = (value: number) => {
    if (value >= localPriceRange[0]) {
      const newRange: [number, number] = [localPriceRange[0], value];
      setLocalPriceRange(newRange);
      setPriceRange(newRange);
    }
  };
  
  // The main sidebar content - price filter
  const renderFilterContent = () => (
    <>
      {/* Price Filter Section */}
      <div className="mb-8">
        <Text className="text-xl font-medium mb-6 border-b pb-2" id="price-filter-heading">Filter by price</Text>
        
        <div className="mb-6" role="group" aria-labelledby="price-filter-heading">
          <RangeSlider
            min={minPrice}
            max={maxPrice}
            step={step}
            value={localPriceRange}
            onChange={handlePriceRangeChange}
            minRange={step}
            label={formatPrice}
            thumbSize={14}
            aria-label="Price range"
            styles={{
              track: { height: 4 },
              thumb: { 
                backgroundColor: "#fff", 
                borderWidth: 1, 
                borderColor: "#000",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
              },
              label: { 
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "10px",
                padding: "2px 6px" 
              }
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Text size="sm" color="dimmed">Price:</Text>
            <div className="flex items-center">
              <Text size="sm" className="mr-1">₹</Text>
              <NumberInput
                value={localPriceRange[0]}
                onChange={(val) => handleMinPriceChange(val as number)}
                min={minPrice}
                max={localPriceRange[1]}
                step={step}
                size="xs"
                styles={{ input: { width: '60px', padding: '2px 8px' } }}
                hideControls
                aria-label="Minimum price"
              />
            </div>
            <Text size="sm">—</Text>
            <div className="flex items-center">
              <Text size="sm" className="mr-1">₹</Text>
              <NumberInput
                value={localPriceRange[1]}
                onChange={(val) => handleMaxPriceChange(val as number)}
                min={localPriceRange[0]}
                max={maxPrice}
                step={step}
                size="xs"
                styles={{ input: { width: '60px', padding: '2px 8px' } }}
                hideControls
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  return (
    <div className="w-full sticky top-4">
      {renderFilterContent()}
    </div>
  );
};

export default FilterSidebar; 