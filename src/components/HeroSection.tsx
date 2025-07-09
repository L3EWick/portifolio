import React, { useEffect, useRef } from 'react';
import TypeIt from 'typeit';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const renderedOnce = useRef(false);

  useEffect(() => {
    if (renderedOnce.current) return;
    renderedOnce.current = true;

    let nameInstance: any;
    let roleInstance: any;

    if (nameRef.current) {
      nameRef.current.innerHTML = '';
      nameInstance = new TypeIt(nameRef.current, {
        strings: 'Ismael Lima',
        speed: 100,
        waitUntilVisible: true,
      }).go();
    }

    if (roleRef.current) {
      roleRef.current.innerHTML = '';
      roleInstance = new TypeIt(roleRef.current, {
        strings: 'Desenvolvedor Fullstack',
        speed: 80,
        startDelay: 2000,
        waitUntilVisible: true,
      }).go();
    }

    return () => {
      nameInstance?.destroy();
      roleInstance?.destroy();
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Avatar */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1 animate-pulse">
              <img
                src="assets/ismaellima.jpeg"
                alt="Ismael Lima"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Name and Role */}
          <div className="space-y-6 mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-white">
              <span ref={nameRef} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"></span>
            </h1>

            <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
              <span ref={roleRef} className="border-r-2 border-cyan-400 pr-2 animate-pulse"></span>
            </h2>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <p className="text-gray-400 mb-6">Especializado em</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'React'].map((tech, index) => (
                <div
                  key={tech}
                  className="px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/10 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: 'https://github.com/L3EWick', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/ismaellima22/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:ismaeldsl89@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-black/30 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300 group"
              >
                <Icon size={24} />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToAbout}
            className="animate-bounce p-2 text-cyan-400 hover:text-white transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};