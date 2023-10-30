module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	pluginSearchDirs: false,
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	svelteStrictMode: true
};
