import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import pluginJest from "eslint-plugin-jest";

export default [
	js.configs.recommended,
	{
		files: ["src/**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: globals.browser,
		},
		plugins: {
			prettier: prettierConfig,
		},
		rules: {
			...prettierConfig.rules,
		},
	},
	{
		files: ["tests/**/*.js", "src/**/*.test.js", "src/**/*.spec.js"],
		plugins: {
			jest: pluginJest,
		},
		env: {
			"jest/globals": true,
		},
		extends: ["plugin:jest/recommended"],
		rules: {
			...pluginJest.configs.recommended.rules,
		},
	},
];
