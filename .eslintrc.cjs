const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:jsx-a11y/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:typescript-sort-keys/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "next",
        "next/core-web-vitals",
        "plugin:@next/next/recommended",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@next/next",
    "@typescript-eslint",
    "import",
    "prettier",
    "react",
    "simple-import-sort",
    "sort-keys-fix",
    "typescript-sort-keys",
    "unused-imports",
    "check-file",
    "no-relative-import-paths",
  ],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "react/jsx-curly-newline": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-shadow": [
      "error",
      {
        ignoreFunctionTypeParameterNameValueShadow: false,
        ignoreTypeValueShadow: false,
      },
    ],
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/require-await": "error",
    curly: "error",
    "dot-notation": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never" },
    ],
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-console": ["error", { allow: ["info", "error"] }],
    "no-constant-binary-expression": "error",
    "no-new-wrappers": "error",
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "no-shadow": ["error", { hoist: "all" }],
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unsafe-optional-chaining": "error",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/hook-use-state": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-no-bind": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-sort-props": [
      "error",
      {
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/require-default-props": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/require-optimization": "error",
    "unused-imports/no-unused-imports": "error",
    "no-use-before-define": "off",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "check-file/no-index": "off", // Tillåt index.{ts,tsx, js, jsx} filer
    "check-file/filename-blocklist": [
      "error",
      {
        "**/*type.{js,ts}": "*types.{js,ts}", // Type files should be named types and not type
        "**/types.{js,ts}": "*types.{js,ts}", // Type files can not be named types
      },
    ],
    "check-file/folder-match-with-fex": [
      "error",
      {
        "*types.{js,ts}": "**/src/types/**", // All type files should be in src/types folder
        "use[A-Z]*.{js,ts}": "**/src/hooks/**", // All hooks files (need to start with use according to other rule) should be in src/hooks folder
      },
    ],
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/src/!(hooks|pages)/**/*.{js,ts,jsx,tsx}": "KEBAB_CASE", // All files in src except inside hooks and pages folder should be KEBAB_CASE
        "**/src/hooks/**/use*.{js,ts}": "CAMEL_CASE", // All hooks should start with use
        "**/src/pages/**/!(_document|_app|[[a-z]*])*.{ts,tsx}": "KEBAB_CASE", // All files inside of pages should be KEBAB_CASE excluding  _app, _documents and files with hard brakets around
        "**/(public|prisma)/**/*": "KEBAB_CASE", // Files in public and
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "**/src/app/**/": "NEXT_JS_APP_ROUTER_CASE",
        "!(.github|.next|.vscode|node_modules|src/app)/**/": "KEBAB_CASE", // All folders should be KEBAB_CASE
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: "src", prefix: "~" },
    ],
  },
};

module.exports = config;
