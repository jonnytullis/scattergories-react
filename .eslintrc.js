module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "error",
    "indent": [ "warn", 2 ],
    "object-curly-spacing": [ "warn", "always" ],
    "array-bracket-spacing": [ "warn", "always" ],
    "func-call-spacing": [ "warn", "never" ]
  }
};
