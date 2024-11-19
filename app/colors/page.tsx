'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/header';
export default function ColorsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>('#FF0000');
  const pixelsRef = useRef<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createPixel() {
      pixelsRef.current.push({
        x: Math.random() * canvas.width,
        y: 0,
        color: color,
      });
    }

    function animate() {
      if (!context) return;
      context.fillStyle = '#333333';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Use filter instead of forEach with splice to avoid array modification during iteration
      pixelsRef.current = pixelsRef.current.filter((pixel) => {
        context.fillStyle = pixel.color;
        context.fillRect(pixel.x, pixel.y, 5, 5);
        pixel.y += 1; // Speed of falling
        return pixel.y <= canvas.height;
      });

      // Only continue animation if there are pixels to animate
      if (pixelsRef.current.length > 0) {
        requestAnimationFrame(animate);
      }
    }

    const interval = setInterval(createPixel, 100);
    animate();

    return () => clearInterval(interval);
  }, [color]);

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Header />
        <div>
          <button onClick={() => setColor('#FF0000')} className="bg-red-500 text-white p-2 m-2">Red</button>
          <button onClick={() => setColor('#00FF00')} className="bg-green-500 text-white p-2 m-2">Green</button>
          <button onClick={() => setColor('#0000FF')} className="bg-blue-500 text-white p-2 m-2">Blue</button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}