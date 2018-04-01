module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/strongly-recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'prettier',
    // 'plugin:prettier/recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'prettier'
  ],
  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true
  },
  // add your custom rules here
  'rules': {

    // allow async-await
    'generator-star-spacing': 'off',

    // allow paren-less arrow functions
    'arrow-parens': 0,
    'one-var': 0,

    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // above rules were defaults -- added ones are below
    // "prettier/prettier": [
    //   "error",
    //   {
    //     'trailingComma': 'es5',
    //     'singleQuote': true,
    //     'semi': false,
    //     'printWidth': 120,
    //   }
    // ],
    "comma-dangle": ["error", "always-multiline"],
    "quotes": ["error", "single"],
    "padded-blocks": 0,
    'no-var': 2,
    'no-unused-vars': 2,
    'getter-return': 2,
    'no-await-in-loop': 2,
    'no-unreachable': 2,
    'no-extra-semi': 2,
    'semi': ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    'vue/no-unused-vars': 'error',
    "vue/max-attributes-per-line": [2, {
    "singleline": 8,
    "multiline": {
      "max": 1,
      "allowFirstLine": false
    }
  }]
  }
}
