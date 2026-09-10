"use client";

import { useEffect, useRef, useState } from "react";

interface Block {
  id: number;
  x: number;
  y: number;
  parents: Block[];
  isNew: boolean;
}

export default function BlockDAGVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let blocks: Block[] = [];
    let blockIdCounter = 0;

    // Tick-based Physics (Updates exactly once per second)
    const TICK_INTERVAL = 1000; // 1000ms = 1 second
    const SHIFT_AMOUNT = 80; // How many pixels the graph jumps left per tick
    const BLOCK_SIZE = 8;
    const VERTICAL_GAP = 18;

    const spawnTick = (startX: number) => {
      // To simulate 10 blocks a second with DAG depth, 
      // we spawn two columns per tick, averaging 5 blocks each.
      const columns = [startX - 40, startX];
      
      columns.forEach(xPos => {
        // 4 to 6 blocks per column = 8 to 12 blocks per second (Average 10)
        const numBlocks = Math.floor(Math.random() * 3) + 4; 
        
        const centerY = rect.height / 2;
        const startY = centerY - ((numBlocks - 1) * VERTICAL_GAP) / 2;

        const newColumn: Block[] = [];
        const previousBlocks = blocks.slice(-20); // Connect to recent history

        for (let i = 0; i < numBlocks; i++) {
          const block: Block = {
            id: blockIdCounter++,
            x: xPos,
            y: startY + i * VERTICAL_GAP,
            parents: [],
            isNew: true,
          };

          if (previousBlocks.length > 0) {
            const numParents = Math.min(Math.floor(Math.random() * 3) + 1, previousBlocks.length);
            const shuffled = [...previousBlocks].sort(() => 0.5 - Math.random());
            block.parents = shuffled.slice(0, numParents);
          }
          newColumn.push(block);
        }

        blocks.forEach(b => {
          if (b.x < rect.width - 150) b.isNew = false;
        });

        blocks.push(...newColumn);
      });
    };

    for (let x = 0; x <= rect.width; x += SHIFT_AMOUNT) {
      spawnTick(x);
    }
    blocks.forEach(b => b.isNew = false);

    let lastTick: number | null = null;

    const render = (timestamp: number) => {
      if (!lastTick) lastTick = timestamp;

      if (!isHovered) {
        if (timestamp - lastTick >= TICK_INTERVAL) {
          blocks.forEach(b => (b.x -= SHIFT_AMOUNT));
          spawnTick(rect.width);

          blocks = blocks.filter(b => b.x > -50);
          
          lastTick = timestamp;
        }
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw Edges
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      
      blocks.forEach(block => {
        block.parents.forEach(parent => {
          ctx.beginPath();
          ctx.moveTo(block.x + BLOCK_SIZE / 2, block.y + BLOCK_SIZE / 2);
          ctx.lineTo(parent.x + BLOCK_SIZE / 2, parent.y + BLOCK_SIZE / 2);
          ctx.stroke();
        });
      });

      blocks.forEach(block => {
        ctx.fillStyle = block.isNew ? "#70C7BA" : "#ffffff";
        ctx.beginPath();
        ctx.rect(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <figure className="not-prose my-10">
      <div 
        className="overflow-hidden rounded-xl border border-obsidian-800 bg-obsidian-900/40 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(!isHovered)}
      >
        <div className="flex items-center gap-2 border-b border-obsidian-800 bg-obsidian-950/80 px-4 py-3 text-sm font-bold text-white font-mono">
          <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full animate-pulse bg-kaspa"></span> 
          Kaspa's blockDAG structure, visual example (simulation)
        </div>
        
        <div className="relative w-full h-[220px] bg-obsidian-950/20">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full cursor-crosshair touch-none"
          />
          {isHovered && (
            <div className="absolute top-3 right-3 bg-obsidian-950/90 border border-kaspa text-kaspa text-[10px] font-mono px-2 py-1 rounded backdrop-blur">
              PAUSED
            </div>
          )}
        </div>
        
        <p className="border-t border-obsidian-800 px-4 py-3 text-xs text-neutral-400 leading-relaxed font-serif">
          Kaspa's blocks as they are mined, newest at the right. Blocks appear side by side because several are mined at once.
        </p>
      </div>
    </figure>
  );
}