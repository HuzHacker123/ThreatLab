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
        'float-3d': 'float3d 8s ease-in-out infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        'sheen': 'sheen 2.8s linear infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px #00FFFF' },
          '100%': { boxShadow: '0 0 30px #00FFFF, 0 0 40px #00FFFF' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        float3d: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotateX(0deg)' },
          '50%': { transform: 'translate3d(0, -14px, 40px) rotateX(6deg)' }
        },
        tilt: {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'rotateX(2deg) rotateY(-2deg)' },
          '50%': { transform: 'rotateX(-1deg) rotateY(3deg)' },
          '75%': { transform: 'rotateX(1.5deg) rotateY(-1deg)' }
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '55%, 100%': { transform: 'translateX(220%) skewX(-20deg)' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(1.3)', opacity: '0' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
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