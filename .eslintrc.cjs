/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
  },
  extends: ["plugin:vue/strongly-recommended", "eslint:recommended", "@vue/typescript/recommended", "prettier"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    // not needed for vue 3
    "vue/no-multiple-template-root": "off",

    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
  },
}
