import React, { useState } from 'react';
import { Database, Play, AlertTriangle, Shield, Code, Eye, Info, CheckCircle } from 'lucide-react';

export const SQLInjectionDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [showQuery, setShowQuery] = useState(false);

  const steps = [
    {
      title: 'Normal Login Attempt',
      description: 'First, let\'s see how a normal login works',
      placeholder: 'admin',
      expectedInput: 'admin',
      sqlQuery: "SELECT * FROM users WHERE username = 'admin' AND password = 'password'",
      result: { success: true, user: { id: 1, username: 'admin', role: 'administrator' } },
      explanation: 'This is a normal login query. The application checks if the username and password match a record in the database.'
    },
    {
      title: 'SQL Injection - Basic',
      description: 'Now try entering: admin\' OR \'1\'=\'1',
      placeholder: 'admin\' OR \'1\'=\'1',
      expectedInput: 'admin\' OR \'1\'=\'1',
      sqlQuery: "SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = 'password'",
      result: { success: true, user: { id: 1, username: 'admin', role: 'administrator' }, vulnerability: true },
      explanation: 'The malicious input breaks out of the username string and adds a condition that\'s always true (1=1), bypassing authentication.'
    },
    {
      title: 'SQL Injection - Union Attack',
      description: 'Try: admin\' UNION SELECT 1,2,3--',
      placeholder: 'admin\' UNION SELECT 1,2,3--',
      expectedInput: 'admin\' UNION SELECT 1,2,3--',
      sqlQuery: "SELECT * FROM users WHERE username = 'admin' UNION SELECT 1,2,3-- AND password = 'password'",
      result: { success: true, data: [{ id: 1, username: 'admin', role: 'administrator' }, { id: 1, username: 2, role: 3 }], vulnerability: true },
      explanation: 'UNION attacks allow attackers to retrieve data from other tables. The -- comment syntax ignores the password check.'
    },
    {
      title: 'Data Extraction',
      description: 'Extract sensitive data: admin\' UNION SELECT id,username,password FROM users--',
      placeholder: 'admin\' UNION SELECT id,username,password FROM users--',
      expectedInput: 'admin\' UNION SELECT id,username,password FROM users--',
      sqlQuery: "SELECT * FROM users WHERE username = 'admin' UNION SELECT id,username,password FROM users-- AND password = 'password'",
      result: { 
        success: true, 
        data: [
          { id: 1, username: 'admin', password: 'hash123...' },
          { id: 2, username: 'user1', password: 'hash456...' },
          { id: 3, username: 'guest', password: 'hash789...' }
        ],
        vulnerability: true 
      },
      explanation: 'This attack extracts all usernames and password hashes from the users table, exposing sensitive information.'
    },
    {
      title: 'Prevention - Parameterized Queries',
      description: 'See how parameterized queries prevent injection',
      placeholder: 'admin\' OR \'1\'=\'1',
      expectedInput: 'admin\' OR \'1\'=\'1',
      sqlQuery: "SELECT * FROM users WHERE username = ? AND password = ?",
      result: { success: false, message: 'User not found' },
      explanation: 'Parameterized queries treat user input as data, not executable code. The malicious input is safely handled as a literal string.'
    }
  ];

  const sampleDatabase = {
    users: [
      { id: 1, username: 'admin', password: 'hash123...', role: 'administrator', email: 'admin@bank.com' },
      { id: 2, username: 'user1', password: 'hash456...', role: 'user', email: 'user1@email.com' },
      { id: 3, username: 'guest', password: 'hash789...', role: 'guest', email: 'guest@email.com' }
    ],
    accounts: [
      { id: 1, user_id: 1, account_number: '1234567890', balance: 50000 },
      { id: 2, user_id: 2, account_number: '0987654321', balance: 25000 }
    ]
  };

  const handleExecuteQuery = () => {
    const step = steps[currentStep];
    setQueryResult(step.result);
    setShowQuery(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserInput('');
      setQueryResult(null);
      setShowQuery(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setUserInput('');
    setQueryResult(null);
    setShowQuery(false);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-cyber-cyan/10 rounded-full mb-6">
            <Database className="h-12 w-12 text-cyber-cyan" />
          </div>
          <h1 className="text-4xl font-bold text-cyber-cyan mb-4 font-mono">
            SQL Injection Demo
          </h1>
          <p className="text-xl text-cyber-gray-300 max-w-3xl mx-auto">
            Interactive walkthrough of SQL injection vulnerabilities using a simulated bank login system. 
            Learn how these attacks work and how to prevent them.
          </p>
        </div>

        {/* Educational Warning */}
        <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-cyber-red flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-cyber-red mb-3">
                Educational Demo Environment
              </h3>
              <p className="text-cyber-gray-200 mb-4">
                This is a completely isolated demonstration using a fake bank login system. 
                No real databases or systems are affected. This environment is designed to teach 
                SQL injection concepts safely.
              </p>
              <div className="bg-cyber-dark/50 rounded-lg p-3">
                <p className="text-cyber-gray-300 text-sm">
                  <strong>Important:</strong> SQL injection is illegal when performed against systems 
                  you don't own. This knowledge should only be used for legitimate security testing 
                  with proper authorization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-cyber-navy/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-cyber-cyan">Demo Progress</h3>
            <span className="text-cyber-gray-400 text-sm">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index <= currentStep ? 'bg-cyber-cyan' : 'bg-cyber-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Interface */}
          <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-cyber-cyan mb-6">
              Vulnerable Bank Login System
            </h2>

            {/* Current Step Info */}
            <div className="bg-cyber-dark/50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-cyber-green mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-cyber-gray-300 text-sm">
                {currentStepData.description}
              </p>
            </div>

            {/* Mock Bank Login Form */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-blue-600">SecureBank Login</h3>
                <p className="text-gray-600 text-sm">Access your account securely</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 font-mono text-blue-600"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value="password"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Fixed as 'password' for demo</p>
                </div>

                <button
                  onClick={handleExecuteQuery}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>

            {/* Quick Input Button */}
            {currentStepData.expectedInput && (
              <button
                onClick={() => setUserInput(currentStepData.expectedInput)}
                className="w-full mb-4 px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-cyber-dark transition-colors text-sm"
              >
                Use Example Input: {currentStepData.expectedInput}
              </button>
            )}

            {/* Navigation */}
            <div className="flex space-x-4">
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 px-6 py-3 bg-cyber-green text-cyber-dark font-medium rounded-lg hover:bg-cyber-green/90 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={resetDemo}
                  className="flex-1 px-6 py-3 bg-cyber-magenta text-cyber-dark font-medium rounded-lg hover:bg-cyber-magenta/90 transition-colors"
                >
                  Restart Demo
                </button>
              )}
            </div>
          </div>

          {/* Results & Analysis */}
          <div className="space-y-8">
            {/* SQL Query Display */}
            {showQuery && (
              <div className="bg-cyber-navy/40 border border-cyber-red/20 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyber-red flex items-center space-x-2">
                    <Code className="h-6 w-6" />
                    <span>Generated SQL Query</span>
                  </h3>
                  {queryResult?.vulnerability && (
                    <span className="px-2 py-1 bg-cyber-red/20 text-cyber-red text-xs rounded font-medium">
                      VULNERABLE
                    </span>
                  )}
                </div>
                <div className="bg-cyber-dark rounded-lg p-4 mb-4">
                  <code className="text-cyber-gray-100 font-mono text-sm">
                    {currentStepData.sqlQuery}
                  </code>
                </div>
                <p className="text-cyber-gray-300 text-sm">
                  {currentStepData.explanation}
                </p>
              </div>
            )}

            {/* Query Results */}
            {queryResult && (
              <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
                  <Eye className="h-6 w-6" />
                  <span>Query Results</span>
                </h3>
                
                {queryResult.success === false ? (
                  <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-cyber-green" />
                      <span className="text-cyber-green font-medium">Secure</span>
                    </div>
                    <p className="text-cyber-gray-300 text-sm">{queryResult.message}</p>
                  </div>
                ) : (
                  <div className={`rounded-lg p-4 ${
                    queryResult.vulnerability 
                      ? 'bg-cyber-red/10 border border-cyber-red/30' 
                      : 'bg-cyber-green/10 border border-cyber-green/30'
                  }`}>
                    <div className="flex items-center space-x-2 mb-4">
                      {queryResult.vulnerability ? (
                        <AlertTriangle className="h-5 w-5 text-cyber-red" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-cyber-green" />
                      )}
                      <span className={`font-medium ${
                        queryResult.vulnerability ? 'text-cyber-red' : 'text-cyber-green'
                      }`}>
                        {queryResult.vulnerability ? 'Injection Successful!' : 'Normal Login'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {queryResult.user && (
                        <div className="bg-cyber-dark/50 rounded p-3">
                          <p className="text-cyber-gray-300 text-sm mb-1">User Data:</p>
                          <code className="text-cyber-gray-100 text-xs">
                            {JSON.stringify(queryResult.user, null, 2)}
                          </code>
                        </div>
                      )}
                      
                      {queryResult.data && (
                        <div className="bg-cyber-dark/50 rounded p-3">
                          <p className="text-cyber-gray-300 text-sm mb-1">Extracted Data:</p>
                          <code className="text-cyber-gray-100 text-xs">
                            {JSON.stringify(queryResult.data, null, 2)}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Database Schema */}
            <div className="bg-cyber-navy/40 border border-cyber-cyan/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-cyber-cyan mb-4 flex items-center space-x-2">
                <Database className="h-6 w-6" />
                <span>Database Schema</span>
              </h3>
              <div className="space-y-4">
                <div className="bg-cyber-dark/50 rounded-lg p-4 overflow-x-auto">
                  <h4 className="text-cyber-green font-medium mb-2">users table</h4>
                  <div className="text-xs font-mono text-cyber-gray-300 space-y-1">
                    {sampleDatabase.users.map((user, index) => (
                      <div key={index}>
                        {JSON.stringify(user)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-cyber-dark/50 rounded-lg p-4">
                  <h4 className="text-cyber-green font-medium mb-2">accounts table</h4>
                  <div className="text-xs font-mono text-cyber-gray-300 space-y-1">
                    {sampleDatabase.accounts.map((account, index) => (
                      <div key={index}>
                        {JSON.stringify(account)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prevention Techniques */}
        <div className="mt-12 bg-cyber-navy/30 border border-cyber-green/20 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-cyber-green mb-6">
            SQL Injection Prevention
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-green/10 rounded-lg mb-4">
                <Shield className="h-8 w-8 text-cyber-green" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-green mb-3">Parameterized Queries</h3>
              <p className="text-cyber-gray-300 text-sm">
                Use prepared statements that separate code from data, preventing injection attacks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-cyan/10 rounded-lg mb-4">
                <CheckCircle className="h-8 w-8 text-cyber-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-cyan mb-3">Input Validation</h3>
              <p className="text-cyber-gray-300 text-sm">
                Validate and sanitize all user inputs before processing them in SQL queries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-purple/10 rounded-lg mb-4">
                <Database className="h-8 w-8 text-cyber-purple" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-purple mb-3">Least Privilege</h3>
              <p className="text-cyber-gray-300 text-sm">
                Limit database user permissions to only what's necessary for the application.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-cyber-magenta/10 rounded-lg mb-4">
                <Info className="h-8 w-8 text-cyber-magenta" />
              </div>
              <h3 className="text-lg font-semibold text-cyber-magenta mb-3">Error Handling</h3>
              <p className="text-cyber-gray-300 text-sm">
                Don't expose detailed database errors that could reveal schema information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};