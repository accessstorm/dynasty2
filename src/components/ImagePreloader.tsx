import React, { useEffect, useState } from 'react';
import { Text, Progress } from '@mantine/core';

interface ImagePreloaderProps {
  onComplete?: () => void;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
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

    const directories = [
      '/images/Aproducts/1Necktie/box/',
      '/images/Aproducts/1Necktie/frontback/',
      '/images/Aproducts/1Necktie/roll/'
    ];

    // Create all the image URLs to preload
    const imagesToPreload: string[] = [];
    
    directories.forEach(dir => {
      necktieNames.forEach(name => {
        // Add cache busting to ensure fresh load
        const cacheBuster = `?v=${Math.random()}_${new Date().getTime()}`;
        imagesToPreload.push(`${window.location.origin}${dir}${name}${cacheBuster}`);
      });
    });

    let loadedCount = 0;
    const totalCount = imagesToPreload.length;

    console.log(`Preloading ${totalCount} necktie images...`);

    // Load each image and track progress
    imagesToPreload.forEach(src => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalCount) * 100);
        setProgress(currentProgress);
        console.log(`Preloaded ${loadedCount}/${totalCount} images (${currentProgress}%)`);
        
        if (loadedCount === totalCount) {
          console.log('All images preloaded successfully!');
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to preload image: ${src}`);
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalCount) * 100);
        setProgress(currentProgress);
        
        if (loadedCount === totalCount) {
          console.log('Image preloading complete with some errors');
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };
      
      img.src = src;
    });

    // Cleanup function not really needed for this, but good practice
    return () => {
      // Nothing to clean up
    };
  }, [onComplete]);

  if (isComplete) {
    return null; // Don't render anything when completed
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: 'white', padding: '10px' }}>
      <Text size="sm">Preloading necktie images: {progress}%</Text>
      <Progress value={progress} size="sm" />
    </div>
  );
};

export default ImagePreloader; 