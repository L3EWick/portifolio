import React, { useState, useEffect } from 'react';
import { Database, Globe, Smartphone, Cloud, Code, Wrench } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Skill } from '../types';

export const SkillsSection: React.FC = () => {
  const sectionRef = useScrollReveal();
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 85, category: 'frontend', icon: '⚛️' },
    { name: 'TypeScript', level: 70, category: 'frontend', icon: '🔷' },
    { name: 'JavaScript', level: 70, category: 'frontend', icon: '🟨' },
    { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🎨' },
    { name: 'Tailwind', level: 80, category: 'frontend', icon: '🌊' },

    // Backend
    { name: 'Laravel', level: 90, category: 'backend', icon: '🔴' },
    { name: 'PHP', level: 85, category: 'backend', icon: '🐘' },
    { name: 'Python', level: 60, category: 'backend', icon: '🐍' },

    // Mobile
    { name: 'Flutter', level: 80, category: 'mobile', icon: '🔵' },
    { name: 'Dart', level: 85, category: 'mobile', icon: '🎯' },

    // Database
    { name: 'MySQL', level: 85, category: 'database', icon: '🐬' },
    { name: 'PostgreSQL', level: 80, category: 'database', icon: '🐘' },

    // Cloud
    { name: 'Google Cloud', level: 75, category: 'cloud', icon: '☁️' },
    { name: 'Firebase', level: 82, category: 'cloud', icon: '🔥' },

    // Tools
    { name: 'Git', level: 90, category: 'tools', icon: '🌿' },
    { name: 'Linux', level: 85, category: 'tools', icon: '🐧' },
    { name: 'VS Code', level: 95, category: 'tools', icon: '💙' },
    { name: 'Figma', level: 70, category: 'tools', icon: '🎨' },
  ];

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: Globe, color: 'cyan' },
    { id: 'backend', name: 'Backend', icon: Database, color: 'purple' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, color: 'blue' },
    { id: 'database', name: 'Database', icon: Database, color: 'green' },
    { id: 'cloud', name: 'Cloud', icon: Cloud, color: 'yellow' },
    { id: 'tools', name: 'Tools', icon: Wrench, color: 'pink' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('frontend');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, skill.name]));
              }, index * 100);
            });
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills = skills.filter(skill => skill.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'border-cyan-500/30 bg-cyan-500/20 text-cyan-400',
      purple: 'border-purple-500/30 bg-purple-500/20 text-purple-400',
      blue: 'border-blue-500/30 bg-blue-500/20 text-blue-400',
      green: 'border-green-500/30 bg-green-500/20 text-green-400',
      yellow: 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
      pink: 'border-pink-500/30 bg-pink-500/20 text-pink-400',
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 relative opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Skills <span className="text-cyan-400">Técnicas</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Domínio em tecnologias modernas e frameworks populares
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${selectedCategory === category.id
                    ? getColorClasses(category.color)
                    : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-500'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="group bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-purple-400/50 animate-pulse"></div>
                  </div>
                </div>

                {/* Skill Level Indicator */}
                <div className="mt-3 flex justify-between text-sm text-gray-400">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}

        </div>
      </div>
    </section>
  );
};