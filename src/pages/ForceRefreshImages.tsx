import React, { useState, useEffect } from 'react';
import { Container, Text, Button, Alert, Progress } from '@mantine/core';

const ForceRefreshImages: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{success: number, failed: number}>({ success: 0, failed: 0 });
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Define the image sets we want to refresh
  const imageSets = [
    {
      name: 'Necktie Box Images',
      directory: '/images/Aproducts/1Necktie/box/',
      files: [
        'Rosewood Reverie.jpg',
        'Tangerine Tact.jpg',
        'Purple Prism.jpg',
        'Jade Reverie.jpg',
        'Bold Blush Charm.jpg',
        'Amber Grid Classic.jpg',
        'Golden Gleam Check.jpg',
        'Crimson Board.jpg',
        'Midnight Stride.jpg',
        'Rosé Rally.jpg',
        'Blush Boulevard.jpg',
        'Lavender Lines.jpg',
        'Golden Charm.jpg',
        'Royal Whimsy.jpg',
        'Vintage Charm.jpg',
        'Highland Flair.jpg',
        'Midnight Maze.jpg',
        'Ocean Breeze.jpg',
        'Royal Twilight.jpg'
      ]
    },
    {
      name: 'Necktie Front/Back Images',
      directory: '/images/Aproducts/1Necktie/frontback/',
      files: [
        'Rosewood Reverie.jpg',
        'Tangerine Tact.jpg',
        'Purple Prism.jpg',
        'Jade Reverie.jpg',
        'Bold Blush Charm.jpg',
        'Amber Grid Classic.jpg',
        'Golden Gleam Check.jpg',
        'Crimson Board.jpg',
        'Midnight Stride.jpg',
        'Rosé Rally.jpg',
        'Blush Boulevard.jpg',
        'Lavender Lines.jpg',
        'Golden Charm.jpg',
        'Royal Whimsy.jpg',
        'Vintage Charm.jpg',
        'Highland Flair.jpg',
        'Midnight Maze.jpg',
        'Ocean Breeze.jpg',
        'Royal Twilight.jpg'
      ]
    },
    {
      name: 'Necktie Roll Images',
      directory: '/images/Aproducts/1Necktie/roll/',
      files: [
        'Rosewood Reverie.jpg',
        'Tangerine Tact.jpg',
        'Purple Prism.jpg',
        'Jade Reverie.jpg',
        'Bold Blush Charm.jpg',
        'Amber Grid Classic.jpg',
        'Golden Gleam Check.jpg',
        'Crimson Board.jpg',
        'Midnight Stride.jpg',
        'Rosé Rally.jpg',
        'Blush Boulevard.jpg',
        'Lavender Lines.jpg',
        'Golden Charm.jpg',
        'Royal Whimsy.jpg',
        'Vintage Charm.jpg',
        'Highland Flair.jpg',
        'Midnight Maze.jpg',
        'Ocean Breeze.jpg',
        'Royal Twilight.jpg'
      ]
    },
    {
      name: 'Gift Set Box Images',
      directory: '/images/Aproducts/2Giftset/box/',
      files: [
        'Coral Elegance.jpg',
        'Rosewood Majesty.jpg',
        'Serene Paisley.jpg',
        'Azure Prism.jpg',
        'Frosted Whirl.jpg',
        'Blush Avenue.jpg',
        'Golden Hour.jpg',
        'Blush Mosaic.jpg',
        'Midnight Paisley.jpg',
        'Emerald Ivory Elegance.jpg',
        'Teal Noir.jpg',
        'Dark Green Fuchsia Paisley.jpg',
        'Navy Brown Bloom.jpg',
        'Aqua Lilac Paisley.jpg',
        'Teal & Green Paisley.jpg',
        'Royal Amethyst.jpg',
        'whiteblue.jpg',
        'Crimson Royale Brocade.jpg',
        'Midnight Mirage Paisley.jpg',
        'Crimson Checkmate.jpg'
      ]
    },
    {
      name: 'Gift Set Set Images',
      directory: '/images/Aproducts/2Giftset/set/',
      files: [
        'Coral Elegance.jpg',
        'Rosewood Majesty.jpg',
        'Serene Paisley.jpg',
        'Azure Prism.jpg',
        'Frosted Whirl.jpg',
        'Blush Avenue.jpg',
        'Golden Hour.jpg',
        'Blush Mosaic.jpg',
        'Midnight Paisley.jpg',
        'Emerald Ivory Elegance.jpg',
        'Teal Noir.JPG',
        'Dark Green Fuchsia Paisley.jpg',
        'Navy Brown Bloom.jpg',
        'Aqua Lilac Paisley.jpg',
        'Teal & Green Paisley.jpg',
        'Royal Amethyst.jpg',
        'whiteblue.jpg',
        'Crimson Royale Brocade.jpg',
        'Midnight Mirage Paisley.jpg',
        'Crimson Checkmate.jpg'
      ]
    }
  ];

  // Calculate total files to process
  const totalFiles = imageSets.reduce((sum, set) => sum + set.files.length, 0);

  // Generate unique timestamp for cache busting
  const generateCacheBuster = () => `?v=${Math.random()}_${new Date().getTime()}`;

  // Force reload an image
  const forceReloadImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        console.log(`Successfully loaded: ${url}`);
        resolve(true);
      };
      
      img.onerror = () => {
        console.error(`Failed to load: ${url}`);
        resolve(false);
      };
      
      // Apply cachebuster and load the image
      const cacheBuster = generateCacheBuster();
      img.src = `${url}${cacheBuster}`;
    });
  };

  // Handle the refresh process
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setProgress(0);
    setResults({ success: 0, failed: 0 });
    setMessage({ text: 'Starting refresh process...', type: 'info' });
    
    let successCount = 0;
    let failedCount = 0;
    let processedCount = 0;
    
    // Process all sets
    for (const set of imageSets) {
      setMessage({ text: `Processing ${set.name}...`, type: 'info' });
      
      for (const file of set.files) {
        const url = `${window.location.origin}${set.directory}${file}`;
        const success = await forceReloadImage(url);
        
        if (success) {
          successCount++;
        } else {
          failedCount++;
        }
        
        processedCount++;
        const currentProgress = Math.floor((processedCount / totalFiles) * 100);
        setProgress(currentProgress);
        setResults({ success: successCount, failed: failedCount });
      }
    }
    
    setIsRefreshing(false);
    
    if (failedCount === 0) {
      setMessage({ text: 'All images refreshed successfully!', type: 'success' });
    } else {
      setMessage({ 
        text: `Refresh completed with some errors. ${successCount} successful, ${failedCount} failed.`, 
        type: 'error' 
      });
    }
  };
  
  // Clear all local browser cache (localStorage, sessionStorage)
  const clearLocalCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setMessage({ text: 'Local storage cache cleared successfully', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to clear local storage cache', type: 'error' });
      console.error('Error clearing cache:', error);
    }
  };

  // Add a timestamp to force reload on next page visit
  const addTimestampToStorage = () => {
    try {
      localStorage.setItem('cacheBreakTimestamp', new Date().getTime().toString());
      setMessage({ text: 'Cache timestamp updated - will force reload assets on next page visit', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to update cache timestamp', type: 'error' });
      console.error('Error setting timestamp:', error);
    }
  };

  return (
    <Container size="lg" py={30}>
      <Text size="xl" fw={700} mb={20}>
        Force Refresh Images
      </Text>
      
      {message && (
        <Alert color={message.type === 'success' ? 'green' : message.type === 'error' ? 'red' : 'blue'} mb={20}>
          {message.text}
        </Alert>
      )}
      
      <Text mb={20}>
        This tool forces the browser to reload images from the server, bypassing the cache.
        It can help resolve issues where images don't appear due to caching problems.
      </Text>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: 20 }}>
        <Button 
          color="blue" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh All Images'}
        </Button>
        
        <Button 
          color="red" 
          onClick={clearLocalCache} 
          disabled={isRefreshing}
        >
          Clear Local Cache
        </Button>
        
        <Button 
          color="orange" 
          onClick={addTimestampToStorage} 
          disabled={isRefreshing}
        >
          Force Cache Break
        </Button>
      </div>
      
      {isRefreshing && (
        <div style={{ marginBottom: 20 }}>
          <Text size="sm" mb={5}>Progress: {progress}%</Text>
          <Progress value={progress} size="md" />
        </div>
      )}
      
      {(results.success > 0 || results.failed > 0) && (
        <div>
          <Text size="sm" fw={600} mb={5}>Results:</Text>
          <Text color="green">Successfully refreshed: {results.success}</Text>
          <Text color="red">Failed to refresh: {results.failed}</Text>
        </div>
      )}
    </Container>
  );
};

export default ForceRefreshImages; 