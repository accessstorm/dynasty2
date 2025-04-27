import React, { useState, useEffect } from 'react';
import { Container, Text, Button, Group, Alert } from '@mantine/core';

const NecktieImageCheck: React.FC = () => {
  const [results, setResults] = useState<{[key: string]: boolean}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define the expected necktie file names
  const necktieNames = [
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
  ];

  // Define the directories we need to check
  const directories = [
    '/images/Aproducts/1Necktie/box/',
    '/images/Aproducts/1Necktie/frontback/',
    '/images/Aproducts/1Necktie/roll/'
  ];

  // Function to check if an image exists by trying to load it
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Check all the images on component mount
  useEffect(() => {
    const checkAllImages = async () => {
      try {
        setLoading(true);
        const newResults: {[key: string]: boolean} = {};
        
        // Add cache busting to prevent browser caching
        const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
        
        // Check each directory
        for (const dir of directories) {
          // Check each necktie image in this directory
          for (const name of necktieNames) {
            const url = `${window.location.origin}${dir}${name}${cacheBuster}`;
            const key = `${dir}${name}`;
            const exists = await checkImageExists(url);
            newResults[key] = exists;
            console.log(`Image ${url} exists: ${exists}`);
          }
        }
        
        setResults(newResults);
      } catch (err) {
        setError('Error checking images: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };
    
    checkAllImages();
  }, []);

  // Force refresh all images by triggering a new check
  const handleForceRefresh = () => {
    // Clear localStorage cache for image checks
    localStorage.removeItem('necktieImageChecks');
    
    // Force reload the page
    window.location.reload();
  };

  // Clear browser cache for image files
  const handleClearCache = () => {
    // Add a parameter to all image URLs to force a reload
    const timestamp = new Date().getTime();
    localStorage.setItem('cacheTimestamp', timestamp.toString());
    
    // Reload the page
    window.location.reload();
  };

  return (
    <Container size="lg" py={30}>
      <Text size="xl" fw={700} mb={20}>
        Necktie Image Check
      </Text>

      {error && (
        <Alert color="red" mb={20}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Text>Checking image availability...</Text>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Button color="blue" onClick={handleForceRefresh}>
              Force Refresh Check
            </Button>
            <Button color="red" onClick={handleClearCache}>
              Clear Browser Cache
            </Button>
          </div>

          <Text fw={600} mb={10}>Results:</Text>
          
          {directories.map(dir => (
            <div key={dir} style={{ marginBottom: 20 }}>
              <Text fw={600} mt={15} mb={5}>{dir}</Text>
              {necktieNames.map(name => {
                const key = `${dir}${name}`;
                const exists = results[key];
                return (
                  <Text key={key} color={exists ? 'green' : 'red'}>
                    {name}: {exists ? '✓ Available' : '✗ Missing'}
                  </Text>
                );
              })}
            </div>
          ))}
          
          <Text mt={20} fw={600}>Summary:</Text>
          <Text>
            {Object.values(results).filter(val => val).length} of {Object.values(results).length} images are available.
          </Text>
        </>
      )}
    </Container>
  );
};

export default NecktieImageCheck; 