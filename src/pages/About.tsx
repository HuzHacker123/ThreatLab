import React from 'react';
import { Shield, Target, Users, BookOpen, Award, Globe } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: BookOpen,
      title: 'Education First',
      description: 'We believe cybersecurity education should be accessible, practical, and engaging for learners at all levels.'
    },
    {
      icon: Shield,
      title: 'Ethical Security',
      description: 'All our tools promote responsible disclosure and ethical hacking practices within legal boundaries.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by security professionals for the next generation of cybersecurity experts.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Democratizing cybersecurity education to create a more secure digital world for everyone.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Security Researcher',
      bio: 'PhD in Cybersecurity, former CISA analyst with 15+ years in threat intelligence.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Platform Architect',
      bio: 'Full-stack developer specializing in secure application development and DevSecOps.'
    },
    {
      name: 'Prof. James Wilson',
      role: 'Educational Director',
      bio: 'Computer Science professor with expertise in cybersecurity curriculum development.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-6">
            <Target className="h-12 w-12 text-cyber-cyan" />
          </div>
          <h1 className="text-5xl font-bold text-cyber-cyan mb-6 font-mono">
            About ThreatLab
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-4xl mx-auto leading-relaxed">
            ThreatLab is a comprehensive educational cybersecurity platform designed to bridge 
            the gap between theoretical knowledge and practical security skills. We provide 
            hands-on learning experiences in a safe, controlled environment.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-cyber-magenta mb-6 font-mono">
              Our Mission
            </h2>
            <p className="text-cyber-gray-300 leading-relaxed mb-6">
              To democratize cybersecurity education by providing accessible, practical, 
              and engaging learning tools that prepare students and professionals for 
              real-world security challenges.
            </p>
            <p className="text-cyber-gray-300 leading-relaxed">
              We believe that cybersecurity education should not be limited to expensive 
              courses or exclusive programs. ThreatLab makes advanced security concepts 
              accessible to anyone with curiosity and determination to learn.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-cyber-cyan mb-6 font-mono">
              Our Vision
            </h2>
            <p className="text-cyber-gray-300 leading-relaxed mb-6">
              A world where cybersecurity knowledge is widespread, where every developer 
              understands secure coding, and where security-conscious thinking is embedded 
              in digital literacy.
            </p>
            <p className="text-cyber-gray-300 leading-relaxed">
              Through ThreatLab, we aim to cultivate a generation of security-minded 
              professionals who can build and maintain the secure digital infrastructure 
              our world depends on.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-cyber-cyan mb-12 text-center font-mono">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6 hover:border-cyber-cyan hover:bg-cyber-navy/60 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-cyber-cyan/10 rounded-lg">
                    <value.icon className="h-6 w-6 text-cyber-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyber-gray-100">
                    {value.title}
                  </h3>
                </div>
                <p className="text-cyber-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-cyber-magenta mb-12 text-center font-mono">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-cyber-navy/40 border border-cyber-magenta/20 rounded-xl p-6 text-center hover:border-cyber-magenta hover:bg-cyber-navy/60 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-cyber-magenta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-cyber-magenta" />
                </div>
                <h3 className="text-xl font-semibold text-cyber-gray-100 mb-2">
                  {member.name}
                </h3>
                <p className="text-cyber-magenta font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-cyber-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-cyber-navy/30 rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-cyber-cyan mb-12 text-center font-mono">
            Impact by Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyber-cyan mb-2 font-mono">
                10,000+
              </div>
              <p className="text-cyber-gray-300">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyber-magenta mb-2 font-mono">
                500+
              </div>
              <p className="text-cyber-gray-300">Educational Institutions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyber-green mb-2 font-mono">
                50+
              </div>
              <p className="text-cyber-gray-300">Countries Reached</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyber-purple mb-2 font-mono">
                1M+
              </div>
              <p className="text-cyber-gray-300">Learning Sessions</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-cyber-cyan mb-6 font-mono">
            Get in Touch
          </h2>
          <p className="text-cyber-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions about ThreatLab? Want to contribute to our mission? 
            We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="Huzefakazi3131@gmail.com"
              className="px-6 py-3 bg-cyber-cyan text-cyber-dark font-medium rounded-lg hover:bg-cyber-cyan/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://github.com/HuzHacker123"
              className="px-6 py-3 border-2 border-cyber-magenta text-cyber-magenta font-medium rounded-lg hover:bg-cyber-magenta hover:text-cyber-dark transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-20 p-6 bg-cyber-navy/20 border border-cyber-cyan/20 rounded-xl">
          <h3 className="text-lg font-semibold text-cyber-cyan mb-4">
            Disclaimer & Educational Use
          </h3>
          <p className="text-cyber-gray-300 text-sm leading-relaxed">
            ThreatLab is designed exclusively for educational purposes and ethical security research. 
            All tools and simulations are provided in good faith to enhance cybersecurity awareness 
            and knowledge. Users are responsible for complying with all applicable laws and regulations. 
            Any misuse of these tools for illegal activities is strictly prohibited and not endorsed 
            by ThreatLab or its creators.
          </p>
        </div>
      </div>
    </div>
  );
};