// interface
interface Position {
    x: number;
    y: number;
    z: number;
  }
  
  interface Star {
    name: string;
    type: string;
    radius: string;
    distance: string;
    luminosity: string;
    position: Position;
    screenPosition: { x: number; y: number };
  }

interface StarPopoverProps {
    star: Star;
    onClose: () => void;
}

import React, { useRef, useEffect, useState } from 'react';

export default function StarPopover({ star, onClose }: StarPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (popoverRef.current && star.screenPosition) {
      const { innerWidth, innerHeight } = window;
      const popoverWidth = popoverRef.current.offsetWidth;
      const popoverHeight = popoverRef.current.offsetHeight;

      let top = star.screenPosition.y + 10;
      let left = star.screenPosition.x + 10;

      if (left + popoverWidth > innerWidth) {
        left = star.screenPosition.x - popoverWidth - 10;
      }
      if (top + popoverHeight > innerHeight) {
        top = star.screenPosition.y - popoverHeight - 10;
      }

      setPopoverPosition({ top, left });
    }
  }, [star]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
        onClick={onClose}
      />
      <div
        ref={popoverRef}
        style={{
          position: 'fixed',
          top: popoverPosition.top,
          left: popoverPosition.left,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '15px',
          borderRadius: '8px',
          zIndex: 1000,
          maxWidth: '300px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h3>{star.name}</h3>
        <p><strong>Type:</strong> {star.type}-type</p>
        <p><strong>Radius:</strong> {star.radius} Sols</p>
        <p><strong>Luminosity:</strong> {star.luminosity} Sols</p>
        <p><strong>Distance:</strong> {star.distance} light-years</p>
        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#ff5e5e',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
