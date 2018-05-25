// *REPLACE* -- Ok, not really a replace. Create file called config.js like the sample below
// This file should contain the Infura API key, mnemonic phrase, and any other API keys needed
// Note: mnemonic phrase for existing MetaMask account is in Settings -> Reveal Seed Words

/* BEGIN Sample config.js file:
----------------------------------------------------------------------------------------------
const constants = {
  INFURA_API_KEY: 'PasteYourKeyHere',
  mnemonic: 'Paste your seed phrase here',
}

module.exports = constants
----------------------------------------------------------------------------------------------
END Sample config.js file: */

// Import keys and mnemonic
const constants = require('../../../config')
const mnemonic = constants.mnemonic
const INFURA_API_KEY = constants.INFURA_API_KEY

const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1', // localhost
      port: 8545,
      network_id: '*', // match any network id
    },
    ropsten: {
      host: '127.0.0.1', // localhost
      port: 8545,
      network_id: 3,
      provider: new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${INFURA_API_KEY}`),
    },
    rinkeby: {
      host: '127.0.0.1', // localhost
      port: 8545,
      network_id: 4,
      provider: new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${INFURA_API_KEY}`),
    },
  },
}
