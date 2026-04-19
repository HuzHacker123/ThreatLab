import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Key, 
  Wifi, 
  Bug, 
  Database, 
  Users, 
  ArrowRight,
  Zap,
  Eye,
  Globe
} from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: Lock,
      title: 'Password Security',
      description: 'Test password strength and learn about secure authentication practices.',
      link: '/tools/password-tester'
    },
    {
      icon: Key,
      title: 'Cryptography',
      description: 'Explore encryption algorithms including Caesar, Vigenère, and RSA.',
      link: '/tools/cipher-tool'
    },
    {
      icon: Eye,
      title: 'Phishing Detection',
      description: 'Learn to identify and create awareness about phishing attacks.',
      link: '/tools/phishing-simulator'
    },
    {
      icon: Wifi,
      title: 'Network Analysis',
      description: 'Discover network vulnerabilities and scanning techniques.',
      link: '/tools/network-scanner'
    },
    {
      icon: Bug,
      title: 'Malware Analysis',
      description: 'Analyze suspicious files using behavioral and signature detection.',
      link: '/tools/malware-scanner'
    },
    {
      icon: Database,
      title: 'SQL Injection',
      description: 'Interactive demonstration of SQL injection vulnerabilities.',
      link: '/tools/sql-injection-demo'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Students Trained' },
    { icon: Shield, value: '6', label: 'Security Tools' },
    { icon: Globe, value: '24/7', label: 'Available Access' },
    { icon: Zap, value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-navy to-cyber-blue"></div>
        <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 inline-block">
            <div className="p-4 bg-cyber-cyan/10 rounded-full border border-cyber-cyan/30 animate-pulse-slow">
              <Shield className="h-16 w-16 text-cyber-cyan animate-glow" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-mono">
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-magenta bg-clip-text text-transparent">
              ThreatLab
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cyber-gray-300 mb-8 leading-relaxed">
            Educational Cybersecurity Toolkit for the Next Generation
          </p>
          
          <p className="text-lg text-cyber-gray-400 mb-12 max-w-2xl mx-auto">
            Master cybersecurity fundamentals through hands-on experience with our 
            comprehensive suite of educational tools and simulations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="px-8 py-4 bg-cyber-cyan text-cyber-dark font-semibold rounded-lg hover:bg-cyber-cyan/90 hover:scale-105 transform transition-all duration-200 flex items-center justify-center space-x-2 animate-glow"
            >
              <span>Explore Tools</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-cyber-magenta text-cyber-magenta font-semibold rounded-lg hover:bg-cyber-magenta hover:text-cyber-dark hover:scale-105 transform transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-cyan rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-magenta rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-cyber-green rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyber-cyan mb-4 font-mono">
              Security Tools & Simulations
            </h2>
            <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
              Learn cybersecurity through practical, hands-on experience with our 
              comprehensive toolkit designed for education and awareness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-cyber-navy/50 border border-cyber-cyan/20 rounded-xl p-6 hover:border-cyber-cyan hover:bg-cyber-navy/70 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-cyber-cyan/10 rounded-lg mb-4 group-hover:bg-cyber-cyan/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-cyber-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-cyber-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-cyber-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center mt-4 text-cyber-cyan text-sm font-medium">
                  <span>Try it now</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-cyber-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-cyber-cyan/10 rounded-full mb-4 mx-auto">
                  <stat.icon className="h-8 w-8 text-cyber-cyan" />
                </div>
                <div className="text-3xl font-bold text-cyber-cyan mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-cyber-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-cyber-cyan mb-6 font-mono">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-cyber-gray-300 mb-8">
            Join thousands of students and professionals who have enhanced their 
            cybersecurity knowledge with ThreatLab.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-magenta text-cyber-dark font-semibold rounded-lg hover:scale-105 transform transition-all duration-200 space-x-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};