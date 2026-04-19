import React, { useState } from 'react';
import { 
  Wifi, Play, AlertTriangle, Shield, CheckCircle, XCircle, Info, Clock, 
  Server, AlertCircle, HardDrive, Globe, Lock, Zap, Network, Activity, Copy, ExternalLink
} from 'lucide-react';

interface ScanResponse {
  success: boolean;
  data?: {
    target: string;
    scan_type: string;
    results: Record<string, any>;
  };
  error?: string;
}

const API_BASE_URL = 'http://localhost:8000/api';

export const NetworkScanner: React.FC = () => {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('host');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);

  const scanTypes = [
    { id: 'host', name: 'Host Information', description: 'Detailed host & port analysis via Shodan', icon: Server },
    { id: 'dns', name: 'DNS Lookup', description: 'Resolve domain to IPs and get records', icon: Globe },
    { id: 'ssl', name: 'SSL/TLS Analysis', description: 'Certificate and SSL information', icon: Lock }
  ];

  const handleScan = async () => {
    if (!acknowledged || !legalConsent) {
      setError('Please read and acknowledge the legal warnings before proceeding.');
      return;
    }

    if (!target.trim()) {
      setError('Please enter a target to scan.');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please configure your Shodan API key first.');
      setShowApiKeyForm(true);
      return;
    }

    setIsScanning(true);
    setScanResults(null);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          target: target.trim(),
          scan_type: scanType
        })
      });

      const data = await response.json();

      if (data.success) {
        setScanResults(data);
        setError(null);
      } else {
        setError(data.error || 'Scan failed. Please check your API key and target.');
        setScanResults(null);
      }
    } catch (err) {
      setError(`Failed to connect to scanner backend. Make sure the Python backend is running on port 8000. Error: ${err}`);
      setScanResults(null);
    } finally {
      setIsScanning(false);
    }
  };

  const renderHostInfo = () => {
    if (!scanResults?.data?.results) return null;
    
    const results = scanResults.data.results;
    const hostInfo = results.host || results.host_1 || Object.values(results).find((r: any) => r.ip || r.hostnames);

    if (!hostInfo) {
      return (
        <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
          <p className="text-cyber-gray-300">No host information available</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Host Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cyber-dark/50 rounded-lg p-4">
            <p className="text-cyber-gray-400 text-sm">IP Address</p>
            <p className="text-cyber-cyan font-mono text-lg font-semibold">{hostInfo.ip_str || hostInfo.ip}</p>
          </div>
          {hostInfo.country_name && (
            <div className="bg-cyber-dark/50 rounded-lg p-4">
              <p className="text-cyber-gray-400 text-sm">Location</p>
              <p className="text-cyber-gray-200">{hostInfo.country_name}{hostInfo.city ? `, ${hostInfo.city}` : ''}</p>
            </div>
          )}
          {hostInfo.org && (
            <div className="bg-cyber-dark/50 rounded-lg p-4">
              <p className="text-cyber-gray-400 text-sm">Organization</p>
              <p className="text-cyber-gray-200">{hostInfo.org}</p>
            </div>
          )}
          {hostInfo.isp && (
            <div className="bg-cyber-dark/50 rounded-lg p-4">
              <p className="text-cyber-gray-400 text-sm">ISP</p>
              <p className="text-cyber-gray-200">{hostInfo.isp}</p>
            </div>
          )}
        </div>

        {/* Open Ports */}
        {hostInfo.ports && hostInfo.ports.length > 0 && (
          <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
            <h4 className="text-cyber-cyan font-semibold mb-4 flex items-center">
              <Server className="h-5 w-5 mr-2" />
              Open Ports ({hostInfo.ports.length})
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {hostInfo.ports.map((port: number, index: number) => (
                <div key={index} className="bg-cyber-dark/50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-cyber-gray-100 font-mono">{port}</span>
                  <span className="text-cyber-green text-sm">Open</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data */}
        {hostInfo.data && hostInfo.data.length > 0 && (
          <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
            <h4 className="text-cyber-cyan font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Services
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {hostInfo.data.map((service: any, index: number) => (
                <div key={index} className="bg-cyber-dark/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyber-cyan font-mono">Port {service.port}</span>
                    <span className="text-cyber-green text-xs bg-cyber-green/10 px-2 py-1 rounded">
                      {service.service || 'Unknown'}
                    </span>
                  </div>
                  {service.banner && (
                    <p className="text-cyber-gray-400 text-xs font-mono truncate">{service.banner}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Raw JSON */}
        <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
          <h4 className="text-cyber-cyan font-semibold mb-4">Raw Response</h4>
          <pre className="bg-cyber-dark/50 p-4 rounded text-cyber-gray-300 text-xs overflow-x-auto max-h-64 overflow-y-auto">
            {JSON.stringify(hostInfo, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  const renderDnsInfo = () => {
    if (!scanResults?.data?.results?.dns) return null;
    
    const dnsData = scanResults.data.results.dns;

    return (
      <div className="space-y-4">
        <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
          <h4 className="text-cyber-cyan font-semibold mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            DNS Records
          </h4>
          <div className="space-y-3">
            {Object.entries(dnsData).map(([recordType, ips]: [string, any], index: number) => (
              <div key={index} className="bg-cyber-dark/50 rounded-lg p-4">
                <p className="text-cyber-cyan font-mono font-semibold mb-2">{recordType} Records</p>
                <div className="space-y-1">
                  {Array.isArray(ips) ? (
                    ips.map((ip: string, i: number) => (
                      <p key={i} className="text-cyber-gray-300 font-mono">{ip}</p>
                    ))
                  ) : (
                    <p className="text-cyber-gray-300 font-mono">{ips}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!scanResults?.success) return null;

    if (scanType === 'host') {
      return renderHostInfo();
    } else if (scanType === 'dns') {
      return renderDnsInfo();
    }

    return (
      <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-6">
        <p className="text-cyber-gray-300">Scan results for type: {scanType}</p>
        <pre className="mt-4 bg-cyber-dark/50 p-4 rounded text-cyber-gray-300 text-xs overflow-x-auto max-h-96 overflow-y-auto">
          {JSON.stringify(scanResults.data?.results, null, 2)}
        </pre>
      </div>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-purple/10 rounded-full mb-6">
            <Wifi className="h-12 w-12 text-cyber-purple" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-purple mb-4 font-mono">
            Advanced Network Scanner
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Enterprise-grade network reconnaissance powered by Shodan API. Scan IPs, domains, and CIDR ranges 
            to discover services, vulnerabilities, and network topology.
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
                  <h4 className="text-cyber-red font-semibold mb-2">✓ LEGAL TARGETS (With Permission):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Your own devices and networks</li>
                    <li>• Systems with written authorization</li>
                    <li>• Lab/testing environments</li>
                    <li>• Authorized pentesting engagements</li>
                  </ul>
                </div>
                <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
                  <h4 className="text-cyber-red font-semibold mb-2">✗ ILLEGAL TARGETS (Without Permission):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Networks you don't own</li>
                    <li>• Systems without authorization</li>
                    <li>• Government/critical infrastructure</li>
                    <li>• Any unauthorized scanning</li>
                  </ul>
                </div>
                <p className="text-sm border-l-4 border-cyber-red/50 pl-4">
                  <strong>Penalties:</strong> Criminal charges, imprisonment, fines up to $250,000+, and permanent criminal records.
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
                    I have explicit written permission to scan this target and understand the legal implications
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
                    I will use this tool only for authorized security testing and educational purposes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-purple mb-6">
              Scan Configuration
            </h2>
            
            <div className="space-y-6">
              {/* API Configuration */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-cyber-gray-300">
                    Shodan API Key
                  </label>
                  <button
                    onClick={() => setShowApiKeyForm(!showApiKeyForm)}
                    className="text-xs text-cyber-purple hover:text-cyber-cyan transition-colors"
                  >
                    {showApiKeyForm ? 'Hide' : 'Configure'}
                  </button>
                </div>
                {showApiKeyForm && (
                  <div className="mb-4 p-4 bg-cyber-dark/50 rounded-lg border border-cyber-purple/30">
                    <p className="text-xs text-cyber-gray-400 mb-3">
                      Get your API key from <a href="https://www.shodan.io/" target="_blank" rel="noopener noreferrer" className="text-cyber-purple hover:text-cyber-cyan underline">shodan.io</a>
                    </p>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 bg-cyber-dark border border-cyber-purple/30 rounded text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-purple text-sm"
                      placeholder="sk_..."
                    />
                  </div>
                )}
                {apiKey && (
                  <div className="p-2 bg-cyber-green/10 border border-cyber-green/30 rounded text-xs text-cyber-green">
                    ✓ API Key configured
                  </div>
                )}
              </div>

              {/* Target Input */}
              <div>
                <label className="block text-sm font-medium text-cyber-gray-300 mb-2">
                  Target
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-purple/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-purple focus:border-cyber-purple transition-colors font-mono text-sm"
                  placeholder="192.168.1.1 or example.com"
                />
                <p className="text-xs text-cyber-gray-400 mt-2">
                  IP address, domain, or CIDR range (e.g., 192.168.1.0/24)
                </p>
              </div>

              {/* Scan Type */}
              <div>
                <label className="block text-sm font-medium text-cyber-gray-300 mb-3">
                  Scan Type
                </label>
                <div className="space-y-2">
                  {scanTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setScanType(type.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          scanType === type.id
                            ? 'border-cyber-purple bg-cyber-purple/10'
                            : 'border-cyber-purple/30 hover:border-cyber-purple hover:bg-cyber-purple/5'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-cyber-gray-100">{type.name}</div>
                            <div className="text-xs text-cyber-gray-400">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4">
                  <p className="text-cyber-red text-sm">{error}</p>
                </div>
              )}

              {/* Scan Button */}
              <button
                onClick={handleScan}
                disabled={isScanning || !acknowledged || !legalConsent}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                  isScanning || !acknowledged || !legalConsent
                    ? 'bg-cyber-gray-600 text-cyber-gray-400 cursor-not-allowed'
                    : 'bg-cyber-purple hover:bg-cyber-purple/80 text-cyber-white'
                }`}
              >
                {isScanning ? (
                  <>
                    <Activity className="h-5 w-5 animate-spin" />
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

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {scanResults && (
              <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-cyber-purple">
                    Scan Results
                  </h2>
                  {scanResults.success && (
                    <CheckCircle className="h-6 w-6 text-cyber-green" />
                  )}
                </div>

                <div className="bg-cyber-dark/50 rounded-lg p-4 mb-6">
                  <p className="text-cyber-gray-400 text-sm">Target</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-cyber-cyan font-mono">{scanResults.data?.target}</p>
                    <button
                      onClick={() => copyToClipboard(scanResults.data?.target || '')}
                      className="text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto pr-2">
                  {renderResults()}
                </div>
              </div>
            )}

            {!scanResults && !error && (
              <div className="bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-12 text-center">
                <Wifi className="h-12 w-12 text-cyber-purple/50 mx-auto mb-4" />
                <p className="text-cyber-gray-400">
                  Configure your scan parameters and click "Start Scan" to begin
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Backend Setup Instructions */}
        <div className="mt-12 bg-cyber-navy/40 border border-cyber-purple/20 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-cyber-purple mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Backend Setup Instructions
          </h3>
          <div className="space-y-4 text-cyber-gray-300">
            <div>
              <p className="font-semibold text-cyber-cyan mb-2">1. Install Python Dependencies</p>
              <code className="bg-cyber-dark/50 p-2 rounded text-sm block">
                cd backend && pip install -r requirements.txt
              </code>
            </div>
            <div>
              <p className="font-semibold text-cyber-cyan mb-2">2. Configure Your Shodan API Key</p>
              <code className="bg-cyber-dark/50 p-2 rounded text-sm block mb-2">
                cp .env.example .env
              </code>
              <p className="text-sm">Edit the .env file and add your Shodan API key from <a href="https://www.shodan.io/" target="_blank" rel="noopener noreferrer" className="text-cyber-purple hover:text-cyber-cyan underline">shodan.io</a></p>
            </div>
            <div>
              <p className="font-semibold text-cyber-cyan mb-2">3. Start the FastAPI Server</p>
              <code className="bg-cyber-dark/50 p-2 rounded text-sm block">
                python main.py
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};