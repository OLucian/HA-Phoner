module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript/base", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  settings: {
    'import/extensions': [".js", ".ts"],
    'import/parsers': {
      '@typescript-eslint/parser': [".ts"]
    },
    'import/resolver': {
      'node': { 'extensions': [".js", ".ts"] }
    }
  },
  rules: {
    "no-throw-literal": "off",
    "no-shadow": "warn",
    "no-continue": "off",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
    "max-len": "off",
    "no-await-in-loop": "off",
    "object-curly-newline": "off",
    // "@typescript-eslint/explicit-member-accessibility": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/camelcase": "o
    "brace-style": "off",
    "@typescript-eslint/brace-style": "off",
    // "@typescript-eslint/array-type": "off",
    // "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
  }
};
