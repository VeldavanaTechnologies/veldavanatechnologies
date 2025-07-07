'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Clock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, number: '500+', label: 'Happy Clients' },
  { icon: Award, number: '1000+', label: 'Projects Completed' },
  { icon: Clock, number: '5+', label: 'Years Experience' },
  { icon: Star, number: '98%', label: 'Client Satisfaction' }
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced parallax effect for the image with 3D transform
      gsap.to(imageRef.current, {
        yPercent: -30,
        rotationY: 5,
        transformPerspective: 1000,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Advanced content animation with staggered elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
      
      tl.fromTo('.about-title',
        { x: -80, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.about-divider',
        { width: 0, opacity: 0 },
        { width: '5rem', opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.about-paragraph',
        { y: 50, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out', stagger: 0.3 },
        '-=0.6'
      )
      .fromTo('.tech-tag',
        { scale: 0, opacity: 0, rotation: 180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 },
        '-=0.4'
      );

      // Enhanced stats animation with 3D cards
      gsap.fromTo('.stat-item',
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          rotationX: 45,
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'back.out(1.2)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animated counter numbers with morphing effect
      gsap.fromTo('.counter-number',
        { opacity: 0, y: 30, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating elements animation
      gsap.to('.floating-element-1', {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });
      
      gsap.to('.floating-element-2', {
        y: 25,
        x: -15,
        rotation: -180,
        duration: 6,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        delay: 2
      });

      // Interactive hover animations for stat items
      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach((item) => {
        const icon = item.querySelector('.stat-icon');
        const number = item.querySelector('.counter-number');
        
        item.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.3,
            rotation: 15,
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to(number, {
            scale: 1.1,
            color: '#a855f7',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to(number, {
            scale: 1,
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden flex flex-col items-center">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-element-1 absolute top-1/4 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="floating-element-2 absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-center w-full">
          {/* Image Section */}
          <div className="relative">
            <div ref={imageRef} className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="about-title text-4xl md:text-6xl font-bold mb-6">
                About <span className="text-gradient">VELDAVANA</span>
              </h2>
              <div className="about-divider w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p className="about-paragraph">
                At <span className="text-white font-semibold">VELDAVANA TECHNOLOGIES</span>, we are passionate about 
                transforming businesses through innovative technology solutions. Our team of expert developers, 
                designers, and strategists work collaboratively to deliver cutting-edge digital experiences.
              </p>
              
              <p className="about-paragraph">
                Founded with a vision to bridge the gap between complex technology and business success, 
                we specialize in creating <span className="text-gradient font-semibold">scalable</span>, 
                <span className="text-gradient font-semibold"> secure</span>, and 
                <span className="text-gradient font-semibold"> user-friendly</span> solutions that drive growth.
              </p>

              <p className="about-paragraph">
                Our commitment to excellence and client satisfaction has made us a trusted partner for 
                businesses ranging from startups to enterprise-level organizations across various industries.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((tech) => (
                <span
                  key={tech}
                  className="tech-tag px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center group"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 mb-4 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-300">
                <stat.icon className="stat-icon w-8 h-8 text-purple-400" />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="counter-number">
                  {stat.number}
                </span>
              </div>
              
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
