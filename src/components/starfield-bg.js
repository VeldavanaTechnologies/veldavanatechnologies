// Starfield background animation for Next.js Hero section
// Uses canvas for performant, interactive starfield

import { useEffect, useRef } from 'react';


export default function StarfieldBackground() {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  // Removed shapes: only stars remain for pure starfield
  const mouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationRef = useRef();


  // Star config
  // Reduce star count for smoother performance
  const STAR_COUNT = 130;
  const STAR_COLOR = '#fff';
  const STAR_SIZE = 2.0;

  // Generate stars
  function createStars(width, height) {
    const arr = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.2 + Math.random() * 0.8, // z is now a parallax factor (0.2-1.0)
        baseX: 0,
        baseY: 0,
      });
    }
    return arr;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    stars.current = createStars(width, height);
    for (let i = 0; i < stars.current.length; i++) {
      stars.current[i].baseX = stars.current[i].x;
      stars.current[i].baseY = stars.current[i].y;
    }

    let animationRunning = true;
    let lastFrame = performance.now();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars.current = createStars(width, height);
      for (let i = 0; i < stars.current.length; i++) {
        stars.current[i].baseX = stars.current[i].x;
        stars.current[i].baseY = stars.current[i].y;
      }
    }
    window.addEventListener('resize', resize);

    function onMouseMove(e) {
      mouse.current.x = (e.clientX / width) * 2 - 1;
      mouse.current.y = (e.clientY / height) * 2 - 1;
    }
    window.addEventListener('mousemove', onMouseMove);

    function onScroll() {
      velocity.current.y = window.scrollY * 0.008;
    }
    window.addEventListener('scroll', onScroll);

    function animate(now) {
      if (!animationRunning) return;
      // Cap FPS to 60
      if (now - lastFrame < 1000 / 60) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      // Use a forEach for better perf and clarity
      stars.current.forEach(star => {
        let parallaxX = star.baseX + mouse.current.x * 60 * star.z + velocity.current.y * 30 * star.z;
        let parallaxY = star.baseY + mouse.current.y * 40 * star.z + velocity.current.y * 80 * star.z;
        if (parallaxX < 0) parallaxX = width + parallaxX;
        if (parallaxX > width) parallaxX = parallaxX - width;
        if (parallaxY < 0) parallaxY = height + parallaxY;
        if (parallaxY > height) parallaxY = parallaxY - height;
        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, STAR_SIZE * (0.7 + star.z * 0.7), 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.globalAlpha = 0.7 + 0.3 * star.z;
        ctx.shadowBlur = 6 * star.z;
        ctx.shadowColor = '#fff';
        ctx.fill();
        ctx.closePath();
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      animationRunning = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={typeof window !== 'undefined' ? window.innerWidth : 1920}
      height={typeof window !== 'undefined' ? window.innerHeight : 1080}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent',
        display: 'block',
      }}
    />
  );
}
