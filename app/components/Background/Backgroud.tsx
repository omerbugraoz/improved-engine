'use client'

import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";

interface Circle {
  id: number;
  color: string;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const COLORS= [
  "#5DADE2",
  "#48C9B0",
  "#F7DC6F",
  "#E59866",
  "#BB8FCE",
  "#52BE80",
  "#F1948A",
  "#7FB3D5",
  "#D2B4DE",
  "#AED6F1",
  "#76D7C4",
  "#F4D03F",
  "#EB984E",
  "#AF7AC5",
  "#7DCEA0",
  "#F5B7B1",
  "#85C1E9",
  "#D7BDE2",
  "#A3E4D7",
  "#F9E79F",
  "#F0B27A",
  "#C39BD3",
  "#82E0AA",
  "#F8C471",
  "#73C6B6"
];

const Background = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  // Generate random number between min and max
  const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };


  useEffect(() => {
    // Create a grid-like distribution
    const numColumns = 3;
    const numRows = 4;
    const columnWidth = window.innerWidth / numColumns;
    const rowHeight = window.innerHeight / numRows;

    const newCircles = Array.from({ length: 25 }, (_, i) => {
      // Calculate grid position
      const column = i % numColumns;
      const row = Math.floor(i / numColumns);

      // Add some randomness within the grid cell
      const baseX = column * columnWidth;
      const baseY = row * rowHeight;
      
      return {
        id: i,
        color: COLORS[i],
        x: baseX + random(100, columnWidth - 100),
        y: baseY + random(100, rowHeight - 100),
        size: random(300, 500), // Slightly smaller for better distinction
        duration: random(30, 40) // Faster movement for more dynamic effect
      };
    });

    setCircles(newCircles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-[-1] bg-gradient-to-br from-gray-50 to-slate-100">
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          animate={{
            x: [
              circle.x,
              random(-200, window.innerWidth + 200),
              random(-200, window.innerWidth + 200),
              circle.x
            ],
            y: [
              circle.y,
              random(-200, window.innerHeight + 200),
              random(-200, window.innerHeight + 200),
              circle.y
            ]
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1]
          }}
          style={{
            position: "absolute",
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            backgroundColor: circle.color,
            filter: "blur(80px)",  // Increased blur for softer edges
            opacity: 0.5,  // Lower opacity for better blending
            mixBlendMode: "multiply"
          }}
        />
      ))}
    </div>
  );
};

export default Background;