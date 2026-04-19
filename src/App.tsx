import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ToolsOverview } from './pages/ToolsOverview';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { PasswordTester } from './pages/tools/PasswordTester';
import { CipherTool } from './pages/tools/CipherTool';
import { PhishingSimulator } from './pages/tools/PhishingSimulator';
import { NetworkScanner } from './pages/tools/NetworkScanner';
import { MalwareScanner } from './pages/tools/MalwareScanner';
import { SQLInjectionDemo } from './pages/tools/SQLInjectionDemo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-cyber-dark bg-cyber-grid bg-cyber-grid text-cyber-gray-100">
          <div className="min-h-screen bg-cyber-gradient">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<ToolsOverview />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/tools/password-tester" element={<PasswordTester />} />
                <Route path="/tools/cipher-tool" element={<CipherTool />} />
                <Route path="/tools/phishing-simulator" element={<PhishingSimulator />} />
                <Route path="/tools/network-scanner" element={<NetworkScanner />} />
                <Route path="/tools/malware-scanner" element={<MalwareScanner />} />
                <Route path="/tools/sql-injection-demo" element={<SQLInjectionDemo />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;