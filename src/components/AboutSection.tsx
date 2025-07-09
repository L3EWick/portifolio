import React from 'react';
import { Calendar, MapPin, Code, Trophy } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TimelineItem } from '../types';

export const AboutSection: React.FC = () => {
  const sectionRef = useScrollReveal();

  const timelineData: TimelineItem[] = [
    {
      year: '2024',
      title: 'Fullstack Developer',
      company: 'GPS Rotas Seguras',
      description: 'Desenvolvimento fullstack com Flutter, Laravel e MySQL. Implementação de funcionalidades em tempo real e APIs de rastreamento.',
    },
    {
      year: '2024',
      title: 'Desenvolvedor Mobile',
      company: 'ultraCode',
      description: 'Criação de aplicativos móveis em Flutter. Foco em UX e performance em aplicações híbridas para Android e iOS.',
    },
    {
      year: '2023',
      title: 'Desenvolvedor Mobile',
      company: 'Prefeitura de Mesquita',
      description: 'Desenvolvimento de soluções móveis para serviços públicos, com foco em acessibilidade e usabilidade.',
    },
    {
      year: '2022',
      title: 'Desenvolvedor Web Fullstack',
      company: 'Prefeitura de Mesquita',
      description: 'Criação de sistemas internos com Laravel e PHP, integração com banco de dados MySQL e dashboards administrativos.',
    },
    {
      year: '2021',
      title: 'Estagiário de Desenvolvimento Web',
      company: 'Prefeitura de Mesquita',
      description: 'Primeiro contato profissional com desenvolvimento web usando Laravel. Apoio no desenvolvimento de portais e sistemas internos.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 relative opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Sobre <span className="text-cyan-400">Mim</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Desenvolvedor apaixonado por tecnologia, com mais de 3 anos de experiência criando soluções inovadoras
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Personal Info */}
            <div className="space-y-8">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">Informações Pessoais</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyan-500/20 rounded-full">
                      <MapPin className="text-cyan-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Localização</p>
                      <p className="text-white">Mesquita, Rio de Janeiro, Brasil</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <Code className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Especialização</p>
                      <p className="text-white">Fullstack Development</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Trophy className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Experiência</p>
                      <p className="text-white">4+ anos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">Minha Jornada</h3>
                <p className="text-gray-300 leading-relaxed">
                  Olá, sou Ismael Lima, um apaixonado por tecnologia desde a infância e atualmente com 23 anos. Como engenheiro de software, trago experiência e habilidades em Flutter, Dart, PHP, Laravel e MySQL. Trabalho com desenvolvimento fullstack em projetos de rastreamento em tempo real, soluções públicas e aplicativos móveis.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Também utilizo Python em projetos de reconhecimento e automação. Estou sempre em busca de aprimoramento profissional, focado em resolver problemas reais com tecnologia prática, eficiente e acessível.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white">Trajetória Profissional</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"></div>

                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-16 pb-8 group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 top-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900 group-hover:bg-purple-500 transition-colors duration-300"></div>

                    {/* Timeline Content */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <span className="text-cyan-400 font-medium">{item.year}</span>
                      </div>
                      <p className="text-purple-400 font-medium mb-2">{item.company}</p>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};