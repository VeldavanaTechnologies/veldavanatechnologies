'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Code, Zap, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';

const StarfieldBackground = dynamic(() => import('./starfield-bg'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  id: string;
  left: string;
  top: string;
  delay: string;
  duration: string;
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, index) => ({
      id: `particle-${index}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(titleRef.current, 
        { y: 120, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
        '-=1.0'
      )
      .fromTo(ctaRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.floating-icon',
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 0.6, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.2 },
        '-=0.5'
      );

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -25,
        rotation: 360,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

      // Gradient background animation
      gsap.to('.gradient-orb', {
        scale: 1.2,
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 3
      });

      // Particle movement animation
      gsap.to('.particle', {
        y: -100,
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
        repeat: -1,
        delay: (i) => i * 0.5,
        stagger: {
          amount: 2,
          from: 'random'
        }
      });

      // SCROLL OUTRO: VELDAVANA right, TECHNOLOGIES left, fade out
      gsap.to('.veldavana-fade', {
        x: 120,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to('.technologies-fade', {
        x: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      // Professional outro for rest of hero content
      // Fade out hero-outro (subtitle and button) on scroll, but reappear when scrolling up (like VELDAVANA/TECHNOLOGIES)
      // Remove scroll-based fade/blur for hero-outro so it never vanishes
      // (If you want a different effect, let me know!)

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <StarfieldBackground />
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="parallax-bg absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20z"/%3E%3C/g%3E%3C/svg%3E')`
        }}></div>
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code className="floating-icon absolute top-1/4 left-1/4 w-8 h-8 text-purple-400 opacity-60" />
        <Zap className="floating-icon absolute top-1/3 right-1/4 w-6 h-6 text-blue-400 opacity-60" />
        <Globe className="floating-icon absolute bottom-1/3 left-1/3 w-7 h-7 text-pink-400 opacity-60" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center justify-center">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-center">
          <span className="text-gradient veldavana-fade">VELDAVANA</span>
          <br />
          <span className="text-white technologies-fade">TECHNOLOGIES</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed hero-outro">
          Transforming ideas into powerful digital solutions. We create cutting-edge 
          <span className="text-gradient font-semibold"> web applications</span>, 
          <span className="text-gradient font-semibold"> mobile apps</span>, and 
          <span className="text-gradient font-semibold"> cloud solutions</span> that drive your business forward.
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-outro">
          <button
            className="group relative px-16 py-6 bg-purple-700 rounded-lg text-white font-bold text-2xl shadow-xl overflow-hidden transition-all duration-300 hover:bg-purple-800 hover:scale-105 hover:shadow-2xl focus:outline-none border-2 border-purple-800"
            style={{ minWidth: 220 }}
          >
            <span className="relative z-10 transition-all duration-500 group-hover:tracking-widest group-hover:text-purple-200">Get Started</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-purple-900/40 blur-sm rounded-lg"></span>
            <span className="absolute left-0 top-0 w-full h-full pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 220 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <rect x="0" y="0" width="220" height="72" rx="12" fill="#7c3aed" opacity="0" className="group-hover:opacity-20 transition-all duration-500"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Blog Cards Section - directly below Get Started button, always visible */}
        <div className="w-full flex flex-col items-center pt-20 pb-4">
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 justify-center items-center">
            {[1,2,3].map((i) => (
              <a
                key={i}
                href={`#blog${i}`}
                className="group block bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-800 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer w-full md:w-1/3"
                style={{ minHeight: 180, maxWidth: 340 }}
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Blog Title {i}</h3>
                    <p className="text-gray-300 text-base mb-4">This is a short description for blog post {i}. Make your blog catchy and engaging!</p>
                  </div>
                  <span className="text-purple-400 font-semibold mt-auto">Read More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>

      {/* Client-side generated particle effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </section>
  );
}
