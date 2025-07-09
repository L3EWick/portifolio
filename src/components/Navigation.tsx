import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'projects', label: 'Projetos', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contato', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-black/20 backdrop-blur-lg rounded-full p-4 border border-cyan-500/30">
          <div className="flex flex-col space-y-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative p-3 rounded-full transition-all duration-300 group ${
                  activeSection === id
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                <Icon size={20} />
                <span className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="relative bg-black/20 backdrop-blur-lg border-b border-cyan-500/30 pt-4">
          <div className="flex justify-between items-center px-4 pb-4">
            <div className="text-xl font-bold text-white">
              <span className="text-cyan-400">Ismael Lima</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-cyan-500/30">
              <div className="flex flex-col">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center space-x-3 p-4 transition-all duration-300 ${
                      activeSection === id
                        ? 'bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-500'
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};