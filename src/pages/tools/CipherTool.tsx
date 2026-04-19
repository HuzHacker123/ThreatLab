import React, { useState } from 'react';
import { Key, RefreshCw, Copy, Check, Info } from 'lucide-react';

export const CipherTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState('caesar');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [caesarShift, setCaesarShift] = useState(3);
  const [vigenereKey, setVigenereKey] = useState('SECRET');
  const [rsaKeyPair, setRsaKeyPair] = useState<any>(null);
  const [copied, setCopied] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const tabs = [
    { id: 'caesar', label: 'Caesar Cipher', description: 'Simple substitution cipher' },
    { id: 'vigenere', label: 'Vigenère Cipher', description: 'Polyalphabetic cipher' },
    { id: 'rsa', label: 'RSA Encryption', description: 'Asymmetric encryption' }
  ];

  // Caesar Cipher Functions
  const caesarEncrypt = (text: string, shift: number) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char >= 'a' ? 97 : 65;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };

  const caesarDecrypt = (text: string, shift: number) => {
    return caesarEncrypt(text, 26 - shift);
  };

  // Vigenère Cipher Functions
  const vigenereEncrypt = (text: string, key: string) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const start = char >= 'a' ? 97 : 65;
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyShift = keyChar.charCodeAt(0) - 65;
        result += String.fromCharCode(((char.charCodeAt(0) - start + keyShift) % 26) + start);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const vigenereDecrypt = (text: string, key: string) => {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const start = char >= 'a' ? 97 : 65;
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyShift = keyChar.charCodeAt(0) - 65;
        result += String.fromCharCode(((char.charCodeAt(0) - start - keyShift + 26) % 26) + start);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  // Mock RSA Functions (simplified for demo)
  const generateRSAKeyPair = () => {
    // This is a mock implementation for educational purposes
    const keyPair = {
      publicKey: {
        n: '3233',
        e: '17'
      },
      privateKey: {
        n: '3233',
        d: '413'
      }
    };
    setRsaKeyPair(keyPair);
    return keyPair;
  };

  const rsaEncrypt = (text: string) => {
    if (!rsaKeyPair) return 'Generate keys first';
    // Mock RSA encryption for demo
    return btoa(text).split('').reverse().join('');
  };

  const rsaDecrypt = (ciphertext: string) => {
    if (!rsaKeyPair) return 'Generate keys first';
    // Mock RSA decryption for demo
    try {
      return atob(ciphertext.split('').reverse().join(''));
    } catch {
      return 'Invalid ciphertext';
    }
  };

  const handleProcess = () => {
    let result = '';
    
    switch (activeTab) {
      case 'caesar':
        result = mode === 'encrypt' 
          ? caesarEncrypt(plaintext, caesarShift)
          : caesarDecrypt(plaintext, caesarShift);
        break;
      case 'vigenere':
        if (!vigenereKey) {
          result = 'Please enter a key';
          break;
        }
        result = mode === 'encrypt'
          ? vigenereEncrypt(plaintext, vigenereKey)
          : vigenereDecrypt(plaintext, vigenereKey);
        break;
      case 'rsa':
        if (!rsaKeyPair) {
          result = 'Please generate RSA keys first';
          break;
        }
        result = mode === 'encrypt' 
          ? rsaEncrypt(plaintext)
          : rsaDecrypt(plaintext);
        break;
    }
    
    setCiphertext(result);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const swapTexts = () => {
    const temp = plaintext;
    setPlaintext(ciphertext);
    setCiphertext(temp);
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  const renderCaesarControls = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-cyber-gray-300 mb-2">
          Shift Value: {caesarShift}
        </label>
        <input
          type="range"
          min="1"
          max="25"
          value={caesarShift}
          onChange={(e) => setCaesarShift(parseInt(e.target.value))}
          className="w-full h-2 bg-cyber-dark rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-cyber-gray-500 mt-1">
          <span>1</span>
          <span>25</span>
        </div>
      </div>
      <div className="bg-cyber-dark/50 rounded-lg p-3">
        <p className="text-xs text-cyber-gray-400">
          Caesar cipher shifts each letter by {caesarShift} positions in the alphabet. 
          For example: A → {String.fromCharCode(65 + caesarShift)}
        </p>
      </div>
    </div>
  );

  const renderVigenereControls = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-cyber-gray-300 mb-2">
          Encryption Key
        </label>
        <input
          type="text"
          value={vigenereKey}
          onChange={(e) => setVigenereKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
          className="w-full px-4 py-3 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan transition-colors font-mono"
          placeholder="Enter key (letters only)"
        />
      </div>
      <div className="bg-cyber-dark/50 rounded-lg p-3">
        <p className="text-xs text-cyber-gray-400">
          Vigenère cipher uses a repeating keyword to shift letters by different amounts. 
          Key length: {vigenereKey.length} characters
        </p>
      </div>
    </div>
  );

  const renderRSAControls = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cyber-gray-300">RSA Key Pair</span>
        <button
          onClick={generateRSAKeyPair}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-cyber-dark transition-colors text-sm flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Generate Keys</span>
        </button>
      </div>
      
      {rsaKeyPair && (
        <div className="space-y-3">
          <div className="bg-cyber-dark/50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-cyber-green mb-2">Public Key (n, e)</h4>
            <p className="text-xs font-mono text-cyber-gray-300">
              n = {rsaKeyPair.publicKey.n}, e = {rsaKeyPair.publicKey.e}
            </p>
          </div>
          <div className="bg-cyber-dark/50 rounded-lg p-3">
            <h4 className="text-xs font-medium text-cyber-red mb-2">Private Key (n, d)</h4>
            <p className="text-xs font-mono text-cyber-gray-300">
              n = {rsaKeyPair.privateKey.n}, d = {rsaKeyPair.privateKey.d}
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-cyber-dark/50 rounded-lg p-3">
        <p className="text-xs text-cyber-gray-400">
          RSA uses public-private key pairs. Encrypt with public key, decrypt with private key. 
          This is a simplified demo version.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-6">
            <Key className="h-12 w-12 text-cyber-cyan" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-cyan mb-4 font-mono">
            Cipher Tool
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Explore classical and modern encryption algorithms. Learn how ciphers work 
            and experiment with different encryption techniques.
          </p>
        </div>

        {/* Educational Notice */}
        <div className="bg-cyber-navy/50 border border-cyber-cyan/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Info className="h-6 w-6 text-cyber-cyan flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cyber-cyan mb-2">
                Educational Purpose
              </h3>
              <p className="text-cyber-gray-300 text-sm">
                These cipher implementations are for learning purposes only. Classical ciphers 
                like Caesar and Vigenère are not secure for modern use. RSA example is simplified.
              </p>
            </div>
          </div>
        </div>

        {/* Cipher Tabs */}
        <div className="flex space-x-1 mb-8 bg-cyber-navy/30 rounded-xl p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 text-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyber-cyan text-cyber-dark font-medium'
                  : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10'
              }`}
            >
              <div className="font-medium">{tab.label}</div>
              <div className="text-xs opacity-75 mt-1">{tab.description}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
              {tabs.find(tab => tab.id === activeTab)?.label} Settings
            </h2>
            
            {/* Mode Toggle */}
            <div className="mb-6">
              <div className="flex rounded-lg bg-cyber-dark/50 p-1">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    mode === 'encrypt'
                      ? 'bg-cyber-cyan text-cyber-dark'
                      : 'text-cyber-gray-300 hover:text-cyber-cyan'
                  }`}
                >
                  Encrypt
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    mode === 'decrypt'
                      ? 'bg-cyber-cyan text-cyber-dark'
                      : 'text-cyber-gray-300 hover:text-cyber-cyan'
                  }`}
                >
                  Decrypt
                </button>
              </div>
            </div>

            {/* Cipher-specific controls */}
            {activeTab === 'caesar' && renderCaesarControls()}
            {activeTab === 'vigenere' && renderVigenereControls()}
            {activeTab === 'rsa' && renderRSAControls()}

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <button
                onClick={handleProcess}
                className="w-full px-6 py-3 bg-cyber-cyan text-cyber-dark font-medium rounded-lg hover:bg-cyber-cyan/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Key className="h-5 w-5" />
                <span>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</span>
              </button>
              
              <button
                onClick={swapTexts}
                className="w-full px-6 py-3 bg-cyber-navy border border-cyber-cyan text-cyber-cyan font-medium rounded-lg hover:bg-cyber-cyan/10 transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Swap Input/Output</span>
              </button>
            </div>
          </div>

          {/* Input/Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input */}
            <div className="bg-cyber-navy/40 border border-cyber-green/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-cyber-green">
                  {mode === 'encrypt' ? 'Plaintext Input' : 'Ciphertext Input'}
                </h3>
                <button
                  onClick={() => copyToClipboard(plaintext, 'input')}
                  className="p-2 text-cyber-gray-400 hover:text-cyber-green transition-colors"
                  title="Copy to clipboard"
                >
                  {copied === 'input' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-cyber-dark border border-cyber-green/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-green focus:border-cyber-green transition-colors resize-none font-mono"
                placeholder={`Enter ${mode === 'encrypt' ? 'plaintext' : 'ciphertext'} here...`}
              />
              <p className="text-xs text-cyber-gray-400 mt-2">
                Characters: {plaintext.length}
              </p>
            </div>

            {/* Output */}
            <div className="bg-cyber-navy/40 border border-cyber-magenta/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-cyber-magenta">
                  {mode === 'encrypt' ? 'Ciphertext Output' : 'Plaintext Output'}
                </h3>
                <button
                  onClick={() => copyToClipboard(ciphertext, 'output')}
                  className="p-2 text-cyber-gray-400 hover:text-cyber-magenta transition-colors"
                  title="Copy to clipboard"
                  disabled={!ciphertext}
                >
                  {copied === 'output' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <textarea
                value={ciphertext}
                readOnly
                className="w-full h-32 px-4 py-3 bg-cyber-dark border border-cyber-magenta/30 rounded-lg text-cyber-gray-100 resize-none font-mono cursor-default"
                placeholder={`${mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} text will appear here...`}
              />
              <p className="text-xs text-cyber-gray-400 mt-2">
                Characters: {ciphertext.length}
              </p>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-cyber-navy/30 border border-cyber-cyan/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
            Cipher Security Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-red/10 rounded-lg mb-4">
                <div className="w-8 h-8 bg-cyber-red rounded-full flex items-center justify-center">
                  <span className="text-cyber-dark font-bold text-sm">C</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-cyber-red mb-3">Caesar Cipher</h3>
              <p className="text-cyber-gray-300 text-sm">
                <strong>Security:</strong> Very weak<br/>
                <strong>Key space:</strong> 25 possible keys<br/>
                <strong>Weakness:</strong> Easily broken by frequency analysis or brute force
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-purple/10 rounded-lg mb-4">
                <div className="w-8 h-8 bg-cyber-purple rounded-full flex items-center justify-center">
                  <span className="text-cyber-dark font-bold text-sm">V</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-cyber-yellow mb-3">Vigenère Cipher</h3>
              <p className="text-cyber-gray-300 text-sm">
                <strong>Security:</strong> Weak<br/>
                <strong>Key space:</strong> Depends on key length<br/>
                <strong>Weakness:</strong> Vulnerable to Kasiski examination and index of coincidence
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-green/10 rounded-lg mb-4">
                <div className="w-8 h-8 bg-cyber-green rounded-full flex items-center justify-center">
                  <span className="text-cyber-dark font-bold text-sm">R</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-cyber-green mb-3">RSA Encryption</h3>
              <p className="text-cyber-gray-300 text-sm">
                <strong>Security:</strong> Strong (with proper implementation)<br/>
                <strong>Key space:</strong> Extremely large<br/>
                <strong>Strength:</strong> Based on difficulty of factoring large numbers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};