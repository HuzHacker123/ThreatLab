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
  const colorStyles = {
    'cyber-green': {
      iconWrap: 'bg-cyber-green/10 group-hover:bg-cyber-green/20',
      icon: 'text-cyber-green',
      button: 'bg-cyber-green/20 border-cyber-green text-cyber-green hover:bg-cyber-green',
      dot: 'bg-cyber-green',
    },
    'cyber-cyan': {
      iconWrap: 'bg-cyber-cyan/10 group-hover:bg-cyber-cyan/20',
      icon: 'text-cyber-cyan',
      button: 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan',
      dot: 'bg-cyber-cyan',
    },
    'cyber-magenta': {
      iconWrap: 'bg-cyber-magenta/10 group-hover:bg-cyber-magenta/20',
      icon: 'text-cyber-magenta',
      button: 'bg-cyber-magenta/20 border-cyber-magenta text-cyber-magenta hover:bg-cyber-magenta',
      dot: 'bg-cyber-magenta',
    },
    'cyber-purple': {
      iconWrap: 'bg-cyber-purple/10 group-hover:bg-cyber-purple/20',
      icon: 'text-cyber-purple',
      button: 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple hover:bg-cyber-purple',
      dot: 'bg-cyber-purple',
    },
    'cyber-red': {
      iconWrap: 'bg-cyber-red/10 group-hover:bg-cyber-red/20',
      icon: 'text-cyber-red',
      button: 'bg-cyber-red/20 border-cyber-red text-cyber-red hover:bg-cyber-red',
      dot: 'bg-cyber-red',
    },
  } as const;

  const tools = [
    {
      icon: Lock,
      title: 'Password Strength Tester',
      description: 'Analyze password security, entropy, and common vulnerabilities. Get recommendations for creating stronger passwords.',
      features: ['Entropy calculation', 'Common password detection', 'Pattern analysis', 'Security recommendations'],
      difficulty: 'Beginner',
      //estimatedTime: '5-10 minutes',
      link: '/tools/password-tester',
      color: 'cyber-green'
    },
    {
      icon: Key,
      title: 'Cipher Tool',
      description: 'Learn and experiment with classical and modern encryption algorithms including Caesar, Vigenère, and RSA.',
      features: ['Caesar cipher', 'Vigenère cipher', 'RSA encryption', 'Interactive examples'],
      difficulty: 'Intermediate',
      //estimatedTime: '15-30 minutes',
      link: '/tools/cipher-tool',
      color: 'cyber-cyan'
  },
    {
      icon: Eye,
      title: 'Phishing Simulator',
      description: 'Educational phishing awareness through safe simulations. Learn to identify and prevent phishing attacks.',
      features: ['Template previews', 'Educational warnings', 'Attack analysis', 'Prevention tips'],
      difficulty: 'Beginner',
      //estimatedTime: '10-20 minutes',
      link: '/tools/phishing-simulator',
      color: 'cyber-magenta'
    },
    {
      icon: Wifi,
      title: 'Network Scanner',
      description: 'Discover network topology and identify potential vulnerabilities in a controlled environment.',
      features: ['Port scanning', 'Service detection', 'Vulnerability assessment', 'Legal compliance'],
      difficulty: 'Advanced',
      //estimatedTime: '20-45 minutes',
      link: '/tools/network-scanner',
      color: 'cyber-purple'
    },
    {
      icon: Bug,
      title: 'Malware Scanner',
      description: 'Upload and analyze files for potential threats using signature detection and behavioral analysis.',
      features: ['File upload (50MB)', 'Signature scanning', 'Behavioral analysis', 'Detailed reports'],
      difficulty: 'Intermediate',
      //estimatedTime: '10-30 minutes',
      link: '/tools/malware-scanner',
      color: 'cyber-red'
    },
    {
      icon: Database,
      title: 'SQL Injection Demo',
      description: 'Interactive walkthrough of SQL injection vulnerabilities using a safe, isolated demonstration environment.',
      features: ['Guided tutorial', 'Live SQL queries', 'Vulnerability examples', 'Mitigation strategies'],
      difficulty: 'Intermediate',
      //estimatedTime: '25-45 minutes',
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
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-6 cyber-panel-3d">
            <Shield className="h-12 w-12 text-cyber-cyan" />
          </div>
          <h1 className="text-5xl font-bold text-cyber-cyan mb-6 font-mono cyber-gradient-text">
            Security Tools
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of educational cybersecurity tools. 
            Each tool is designed to provide hands-on learning experiences in a safe, 
            controlled environment.
          </p>
        </div>

        {/* Safety Notice */}
        <div className="cyber-panel border-cyber-red/30 p-6 mb-12">
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
            <article
              key={index}
              className="cyber-panel cyber-panel-3d p-8 group"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div
                  className={`p-3 rounded-lg transition-colors ${colorStyles[tool.color as keyof typeof colorStyles].iconWrap}`}
                >
                  <tool.icon className={`h-8 w-8 ${colorStyles[tool.color as keyof typeof colorStyles].icon}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-cyber-gray-100 mb-2">
                    {tool.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <span className={`font-medium ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                    {/* <span className="text-cyber-gray-400">
                      {tool.estimatedTime}
                    </span> */}
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
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colorStyles[tool.color as keyof typeof colorStyles].dot}`}></div>
                      <span className="text-cyber-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={tool.link}
                className={`cyber-button inline-flex items-center px-6 py-3 border font-medium rounded-lg transition-all duration-300 space-x-2 group-hover:scale-105 group-hover:-translate-y-0.5 ${colorStyles[tool.color as keyof typeof colorStyles].button} hover:text-cyber-dark`}
              >
                <span>Launch Tool</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
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
            className="inline-flex items-center px-6 py-3 border-2 border-cyber-magenta text-cyber-magenta font-medium rounded-lg hover:bg-cyber-magenta hover:text-cyber-dark transition-all duration-300 hover:-translate-y-1 space-x-2"
          >
            <span>Learn More About ThreatLab</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};