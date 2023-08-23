///<reference types="cypress" />
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.renderforest.com',
    testIsolation: true
  },
})