'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    const move = (e: MouseEvent) => {
      cursor.setAttribute('style', `left:${e.clientX}px; top:${e.clientY}px`);
    };
    window.addEventListener('mousemove', move);
    const addHoverEvents = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
    };
    addHoverEvents();
    return () => {
      window.removeEventListener('mousemove', move);
      cursor.remove();
    };
  }, []);
  return null;
}
