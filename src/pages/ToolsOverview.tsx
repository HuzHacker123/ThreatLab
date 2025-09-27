import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Key, 
  Eye, 
  Wifi, 
  Bug, 
  Database, 
  ArrowRight,
  Shield,
  AlertTriangle 
} from 'lucide-react';

export const ToolsOverview: React.FC = () => {
  const tools = [
    {
      icon: Lock,
      title: 'Password Strength Tester',
      description: 'Analyze password security, entropy, and common vulnerabilities. Get recommendations for creating stronger passwords.',
      features: ['Entropy calculation', 'Common password detection', 'Pattern analysis', 'Security recommendations'],
      difficulty: 'Beginner',
      estimatedTime: '5-10 minutes',
      link: '/tools/password-tester',
      color: 'cyber-green'
    },
    {
      icon: Key,
      title: 'Cipher Tool',
      description: 'Learn and experiment with classical and modern encryption algorithms including Caesar, Vigenère, and RSA.',
      features: ['Caesar cipher', 'Vigenère cipher', 'RSA encryption', 'Interactive examples'],
      difficulty: 'Intermediate',
      estimatedTime: '15-30 minutes',
      link: '/tools/cipher-tool',
      color: 'cyber-cyan'
    },
    {
      icon: Eye,
      title: 'Phishing Simulator',
      description: 'Educational phishing awareness through safe simulations. Learn to identify and prevent phishing attacks.',
      features: ['Template previews', 'Educational warnings', 'Attack analysis', 'Prevention tips'],
      difficulty: 'Beginner',
      estimatedTime: '10-20 minutes',
      link: '/tools/phishing-simulator',
      color: 'cyber-magenta'
    },
    {
      icon: Wifi,
      title: 'Network Scanner',
      description: 'Discover network topology and identify potential vulnerabilities in a controlled environment.',
      features: ['Port scanning', 'Service detection', 'Vulnerability assessment', 'Legal compliance'],
      difficulty: 'Advanced',
      estimatedTime: '20-45 minutes',
      link: '/tools/network-scanner',
      color: 'cyber-purple'
    },
    {
      icon: Bug,
      title: 'Malware Scanner',
      description: 'Upload and analyze files for potential threats using signature detection and behavioral analysis.',
      features: ['File upload (50MB)', 'Signature scanning', 'Behavioral analysis', 'Detailed reports'],
      difficulty: 'Intermediate',
      estimatedTime: '10-30 minutes',
      link: '/tools/malware-scanner',
      color: 'cyber-red'
    },
    {
      icon: Database,
      title: 'SQL Injection Demo',
      description: 'Interactive walkthrough of SQL injection vulnerabilities using a safe, isolated demonstration environment.',
      features: ['Guided tutorial', 'Live SQL queries', 'Vulnerability examples', 'Mitigation strategies'],
      difficulty: 'Intermediate',
      estimatedTime: '25-45 minutes',
      link: '/tools/sql-injection-demo',
      color: 'cyber-cyan'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-cyber-green';
      case 'Intermediate': return 'text-cyber-cyan';
      case 'Advanced': return 'text-cyber-red';
      default: return 'text-cyber-gray-300';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-6">
            <Shield className="h-12 w-12 text-cyber-cyan" />
          </div>
          <h1 className="text-5xl font-bold text-cyber-cyan mb-6 font-mono">
            Security Tools
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of educational cybersecurity tools. 
            Each tool is designed to provide hands-on learning experiences in a safe, 
            controlled environment.
          </p>
        </div>

        {/* Safety Notice */}
        <div className="bg-cyber-navy/50 border border-cyber-red/30 rounded-xl p-6 mb-12">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-cyber-red flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cyber-red mb-2">
                Educational Use Only
              </h3>
              <p className="text-cyber-gray-300 text-sm leading-relaxed">
                These tools are designed for educational purposes and ethical security research. 
                Users must comply with all applicable laws and regulations. Any misuse of these 
                tools is strictly prohibited and may result in legal consequences.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8 hover:border-cyber-cyan hover:bg-cyber-navy/60 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-3 bg-${tool.color}/10 rounded-lg group-hover:bg-${tool.color}/20 transition-colors`}>
                  <tool.icon className={`h-8 w-8 text-${tool.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-cyber-gray-100 mb-2">
                    {tool.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <span className={`font-medium ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                    <span className="text-cyber-gray-400">
                      {tool.estimatedTime}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-cyber-gray-300 mb-6 leading-relaxed">
                {tool.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-cyber-cyan mb-3">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full flex-shrink-0"></div>
                      <span className="text-cyber-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={tool.link}
                className={`inline-flex items-center px-6 py-3 bg-${tool.color}/20 border border-${tool.color} text-${tool.color} font-medium rounded-lg hover:bg-${tool.color} hover:text-cyber-dark transition-all duration-200 space-x-2 group-hover:scale-105 transform`}
              >
                <span>Launch Tool</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Getting Started */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-cyber-cyan mb-6 font-mono">
            New to Cybersecurity?
          </h2>
          <p className="text-cyber-gray-300 mb-8 max-w-2xl mx-auto">
            Start with the Password Strength Tester or Cipher Tool to build foundational knowledge, 
            then progress to more advanced tools like the Network Scanner and SQL Injection Demo.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border-2 border-cyber-magenta text-cyber-magenta font-medium rounded-lg hover:bg-cyber-magenta hover:text-cyber-dark transition-all duration-200 space-x-2"
          >
            <span>Learn More About ThreatLab</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};