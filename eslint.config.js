import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
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
];
