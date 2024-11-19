import React from 'react';

interface Message {
  text: string;
  username: string;
}

interface MessageMosaicProps {
  messages: Message[];
}

export default function MessageMosaic({ messages }: MessageMosaicProps) {
  return (
    <div className="relative min-h-[600px]">
      {[...messages].map((message, index) => {
        // Calculate grid-based positions
        const cardsPerRow = 3;
        const cardWidth = 300; // Width in pixels
        const cardHeight = 200; // Approximate height with padding
        const horizontalGap = 40; // Gap between cards
        const verticalGap = 40;

        const row = Math.floor(index / cardsPerRow);
        const col = index % cardsPerRow;

        // Calculate absolute positions
        const left = col * (cardWidth + horizontalGap);
        const top = row * (cardHeight + verticalGap);
        
        // Generate slight random rotation for visual interest
        const rotate = Math.floor(Math.random() * 45 - 22); // -3 to +3 degrees
        
        return (
          <div 
            key={index}
            className="absolute p-4 border rounded-lg shadow-md bg-white/90 w-[300px]"
            style={{
              top: `${top}px`,
              left: `${left}px`,
              transform: `rotate(${rotate}deg)`,
              transition: 'transform 0.3s ease',
            }}
          >
            <p className="break-words mb-2">{message.text}</p>
            <a 
              href={`https://x.com/${message.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              @{message.username}
            </a>
          </div>
        );
      })}
    </div>
  );
}