/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/ban-types": ["warn"],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/attribute-hyphenation": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        endOfLine: "auto",
        bracketSameLine: true,
      },
    ],
  },
};
