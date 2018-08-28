module.exports = {
  root: true,
  extends: [
    "airbnb-base"
  ],
  env: {
    "browser": true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  globals: {
    "ENV": true,
    "window": true,
    "document": false
  },
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    },
    "html/html-extensions": [".html", ".vue"]
  },
  rules: {
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
    }],
    "function-paren-newline": [0],
    "no-tabs": [2],
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state", "item"] }],
    "global-require": "off",
    "no-restricted-globals": [0],
    "no-underscore-dangle": ["error", { "allow": ["_this"] }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "object-curly-spacing": ["error", "always"],
    "indent": [0],
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never",
    }],
    "quote-props": [0],
    "no-use-before-define": ["error", { "functions": false }],
    "no-restricted-syntax": [0],
    "no-script-url": [0],
    "no-nested-ternary": [0],
    "func-names": [0],
    "no-shadow": [0],
    "no-useless-escape": [0],
    "no-mixed-operators": [0],
    "class-methods-use-this": [0],
    "max-len": ["error", { "code": 150, "ignoreRegExpLiterals": true }],
    "no-bitwise": ["error", { "allow": ["~"] }],
    "import/no-extraneous-dependencies": [2, {"devDependencies": true}],
    "prefer-destructuring": [
      "error",
      { "array": false, "object": true },
      { "enforceForRenamedProperties": false }
    ]
  }
}
