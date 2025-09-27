import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

export const PasswordTester: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 
    'password123', 'admin', 'welcome', 'login', 'guest'
  ];

  const calculateEntropy = (password: string) => {
    let characterSet = 0;
    if (/[a-z]/.test(password)) characterSet += 26;
    if (/[A-Z]/.test(password)) characterSet += 26;
    if (/[0-9]/.test(password)) characterSet += 10;
    if (/[^a-zA-Z0-9]/.test(password)) characterSet += 32;
    
    return password.length * Math.log2(characterSet);
  };

  const detectPatterns = (password: string) => {
    const patterns = [];
    
    if (/(.)\1{2,}/.test(password)) {
      patterns.push('Repeated characters detected');
    }
    
    if (/123|234|345|456|567|678|789|890/.test(password)) {
      patterns.push('Sequential numbers detected');
    }
    
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(password.toLowerCase())) {
      patterns.push('Sequential letters detected');
    }
    
    if (/qwerty|asdf|zxcv/.test(password.toLowerCase())) {
      patterns.push('Keyboard pattern detected');
    }
    
    return patterns;
  };

  const getStrengthScore = (password: string) => {
    let score = 0;
    
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    
    if (commonPasswords.some(common => password.toLowerCase().includes(common.toLowerCase()))) {
      score -= 50;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  const getStrengthLabel = (score: number) => {
    if (score < 30) return { label: 'Very Weak', color: 'cyber-red' };
    if (score < 50) return { label: 'Weak', color: 'cyber-red' };
    if (score < 70) return { label: 'Fair', color: 'cyber-yellow' };
    if (score < 90) return { label: 'Good', color: 'cyber-cyan' };
    return { label: 'Excellent', color: 'cyber-green' };
  };

  const analyzePassword = (password: string) => {
    if (!password) {
      setAnalysis(null);
      return;
    }

    const entropy = calculateEntropy(password);
    const patterns = detectPatterns(password);
    const score = getStrengthScore(password);
    const strength = getStrengthLabel(score);
    const isCommon = commonPasswords.some(common => 
      password.toLowerCase() === common.toLowerCase()
    );

    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[^a-zA-Z0-9]/.test(password),
      notCommon: !isCommon
    };

    const suggestions = [];
    if (!checks.length) suggestions.push('Use at least 8 characters');
    if (!checks.uppercase) suggestions.push('Add uppercase letters');
    if (!checks.lowercase) suggestions.push('Add lowercase letters');
    if (!checks.numbers) suggestions.push('Add numbers');
    if (!checks.symbols) suggestions.push('Add special characters');
    if (!checks.notCommon) suggestions.push('Avoid common passwords');
    if (patterns.length > 0) suggestions.push('Avoid predictable patterns');

    setAnalysis({
      entropy,
      patterns,
      score,
      strength,
      isCommon,
      checks,
      suggestions
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => analyzePassword(password), 300);
    return () => clearTimeout(timer);
  }, [password]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-green/10 rounded-full mb-6">
            <Lock className="h-12 w-12 text-cyber-green" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-green mb-4 font-mono">
            Password Strength Tester
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-2xl mx-auto">
            Analyze your password security with entropy calculation, pattern detection, 
            and comprehensive security recommendations.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-cyber-navy/50 border border-cyber-cyan/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Info className="h-6 w-6 text-cyber-cyan flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cyber-cyan mb-2">
                Privacy & Security Notice
              </h3>
              <p className="text-cyber-gray-300 text-sm">
                Your password is analyzed locally in your browser and is never transmitted 
                or stored on our servers. This tool is for educational purposes only.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Password Input */}
          <div className="bg-cyber-navy/40 border border-cyber-green/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-green mb-6">
              Test Your Password
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cyber-gray-300 mb-3">
                  Enter Password to Analyze
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-cyber-dark border border-cyber-green/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-green focus:border-cyber-green transition-colors font-mono text-lg pr-12"
                    placeholder="Type your password here..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray-400 hover:text-cyber-green transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Quick Test Buttons */}
              <div className="space-y-3">
                <p className="text-sm text-cyber-gray-400">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {['password', 'P@ssw0rd123', 'MyStr0ng!P@ssw0rd'].map((example) => (
                    <button
                      key={example}
                      onClick={() => setPassword(example)}
                      className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-lg text-sm hover:bg-cyber-green/20 transition-colors font-mono"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
              Security Analysis
            </h2>
            
            {!analysis ? (
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-cyber-gray-500 mx-auto mb-4" />
                <p className="text-cyber-gray-400">
                  Enter a password above to see detailed security analysis
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Strength Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-gray-300">Overall Strength</span>
                    <span className={`text-${analysis.strength.color} font-semibold`}>
                      {analysis.strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-cyber-dark rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 bg-${analysis.strength.color} rounded-full transition-all duration-500`}
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-cyber-gray-400">
                    Score: {analysis.score}/100
                  </p>
                </div>

                {/* Entropy */}
                <div className="bg-cyber-dark/50 rounded-lg p-4">
                  <h4 className="text-cyber-cyan font-medium mb-2">Entropy Analysis</h4>
                  <p className="text-2xl font-mono text-cyber-gray-100 mb-1">
                    {analysis.entropy.toFixed(1)} bits
                  </p>
                  <p className="text-xs text-cyber-gray-400">
                    Higher entropy = more secure password
                  </p>
                </div>

                {/* Security Checks */}
                <div>
                  <h4 className="text-cyber-cyan font-medium mb-3">Security Requirements</h4>
                  <div className="space-y-2">
                    {Object.entries({
                      'At least 8 characters': analysis.checks.length,
                      'Contains uppercase letters': analysis.checks.uppercase,
                      'Contains lowercase letters': analysis.checks.lowercase,
                      'Contains numbers': analysis.checks.numbers,
                      'Contains special characters': analysis.checks.symbols,
                      'Not a common password': analysis.checks.notCommon
                    }).map(([requirement, met]) => (
                      <div key={requirement} className="flex items-center space-x-3">
                        {met ? (
                          <CheckCircle className="h-5 w-5 text-cyber-green flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-cyber-red flex-shrink-0" />
                        )}
                        <span className={`text-sm ${met ? 'text-cyber-gray-100' : 'text-cyber-gray-400'}`}>
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patterns & Warnings */}
                {analysis.patterns.length > 0 && (
                  <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
                    <h4 className="text-cyber-red font-medium mb-2 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Security Warnings</span>
                    </h4>
                    <ul className="space-y-1">
                      {analysis.patterns.map((pattern: string, index: number) => (
                        <li key={index} className="text-sm text-cyber-red flex items-center space-x-2">
                          <div className="w-1 h-1 bg-cyber-red rounded-full flex-shrink-0" />
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-4">
                    <h4 className="text-cyber-cyan font-medium mb-2">Improvement Suggestions</h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-cyber-gray-300 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-cyber-cyan rounded-full flex-shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-cyber-navy/30 border border-cyber-cyan/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
            Password Security Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-cyber-green mb-4">✓ Do This</h3>
              <ul className="space-y-2 text-cyber-gray-300">
                <li>• Use at least 12 characters</li>
                <li>• Mix uppercase, lowercase, numbers, and symbols</li>
                <li>• Use unique passwords for each account</li>
                <li>• Consider using passphrases</li>
                <li>• Use a password manager</li>
                <li>• Enable two-factor authentication</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyber-red mb-4">✗ Avoid This</h3>
              <ul className="space-y-2 text-cyber-gray-300">
                <li>• Personal information (names, birthdays)</li>
                <li>• Common words or phrases</li>
                <li>• Keyboard patterns (qwerty, 123456)</li>
                <li>• Reusing passwords across sites</li>
                <li>• Storing passwords in plain text</li>
                <li>• Sharing passwords via email/text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};