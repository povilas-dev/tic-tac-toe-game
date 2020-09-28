module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      '\\.st\\.css?$': require.resolve('@stylable/jest'),
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(.*?\\.st\\.css$))', // libraries publish .st.css files in their dist
    ],
    "moduleNameMapper": {
      "\\.(less|scss)$": "identity-obj-proxy"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }