import React, { useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { PhpRunnerGame } from './components/PhpRunnerGame';

function App() {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-gray-700/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ismael Lima. Todos os direitos reservados.
            </div>
            <div className="text-gray-400 text-sm">
              <a
                onClick={() => setShowGame(true)}
                className="cursor-pointer mt-4 inline-block text-blue-400 hover:text-blue-300 text-xs"
              >
                Aqui tem uma surpresinha 🐘
              </a>
            </div>
          </div>
        </div>
      </footer>
      {showGame && (
        <div className="fixed inset-0 z-50 bg-black">
          <PhpRunnerGame onClose={() => setShowGame(false)} />
        </div>
      )}

    </div>
  );
}

export default App;