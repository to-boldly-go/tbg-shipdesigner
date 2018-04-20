module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "google",
        "plugin:vue/essential",
    ],
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
    },
    "rules": {
        // Disable some google rules we don't care about
        "camelcase": "off",
        "arrow-parens": "off",
        "max-len": "off",
        "require-jsdoc": "off",
        "object-curly-spacing": "off",

        // Disable some eslint:recommended rules we don't care about
        "no-console": "off",
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false,
            },
        ],
        "no-tabs": "off",

        // Custom rules and overrides (some might be redundant with google rules)
        "indent": [
            "error",
            "tab",
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true,
            },
        ],
        "semi": [
            "error",
            "always",
        ],
        "curly": [
            "error",
            "all",
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true,
            },
        ],
        "dot-location": [
            "error",
            "property",
        ],
        "eqeqeq": [
            "error",
            "always",
        ],
        "no-eval": "error",
        "no-multi-spaces": [
            "error",
            {
                "ignoreEOLComments": true,
                "exceptions": {
                    "Property": true
                },
            },
        ],
        "space-in-parens": [
            "error",
            "never",
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true,
            },
        ],
        "space-before-blocks": [
            "error",
            "always",
        ],
        "space-before-function-paren": [
            "error",
            "never",
        ],
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true,
            },
        ],
        "comma-style": [
            "error",
            "last",
        ],
        "func-call-spacing": [
            "error",
            "never",
        ],
        "block-spacing": [
            "error",
            "always",
        ],
        "computed-property-spacing": [
            "error",
            "never",
        ],
        "no-whitespace-before-property": "error",
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true,
            }
        ],
    },
};
