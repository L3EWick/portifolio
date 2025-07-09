import React, { useState } from 'react';
import { ExternalLink, Github, Smartphone, Globe, Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const sectionRef = useScrollReveal();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'rasterapp',
      title: 'RasterApp',
      description: 'Sistema de rastreamento avançado com alertas em tempo real e visualização de frota.',
      technologies: ['React', 'Laravel', 'PHP', 'WebSocket', 'MySQL'],
      role: 'Desenvolvedor Fullstack (Frontend React + Backend Laravel)',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://app.rasterapp.com.br/',
    },
    {
      id: 'taporperto',
      title: 'TáPorPerto',
      description: 'API e dashboard para análise de risco urbano com base em localização.',
      technologies: ['Next.js', 'Laravel', 'PHP', 'MySQL'],
      role: 'Desenvolvedor Fullstack (Next.js + Laravel)',
      image: '/assets/img/taporperto.png',
      link: 'https://taporperto.com.br/dashboard',
    },
    {
      id: 'dapraquantoscomer',
      title: 'Dá pra quantos comer?',
      description: 'Calculadora de alimentos e bebidas para eventos como churrasco e festas.',
      technologies: ['Next.js'],
      role: 'Desenvolvedor Fullstack (Next.js)',
      image: '/assets/img/dapraquantoscomer.png',
      link: 'https://dapraquantoscomer.web.app/',
    },
    {
      id: 'minhacampanha',
      title: 'Minha Campanha',
      description: 'Sistema de apoio para campanhas políticas com formulários e gerenciamento.',
      technologies: ['Laravel', 'Blade', 'PHP', 'MySQL'],
      role: 'Desenvolvedor Fullstack (Laravel + Blade)',
      image: '/assets/img/minhacampanha.png',
      link: 'https://minhacampanha.ultracode.com.br/',
    },
    {
      id: 'gerenciamandato',
      title: 'Gerência de Mandato',
      description: 'Sistema de gabinete digital para vereadores com solicitações e relatórios.',
      technologies: ['Laravel', 'Blade', 'PHP', 'MySQL'],
      role: 'Desenvolvedor Fullstack (Laravel + Blade)',
      image: '/assets/img/ultracode.png',
      link: 'https://ultracode.com.br/',
    },
    {
      id: 'campanhadeputado',
      title: 'Campanha Deputado',
      description: 'Sistema de gerenciamento de campanha política para deputados com foco em engajamento e controle de equipe.',
      technologies: ['Laravel', 'Blade', 'PHP', 'MySQL'],
      role: 'Desenvolvedor Fullstack (Laravel + Blade)',
      image: '/assets/img/ultracode.png',
      link: 'https://ultracode.com.br/',
    },
    {
      id: 'genesisai',
      title: 'Genesis.AI',
      description: 'Assistente inteligente com hotword offline, reconhecimento de voz e IA integrada.',
      technologies: ['Flutter', 'Laravel', 'PHP', 'Inteligência Artificial'],
      role: 'Desenvolvedor Fullstack (Flutter + Laravel)',
      image: 'https://portal.ciee.org.br/wp-content/uploads/2024/01/O-que-esperar-da-IA-em-2024.jpg',
    },
    {
      id: 'rotasseguras',
      title: 'Rotas Seguras',
      description: 'Solução completa de rastreamento veicular com áreas de risco e alertas em tempo real.',
      technologies: ['Laravel', 'PHP', 'MySQL'],
      role: 'Desenvolvedor Backend (Laravel)',
      image: '/assets/img/rotasseguras.png',
      link: 'https://www.rotasseguras.com.br/',
    },
    {
      id: 'outros',
      title: 'E outros mais...',
      description: 'Participei de diversos outros projetos com foco em soluções práticas, escaláveis e modernas.',
      technologies: ['Flutter', 'Laravel', 'React', 'Next.js', 'MySQL'],
      role: 'Desenvolvedor Fullstack',
      image: '/assets/ismaellima.jpeg',
    },
  ];

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'rasterapp':
        return <Smartphone className="text-cyan-400" size={24} />;
      case 'edith':
        return <Zap className="text-purple-400" size={24} />;
      case 'taporperto':
        return <Globe className="text-blue-400" size={24} />;
      default:
        return <Globe className="text-cyan-400" size={24} />;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 relative opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Projetos em <span className="text-cyan-400">Destaque</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Seleção dos meus trabalhos mais relevantes e inovadores
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Project Icon */}
                  <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full">
                    {getProjectIcon(project.id)}
                  </div>

                  {/* Hover Overlay */}
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="flex space-x-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500/30 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                  <div className="mb-4">
                    <span className="text-purple-400 text-sm font-medium">{project.role}</span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};