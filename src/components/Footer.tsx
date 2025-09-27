import React from 'react';
import { Shield, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-navy/50 border-t border-cyber-cyan/20 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-cyber-cyan" />
              <span className="text-2xl font-bold text-cyber-cyan font-mono">ThreatLab</span>
            </div>
            <p className="text-cyber-gray-300 text-sm mb-4">
              Educational cybersecurity toolkit designed to enhance security awareness 
              and provide hands-on learning experiences for students and professionals.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@threatlab.edu"
                className="text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyber-cyan font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/tools" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Security Tools
                </a>
              </li>
              <li>
                <a href="/about" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-cyber-cyan font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-cyber-gray-300 hover:text-cyber-cyan transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyber-cyan/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyber-gray-400 text-sm">
              © 2025 ThreatLab. All rights reserved.
            </p>
            <p className="text-cyber-gray-400 text-xs mt-2 md:mt-0">
              For educational purposes only. Use responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};