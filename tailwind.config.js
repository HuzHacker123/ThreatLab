/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0F1419',
          navy: '#1A1F2E',
          blue: '#2A3441',
          cyan: '#00FFFF',
          magenta: '#FF00D0',
          purple: '#8A2BE2',
          green: '#39FF14',
          red: '#FF0040',
          gray: {
            100: '#F8FAFC',
            200: '#E2E8F0',
            300: '#CBD5E0',
            400: '#A0AEC0',
            500: '#718096',
            600: '#4A5568',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
          }
        }
      },
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px #00FFFF' },
          '100%': { boxShadow: '0 0 30px #00FFFF, 0 0 40px #00FFFF' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(135deg, #0F1419 0%, #1A1F2E 50%, #2A3441 100%)',
      },
      backgroundSize: {
        'cyber-grid': '50px 50px',
      }
    },
  },
  plugins: [],
};