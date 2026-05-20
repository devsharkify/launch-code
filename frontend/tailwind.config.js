/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'sans': ['"Inter"', 'system-ui', 'sans-serif'],
  			'mono': ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
  			'display': ['"Inter"', 'system-ui', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Launch Code brand palette
  			brand: {
  				DEFAULT: '#7c3aed',
  				dark: '#6d28d9',
  				light: '#ede9fe',
  				glow: 'rgba(124,58,237,0.25)',
  			},
  			cyber: {
  				DEFAULT: '#06b6d4',
  				dark: '#0891b2',
  				light: '#cffafe',
  			},
  			surface: {
  				DEFAULT: '#111111',
  				elevated: '#1a1a1a',
  				border: '#262626',
  			},
  			ink: {
  				DEFAULT: '#f0f0f0',
  				muted: '#737373',
  				subtle: '#404040',
  			},
  			// legacy aliases so existing components don't break
  			mint: {
  				DEFAULT: '#7c3aed',
  				dark: '#6d28d9',
  				light: '#ede9fe',
  			},
  			saffron: {
  				DEFAULT: '#06b6d4',
  				dark: '#0891b2',
  			},
  			paper: '#111111',
  		},
  		boxShadow: {
  			'brand': '0 0 20px rgba(124,58,237,0.3)',
  			'brand-sm': '0 0 10px rgba(124,58,237,0.2)',
  			'cyber': '0 0 20px rgba(6,182,212,0.3)',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'marquee': {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(-50%)' }
  			},
  			'pulse-brand': {
  				'0%, 100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0.3)' },
  				'50%': { boxShadow: '0 0 0 8px rgba(124,58,237,0)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'marquee': 'marquee 35s linear infinite',
  			'pulse-brand': 'pulse-brand 2s infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
