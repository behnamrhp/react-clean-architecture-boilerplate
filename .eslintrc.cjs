module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
        alias: {
            map: [
              [
                "~", "./src",
              ]],
            extensions: [
							".js",
							".ts",
							".tsx", 
							".d.ts", 
							".json",
						]
        }
    }
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: [
		"react", 
		"@typescript-eslint", 
		"jest", 
		"prettier",
	],
  rules: {
    "object-curly-spacing": [
			"error", 
			"always",
		],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-extraneous-dependencies": [
			"error", 
			{ 
				"devDependencies": true ,
			},
		],
    "class-methods-use-this": "off",
    "import/no-import-module-exports": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-shadow": "error",
    "no-shadow": "off",
    "no-return-await": "off",
    "import/order": [
      "error",
      {
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "external"
          }
        ]
      }
    ],
    "prettier/prettier": [
      "error",
      {},
      {
        "usePrettierrc": true,
        "endOfLine": "auto"
      }
    ],
    "jest/valid-title": "off",
    "react/button-has-type": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-namespace": "off"
  }
}
