const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				pixel: ['Silkscreen', ...defaultTheme.fontFamily.sans],
				modak: ['Modak', ...defaultTheme.fontFamily.sans],
				quick: ['Quicksand', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
