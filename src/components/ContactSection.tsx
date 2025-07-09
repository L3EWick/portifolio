import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Instagram, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ContactSection: React.FC = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_cdbxygp',
          template_id: 'template_ar6xc51',
          user_id: 'KRaTSKKgkkSb7daRd', 
          template_params: {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Falha ao enviar email:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ismaeldsl89@gmail.com',
      href: 'mailto:ismaeldsl89@gmail.com',
      color: 'cyan',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (21) 99122-8118',
      href: 'tel:+5521991228118',
      color: 'purple',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Rio de Janeiro, RJ',
      href: '#',
      color: 'blue',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/L3EWick',
      color: 'gray',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ismaellima22/',
      color: 'blue',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/ismael.lim4',
      color: 'pink',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 relative opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Vamos <span className="text-cyan-400">Conversar</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Estou sempre aberto a novas oportunidades e projetos interessantes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Informações de Contato</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center space-x-4 p-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                      >
                        <div className={`p-3 rounded-full bg-${info.color}-500/20`}>
                          <Icon className={`text-${info.color}-400`} size={24} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-110"
                      >
                        <Icon className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Disponibilidade</h3>
                <p className="text-gray-300 mb-4">
                  Estou disponível para projetos freelance e oportunidades de trabalho remoto.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Disponível para novos projetos</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h3>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="text-green-400">Mensagem enviada com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Assunto</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};