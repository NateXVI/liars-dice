const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				pixel: ['Silkscreen', ...defaultTheme.fontFamily.sans],
				modak: ['Modak', ...defaultTheme.fontFamily.sans],
				quick: ['Quicksand', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#0081c9',
					secondary: '#345b63',
					accent: '#ffc93c',
					neutral: '#152d35',
					'base-100': '#d4ecdd',
					info: '#8dcaC1',
					success: '#9db787',
					warning: '#ffd25F',
					error: '#a34732'
				}
			}
		]
	},

	plugins: [require('daisyui')]
};

module.exports = config;
