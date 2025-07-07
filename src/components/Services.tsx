'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Database, 
  Shield, 
  Zap,
  Globe,
  Cpu,
  Palette
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies like React, Next.js, and TypeScript.',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions using AWS, Azure, and Google Cloud.',
    gradient: 'from-green-500 to-teal-500',
    bgGradient: 'from-green-500/10 to-teal-500/10'
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimized database architectures and management systems for maximum performance.',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-500/10 to-purple-500/10'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed up your applications with advanced optimization techniques and monitoring.',
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/10 to-orange-500/10'
  },
  {
    icon: Globe,
    title: 'SEO & Marketing',
    description: 'Digital marketing strategies and SEO optimization to boost your online presence.',
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-500/10 to-rose-500/10'
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description: 'Implement intelligent solutions with artificial intelligence and machine learning.',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 to-blue-500/10'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/10 to-purple-500/10'
  }
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fast, clean GSAP animation: Title and cards fade+slide+scale in
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.38,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards: fast fade+slide+scale in
      gsap.fromTo('.service-card',
        {
          y: 32,
          opacity: 0,
          scale: 0.96,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.32,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Card hover animations
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card) => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('.service-title');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(title, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(title, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Advanced parallax effect for background elements
      gsap.to('.services-bg', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Floating background orbs animation
      gsap.to('.bg-orb-1', {
        x: 100,
        y: -50,
        rotation: 180,
        duration: 15,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
      
      gsap.to('.bg-orb-2', {
        x: -80,
        y: 60,
        rotation: -90,
        duration: 12,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: 2
      });
      
      gsap.to('.bg-orb-3', {
        x: 60,
        y: -80,
        rotation: 270,
        duration: 18,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: 4
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden flex flex-col items-center">
      {/* Animated background */}
      <div className="services-bg absolute inset-0 opacity-20">
        <div className="bg-orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="bg-orb-2 absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
        <div className="bg-orb-3 absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl"></div>
      </div>

      <div
        className="mx-auto px-4 w-full max-w-[375px] sm:max-w-[780px] lg:max-w-[1280px] 2xl:max-w-[1440px] flex flex-col items-center"
      >
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4"
        >
          <span className="text-white">Our </span>
          <span className="text-gradient">Services</span>
        </h2>
        <p className="text-center text-lg text-gray-300 mb-12">
          We offer comprehensive IT solutions designed to transform your business and drive digital innovation across all platforms.
        </p>
        <div
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center place-items-center w-full"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              <div className="relative z-10">
                <div className={`service-icon inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="service-title text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {service.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300"></div>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Discuss Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
