import React, { useState } from 'react';
import { Wifi, Play, AlertTriangle, Shield, CheckCircle, XCircle, Info, Clock } from 'lucide-react';

export const NetworkScanner: React.FC = () => {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('ping');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);

  const scanTypes = [
    { id: 'ping', name: 'Ping Sweep', description: 'Check if hosts are alive' },
    { id: 'port', name: 'Port Scan', description: 'Scan for open ports' },
    { id: 'service', name: 'Service Detection', description: 'Identify running services' },
    { id: 'vuln', name: 'Vulnerability Scan', description: 'Check for known vulnerabilities' }
  ];

  const mockResults = {
    ping: {
      target: '192.168.1.1',
      status: 'alive',
      responseTime: '2.3ms',
      packets: { sent: 4, received: 4, lost: 0 }
    },
    port: {
      target: '192.168.1.1',
      openPorts: [
        { port: 22, service: 'SSH', state: 'open' },
        { port: 80, service: 'HTTP', state: 'open' },
        { port: 443, service: 'HTTPS', state: 'open' },
        { port: 8080, service: 'HTTP-Proxy', state: 'filtered' }
      ]
    },
    service: {
      target: '192.168.1.1',
      services: [
        { port: 22, service: 'OpenSSH', version: '8.2', confidence: '95%' },
        { port: 80, service: 'Apache', version: '2.4.41', confidence: '90%' },
        { port: 443, service: 'Apache', version: '2.4.41', confidence: '90%' }
      ]
    },
    vuln: {
      target: '192.168.1.1',
      vulnerabilities: [
        { id: 'CVE-2021-44228', severity: 'Critical', description: 'Log4Shell vulnerability', status: 'Not vulnerable' },
        { id: 'CVE-2022-0847', severity: 'High', description: 'Dirty Pipe vulnerability', status: 'Potentially vulnerable' },
        { id: 'CVE-2019-0708', severity: 'Critical', description: 'BlueKeep RDP vulnerability', status: 'Not applicable' }
      ]
    }
  };

  const handleScan = async () => {
    if (!acknowledged || !legalConsent) {
      alert('Please read and acknowledge the legal warnings before proceeding.');
      return;
    }

    if (!target) {
      alert('Please enter a target to scan.');
      return;
    }

    setIsScanning(true);
    setScanResults(null);

    // Simulate scanning delay
    setTimeout(() => {
      setScanResults(mockResults[scanType as keyof typeof mockResults]);
      setIsScanning(false);
    }, 3000);
  };

  const renderResults = () => {
    if (!scanResults) return null;

    switch (scanType) {
      case 'ping':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-cyber-green" />
              <span className="text-cyber-green font-semibold">Host is reachable</span>
            </div>
            <div className="bg-cyber-dark/50 rounded-lg p-4 space-y-2">
              <p className="text-cyber-gray-100"><span className="text-cyber-cyan">Target:</span> {scanResults.target}</p>
              <p className="text-cyber-gray-100"><span className="text-cyber-cyan">Response Time:</span> {scanResults.responseTime}</p>
              <p className="text-cyber-gray-100">
                <span className="text-cyber-cyan">Packets:</span> {scanResults.packets.sent} sent, {scanResults.packets.received} received, {scanResults.packets.lost} lost
              </p>
            </div>
          </div>
        );

      case 'port':
        return (
          <div className="space-y-4">
            <h4 className="text-cyber-cyan font-semibold">Open Ports Found</h4>
            <div className="space-y-2">
              {scanResults.openPorts.map((port: any, index: number) => (
                <div key={index} className="bg-cyber-dark/50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-gray-100 font-mono">{port.port}</span>
                    <span className="text-cyber-gray-300">{port.service}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    port.state === 'open' ? 'bg-cyber-green/20 text-cyber-green' :
                    port.state === 'closed' ? 'bg-cyber-red/20 text-cyber-red' :
                    'bg-cyber-yellow/20 text-cyber-yellow'
                  }`}>
                    {port.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'service':
        return (
          <div className="space-y-4">
            <h4 className="text-cyber-cyan font-semibold">Service Detection Results</h4>
            <div className="space-y-2">
              {scanResults.services.map((service: any, index: number) => (
                <div key={index} className="bg-cyber-dark/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-gray-100 font-mono">Port {service.port}</span>
                    <span className="text-cyber-green text-sm">{service.confidence} confidence</span>
                  </div>
                  <p className="text-cyber-gray-300 text-sm">
                    <span className="text-cyber-cyan">{service.service}</span> version {service.version}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'vuln':
        return (
          <div className="space-y-4">
            <h4 className="text-cyber-cyan font-semibold">Vulnerability Assessment</h4>
            <div className="space-y-2">
              {scanResults.vulnerabilities.map((vuln: any, index: number) => (
                <div key={index} className="bg-cyber-dark/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyber-gray-100 font-mono">{vuln.id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      vuln.severity === 'Critical' ? 'bg-cyber-red/20 text-cyber-red' :
                      vuln.severity === 'High' ? 'bg-cyber-yellow/20 text-cyber-yellow' :
                      'bg-cyber-green/20 text-cyber-green'
                    }`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p className="text-cyber-gray-300 text-sm mb-1">{vuln.description}</p>
                  <p className={`text-sm font-medium ${
                    vuln.status.includes('Not') ? 'text-cyber-green' :
                    vuln.status.includes('Potentially') ? 'text-cyber-yellow' :
                    'text-cyber-red'
                  }`}>
                    Status: {vuln.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-purple/10 rounded-full mb-6">
            <Wifi className="h-12 w-12 text-cyber-purple" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-purple mb-4 font-mono">
            Network Scanner
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Discover network topology and identify potential vulnerabilities in a controlled environment. 
            Educational tool for learning network security assessment.
          </p>
        </div>

        {/* Legal Warning */}
        <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-xl p-8 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-cyber-red flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-cyber-red mb-4">
                ⚠️ LEGAL WARNING & COMPLIANCE
              </h3>
              <div className="space-y-4 text-cyber-gray-200">
                <p className="font-semibold">
                  Network scanning can be illegal when performed without explicit permission. 
                  You must comply with all applicable laws and regulations.
                </p>
                <div className="bg-cyber-dark/50 rounded-lg p-4">
                  <h4 className="text-cyber-red font-semibold mb-2">ONLY scan networks you own or have explicit written permission to test:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Your own home network devices</li>
                    <li>• Corporate networks with written authorization</li>
                    <li>• Designated lab environments</li>
                    <li>• Legal penetration testing engagements</li>
                  </ul>
                </div>
                <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
                  <h4 className="text-cyber-red font-semibold mb-2">NEVER scan:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Networks you don't own or control</li>
                    <li>• Public IP addresses without permission</li>
                    <li>• Government or critical infrastructure</li>
                    <li>• Any system without explicit authorization</li>
                  </ul>
                </div>
                <p className="text-sm">
                  <strong>Legal Consequences:</strong> Unauthorized network scanning can result in criminal charges, 
                  fines, civil liability, and permanent criminal records. Some jurisdictions consider it equivalent to breaking and entering.
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    id="acknowledge-legal"
                    type="checkbox"
                    checked={legalConsent}
                    onChange={(e) => setLegalConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 bg-cyber-dark border border-cyber-red/50 rounded focus:ring-2 focus:ring-cyber-red"
                  />
                  <label htmlFor="acknowledge-legal" className="text-sm text-cyber-gray-200">
                    I understand the legal requirements and confirm I have explicit permission to scan the target network
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    id="acknowledge-education"
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-1 h-4 w-4 bg-cyber-dark border border-cyber-red/50 rounded focus:ring-2 focus:ring-cyber-red"
                  />
                  <label htmlFor="acknowledge-education" className="text-sm text-cyber-gray-200">
                    I will use this tool only for educational purposes and ethical security research
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scanner Configuration */}
          <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-purple mb-6">
              Scan Configuration
            </h2>
            
            <div className="space-y-6">
              {/* Target */}
              <div>
                <label className="block text-sm font-medium text-cyber-gray-300 mb-2">
                  Target (IP Address or Hostname)
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-purple/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-purple focus:border-cyber-purple transition-colors font-mono"
                  placeholder="192.168.1.1 or example.com"
                />
                <p className="text-xs text-cyber-gray-400 mt-1">
                  Example: 192.168.1.1 (your router) or localhost
                </p>
              </div>

              {/* Scan Type */}
              <div>
                <label className="block text-sm font-medium text-cyber-gray-300 mb-3">
                  Scan Type
                </label>
                <div className="space-y-2">
                  {scanTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setScanType(type.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        scanType === type.id
                          ? 'border-cyber-purple bg-cyber-purple/10 text-cyber-purple'
                          : 'border-cyber-purple/30 text-cyber-gray-300 hover:border-cyber-purple hover:bg-cyber-purple/5'
                      }`}
                    >
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                disabled={isScanning || !acknowledged || !legalConsent || !target}
                className="w-full px-6 py-3 bg-cyber-purple text-cyber-dark font-medium rounded-lg hover:bg-cyber-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isScanning ? (
                  <>
                    <Clock className="h-5 w-5 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Start Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scan Results */}
          <div className="lg:col-span-2 bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
              Scan Results
            </h2>
            
            {isScanning && (
              <div className="text-center py-12">
                <div className="animate-spin mx-auto mb-4">
                  <Wifi className="h-16 w-16 text-cyber-purple" />
                </div>
                <p className="text-cyber-gray-300">
                  Scanning {target} using {scanTypes.find(t => t.id === scanType)?.name}...
                </p>
                <p className="text-cyber-gray-400 text-sm mt-2">
                  This may take a few moments
                </p>
              </div>
            )}
            
            {!isScanning && !scanResults && (
              <div className="text-center py-16">
                <Shield className="h-16 w-16 text-cyber-gray-500 mx-auto mb-4" />
                <p className="text-cyber-gray-400">
                  Configure your scan settings and click "Start Scan" to begin
                </p>
              </div>
            )}
            
            {!isScanning && scanResults && (
              <div className="space-y-6">
                <div className="bg-cyber-dark/30 rounded-lg p-4 border border-cyber-cyan/30">
                  <h3 className="text-lg font-semibold text-cyber-cyan mb-2">
                    {scanTypes.find(t => t.id === scanType)?.name} Results
                  </h3>
                  <p className="text-cyber-gray-400 text-sm">
                    Target: {target} | Scan completed at {new Date().toLocaleTimeString()}
                  </p>
                </div>
                
                {renderResults()}
                
                {/* Educational Note */}
                <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-cyber-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-cyber-cyan font-medium mb-2">Educational Note</h4>
                      <p className="text-cyber-gray-300 text-sm">
                        These are simulated results for educational purposes. In a real scan, 
                        results would vary based on the actual network configuration, 
                        firewall rules, and security measures in place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 bg-cyber-navy/30 border border-cyber-cyan/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
            Network Scanning Fundamentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-green/10 rounded-lg mb-4">
                <CheckCircle className="h-8 w-8 text-cyber-green" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-green mb-3">Reconnaissance</h3>
              <p className="text-cyber-gray-300 text-sm">
                First phase of security assessment. Gather information about network topology and assets.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-cyan/10 rounded-lg mb-4">
                <Wifi className="h-8 w-8 text-cyber-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-cyan mb-3">Port Scanning</h3>
              <p className="text-cyber-gray-300 text-sm">
                Identify open ports and services. Common ports: 22 (SSH), 80 (HTTP), 443 (HTTPS).
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-purple/10 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-cyber-purple" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-purple mb-3">Service Detection</h3>
              <p className="text-cyber-gray-300 text-sm">
                Identify specific services and versions running on open ports for vulnerability assessment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-red/10 rounded-lg mb-4">
                <AlertTriangle className="h-8 w-8 text-cyber-red" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-red mb-3">Vulnerability Assessment</h3>
              <p className="text-cyber-gray-300 text-sm">
                Check for known security vulnerabilities in discovered services and configurations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};