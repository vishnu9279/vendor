module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh","require-path-exists",
  "sort-keys-fix"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  //   "linebreak-style": [
  //     "error",
  //     "unix"
  // ],
  "no-multiple-empty-lines": ["error", {
    "max": 1,
    "maxEOF": 1,
    "maxBOF": 0
}],
  },
};
