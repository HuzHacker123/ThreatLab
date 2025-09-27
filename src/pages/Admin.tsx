import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Users, 
  Activity, 
  Shield, 
  FileText, 
  Download, 
  BarChart3, 
  AlertTriangle,
  Clock,
  TrendingUp,
  Eye
} from 'lucide-react';

export const Admin: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'tools', label: 'Tool Usage', icon: Shield },
    { id: 'files', label: 'File Uploads', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Download }
  ];

  const stats = [
    { label: 'Active Users', value: '1,234', icon: Users, color: 'cyber-cyan' },
    { label: 'Daily Scans', value: '567', icon: Activity, color: 'cyber-green' },
    { label: 'Threats Detected', value: '89', icon: AlertTriangle, color: 'cyber-red' },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'cyber-magenta' }
  ];

  const recentActivity = [
    { user: 'john_doe', action: 'Uploaded file for malware scan', time: '2 minutes ago', status: 'success' },
    { user: 'jane_smith', action: 'Completed SQL injection demo', time: '15 minutes ago', status: 'success' },
    { user: 'security_student', action: 'Failed network scan (permission denied)', time: '1 hour ago', status: 'warning' },
    { user: 'admin', action: 'Generated security report', time: '2 hours ago', status: 'info' },
    { user: 'test_user', action: 'Registered new account', time: '3 hours ago', status: 'success' }
  ];

  const toolUsage = [
    { tool: 'Password Tester', uses: 2456, trend: '+12%' },
    { tool: 'Cipher Tool', uses: 1893, trend: '+8%' },
    { tool: 'Malware Scanner', uses: 1234, trend: '+15%' },
    { tool: 'Network Scanner', uses: 891, trend: '+5%' },
    { tool: 'Phishing Simulator', uses: 756, trend: '+22%' },
    { tool: 'SQL Injection Demo', uses: 634, trend: '+18%' }
  ];

  const generateReport = (type: string) => {
    // Mock report generation
    console.log(`Generating ${type} report...`);
    alert(`${type} report generated successfully! In production, this would download a PDF.`);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-cyber-navy/40 border border-${stat.color}/20 rounded-xl p-6 hover:border-${stat.color} transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyber-gray-400 text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color} font-mono`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 bg-${stat.color}/10 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cyber-cyan mb-6 flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-cyber-dark/50 rounded-lg border border-cyber-cyan/10"
            >
              <div className="flex-1">
                <p className="text-cyber-gray-100 font-medium">{activity.user}</p>
                <p className="text-cyber-gray-400 text-sm">{activity.action}</p>
              </div>
              <div className="text-right">
                <p className="text-cyber-gray-400 text-xs">{activity.time}</p>
                <span className={`inline-block w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-cyber-green' :
                  activity.status === 'warning' ? 'bg-cyber-red' :
                  'bg-cyber-cyan'
                }`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Usage Chart */}
      <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cyber-cyan mb-6 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Tool Usage Statistics</span>
        </h3>
        <div className="space-y-4">
          {toolUsage.map((tool, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-cyber-gray-100">{tool.tool}</span>
              <div className="flex items-center space-x-4">
                <span className="text-cyber-gray-300 font-mono">{tool.uses.toLocaleString()}</span>
                <span className="text-cyber-green text-sm font-medium">{tool.trend}</span>
                <div className="w-20 h-2 bg-cyber-dark rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyber-cyan rounded-full" 
                    style={{ width: `${(tool.uses / 2500) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-cyber-cyan mb-6">User Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyber-cyan/20">
              <th className="text-left py-3 text-cyber-gray-300">Username</th>
              <th className="text-left py-3 text-cyber-gray-300">Email</th>
              <th className="text-left py-3 text-cyber-gray-300">Role</th>
              <th className="text-left py-3 text-cyber-gray-300">Last Active</th>
              <th className="text-left py-3 text-cyber-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="text-cyber-gray-100">
            <tr className="border-b border-cyber-cyan/10">
              <td className="py-3">admin</td>
              <td className="py-3">admin@gmail.com</td>
              <td className="py-3"><span className="text-cyber-magenta">Admin</span></td>
              <td className="py-3">Currently online</td>
              <td className="py-3"><span className="text-cyber-green">Active</span></td>
            </tr>
            <tr className="border-b border-cyber-cyan/10">
              <td className="py-3">john_doe</td>
              <td className="py-3">john@example.com</td>
              <td className="py-3">User</td>
              <td className="py-3">2 minutes ago</td>
              <td className="py-3"><span className="text-cyber-green">Active</span></td>
            </tr>
            <tr className="border-b border-cyber-cyan/10">
              <td className="py-3">jane_smith</td>
              <td className="py-3">jane@example.com</td>
              <td className="py-3">User</td>
              <td className="py-3">1 hour ago</td>
              <td className="py-3"><span className="text-cyber-green">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cyber-cyan mb-6">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => generateReport('Security Summary')}
            className="p-6 bg-cyber-dark/50 border border-cyber-cyan/30 rounded-lg hover:border-cyber-cyan hover:bg-cyber-navy/30 transition-colors text-left"
          >
            <FileText className="h-8 w-8 text-cyber-cyan mb-3" />
            <h4 className="text-lg font-semibold text-cyber-gray-100 mb-2">Security Summary</h4>
            <p className="text-cyber-gray-400 text-sm">Comprehensive security metrics and threat analysis</p>
          </button>
          
          <button
            onClick={() => generateReport('User Activity')}
            className="p-6 bg-cyber-dark/50 border border-cyber-magenta/30 rounded-lg hover:border-cyber-magenta hover:bg-cyber-navy/30 transition-colors text-left"
          >
            <Users className="h-8 w-8 text-cyber-magenta mb-3" />
            <h4 className="text-lg font-semibold text-cyber-gray-100 mb-2">User Activity</h4>
            <p className="text-cyber-gray-400 text-sm">Detailed user engagement and tool usage statistics</p>
          </button>
          
          <button
            onClick={() => generateReport('Tool Performance')}
            className="p-6 bg-cyber-dark/50 border border-cyber-green/30 rounded-lg hover:border-cyber-green hover:bg-cyber-navy/30 transition-colors text-left"
          >
            <Activity className="h-8 w-8 text-cyber-green mb-3" />
            <h4 className="text-lg font-semibold text-cyber-gray-100 mb-2">Tool Performance</h4>
            <p className="text-cyber-gray-400 text-sm">Performance metrics for all security tools</p>
          </button>
          
          <button
            onClick={() => generateReport('Threat Intelligence')}
            className="p-6 bg-cyber-dark/50 border border-cyber-red/30 rounded-lg hover:border-cyber-red hover:bg-cyber-navy/30 transition-colors text-left"
          >
            <AlertTriangle className="h-8 w-8 text-cyber-red mb-3" />
            <h4 className="text-lg font-semibold text-cyber-gray-100 mb-2">Threat Intelligence</h4>
            <p className="text-cyber-gray-400 text-sm">Analysis of detected threats and security incidents</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyber-cyan mb-2 font-mono">
            Admin Dashboard
          </h1>
          <p className="text-cyber-gray-300">
            Monitor system performance and manage ThreatLab operations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-cyber-navy/30 rounded-xl p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyber-cyan text-cyber-dark font-medium'
                  : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'tools' && (
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-cyber-cyan mb-6">Tool Analytics</h3>
            <p className="text-cyber-gray-300">Detailed tool usage analytics coming soon...</p>
          </div>
        )}
        {activeTab === 'files' && (
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-cyber-cyan mb-6">File Upload Logs</h3>
            <p className="text-cyber-gray-300">File upload monitoring and analysis coming soon...</p>
          </div>
        )}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};