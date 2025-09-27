import React, { useState } from 'react';
import { Eye, AlertTriangle, ExternalLink, Shield, Info, CheckCircle } from 'lucide-react';

export const PhishingSimulator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [acknowledged, setAcknowledged] = useState(false);

  const templates = [
    {
      id: 'gmail',
      name: 'Gmail Clone',
      description: 'Simulated Gmail login page to demonstrate email phishing',
      difficulty: 'Common',
      color: 'cyber-red',
      indicators: ['Suspicious URL', 'Missing HTTPS indicator', 'Generic branding']
    },
    {
      id: 'amazon',
      name: 'Amazon Clone',
      description: 'Fake Amazon page requesting account verification',
      difficulty: 'Sophisticated',
      color: 'cyber-yellow',
      indicators: ['Urgency tactics', 'Account suspension threat', 'Typos in domain']
    },
    {
      id: 'instagram',
      name: 'Instagram Clone',
      description: 'Social media phishing targeting personal accounts',
      difficulty: 'Moderate',
      color: 'cyber-magenta',
      indicators: ['Fake verification badge', 'Lookalike domain', 'Poor image quality']
    }
  ];

  const phishingIndicators = [
    'Urgent language and threats',
    'Requests for sensitive information',
    'Suspicious sender addresses',
    'Generic greetings ("Dear Customer")',
    'Spelling and grammar mistakes',
    'Mismatched or suspicious URLs',
    'Unexpected attachments',
    'Too good to be true offers'
  ];

  const preventionTips = [
    'Always verify sender identity',
    'Check URLs carefully before clicking',
    'Use two-factor authentication',
    'Keep software updated',
    'Be suspicious of urgent requests',
    'Verify requests through official channels',
    'Use email filtering and security tools',
    'Educate yourself about new phishing tactics'
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowPreview(false);
    setUserInput({ email: '', password: '' });
  };

  const handlePreview = () => {
    if (!acknowledged) {
      alert('Please acknowledge the educational purpose statement first.');
      return;
    }
    setShowPreview(true);
  };

  const handleInputCapture = (field: string, value: string) => {
    setUserInput(prev => ({ ...prev, [field]: value }));
  };

  const renderTemplate = (template: any) => {
    const baseStyles = "w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden";
    
    switch (template.id) {
      case 'gmail':
        return (
          <div className={baseStyles}>
            <div className="bg-red-600 text-white p-4">
              <h2 className="text-xl font-bold">Gmail</h2>
              <p className="text-sm opacity-90">Sign in to your account</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-700 text-sm">
                  ⚠️ Your account will be suspended in 24 hours. Verify now!
                </p>
              </div>
              <input
                type="email"
                placeholder="Email or phone"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.email}
                onChange={(e) => handleInputCapture('email', e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.password}
                onChange={(e) => handleInputCapture('password', e.target.value)}
              />
              <button className="w-full bg-blue-600 text-white p-3 rounded font-medium">
                Next
              </button>
            </div>
          </div>
        );
      
      case 'amazon':
        return (
          <div className={baseStyles}>
            <div className="bg-orange-500 text-white p-4">
              <h2 className="text-xl font-bold">amazon</h2>
              <p className="text-sm">Account Verification Required</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-yellow-700 text-sm">
                  🚨 Suspicious activity detected. Verify immediately to prevent account closure.
                </p>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.email}
                onChange={(e) => handleInputCapture('email', e.target.value)}
              />
              <input
                type="password"
                placeholder="Amazon password"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.password}
                onChange={(e) => handleInputCapture('password', e.target.value)}
              />
              <button className="w-full bg-orange-400 text-white p-3 rounded font-medium">
                Verify Account
              </button>
            </div>
          </div>
        );
      
      case 'instagram':
        return (
          <div className={baseStyles}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
              <h2 className="text-xl font-bold">Instagram ✓</h2>
              <p className="text-sm opacity-90">Get verified now!</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded p-3">
                <p className="text-purple-700 text-sm">
                  🎉 You've been selected for Instagram verification! Claim your blue checkmark.
                </p>
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.email}
                onChange={(e) => handleInputCapture('email', e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded text-blue-600"
                value={userInput.password}
                onChange={(e) => handleInputCapture('password', e.target.value)}
              />
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded font-medium">
                Get Verified
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-magenta/10 rounded-full mb-6">
            <Eye className="h-12 w-12 text-cyber-magenta" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-magenta mb-4 font-mono">
            Phishing Simulator
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Learn to identify phishing attacks through safe, educational simulations. 
            Understand common tactics and protect yourself from real threats.
          </p>
        </div>

        {/* Educational Warning */}
        <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-cyber-red flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-cyber-red mb-3">
                Educational Purpose Only
              </h3>
              <p className="text-cyber-gray-200 mb-4 leading-relaxed">
                This phishing simulator is designed exclusively for cybersecurity education and awareness. 
                The templates shown are fake and safe - no real accounts or systems are compromised. 
                Any data entered is captured only for demonstration purposes and is not stored or transmitted.
              </p>
              <div className="flex items-start space-x-3">
                <input
                  id="acknowledge"
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1 h-4 w-4 bg-cyber-dark border border-cyber-red/50 rounded focus:ring-2 focus:ring-cyber-red"
                />
                <label htmlFor="acknowledge" className="text-sm text-cyber-gray-200">
                  I understand this is for educational purposes only and will not use these techniques maliciously
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="bg-cyber-navy/40 border border-cyber-magenta/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-magenta mb-6">
              Select Phishing Template
            </h2>
            
            <div className="space-y-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedTemplate === template.id
                      ? `border-${template.color} bg-${template.color}/10`
                      : `border-${template.color}/30 hover:border-${template.color} hover:bg-${template.color}/5`
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 bg-${template.color} rounded-full`} />
                    <span className={`font-semibold text-${template.color}`}>
                      {template.name}
                    </span>
                    <span className={`text-xs px-2 py-1 bg-${template.color}/20 text-${template.color} rounded`}>
                      {template.difficulty}
                    </span>
                  </div>
                  <p className="text-cyber-gray-300 text-sm mb-3">
                    {template.description}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-cyber-gray-400">Red Flags:</p>
                    {template.indicators.map((indicator, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-cyber-gray-400">
                        <div className="w-1 h-1 bg-cyber-red rounded-full" />
                        <span>{indicator}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {selectedTemplate && (
              <div className="mt-6">
                <button
                  onClick={handlePreview}
                  disabled={!acknowledged}
                  className="w-full px-6 py-3 bg-cyber-magenta text-cyber-dark font-medium rounded-lg hover:bg-cyber-magenta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Eye className="h-5 w-5" />
                  <span>Preview Template</span>
                </button>
              </div>
            )}
          </div>

          {/* Template Preview */}
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-cyber-cyan mb-6">
              Phishing Preview
            </h3>
            
            {!showPreview ? (
              <div className="text-center py-16">
                <Shield className="h-16 w-16 text-cyber-gray-500 mx-auto mb-4" />
                <p className="text-cyber-gray-400">
                  Select a template and acknowledge the educational statement to view the phishing simulation
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-mono text-sm">
                      https://gmial-account-verify.suspicious-domain.com/login
                    </span>
                  </div>
                </div>
                
                {renderTemplate(selectedTemplateData)}
                
                {(userInput.email || userInput.password) && (
                  <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-lg p-4">
                    <h4 className="text-cyber-red font-semibold mb-2 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Captured Input (Demo)</span>
                    </h4>
                    <div className="space-y-1 text-sm font-mono">
                      {userInput.email && <p className="text-cyber-gray-200">Email: {userInput.email}</p>}
                      {userInput.password && <p className="text-cyber-gray-200">Password: {userInput.password}</p>}
                    </div>
                    <p className="text-xs text-cyber-gray-400 mt-2">
                      In a real attack, this information would be stolen!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Education Panel */}
          <div className="space-y-8">
            {/* Red Flags */}
            <div className="bg-cyber-navy/40 border border-cyber-red/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-cyber-red mb-6 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Phishing Red Flags</span>
              </h3>
              <div className="space-y-3">
                {phishingIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-red rounded-full flex-shrink-0 mt-2" />
                    <span className="text-cyber-gray-300 text-sm">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Tips */}
            <div className="bg-cyber-navy/40 border border-cyber-green/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-cyber-green mb-6 flex items-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span>Protection Tips</span>
              </h3>
              <div className="space-y-3">
                {preventionTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-green rounded-full flex-shrink-0 mt-2" />
                    <span className="text-cyber-gray-300 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
                <Info className="h-6 w-6" />
                <span>Did You Know?</span>
              </h3>
              <div className="space-y-4 text-cyber-gray-300 text-sm">
                <p>
                  <strong className="text-cyber-cyan">91%</strong> of cyberattacks start with a phishing email
                </p>
                <p>
                  <strong className="text-cyber-cyan">$1.8 billion</strong> lost to phishing attacks in 2022
                </p>
                <p>
                  <strong className="text-cyber-cyan">30%</strong> of phishing emails are opened by users
                </p>
                <p>
                  Spear phishing (targeted attacks) have a <strong className="text-cyber-cyan">95%</strong> success rate when targeting specific individuals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};