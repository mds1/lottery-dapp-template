const HDWalletProvider = require('truffle-hdwallet-provider')

// *REPLACE* the Infura API key and mnemonic phrase with your own
// mnemonic phrase for existing MetaMask account is in Settings -> Reveal Seed Words
const infuraAPIKey = 'ExTa98BYpyL3Smnegw8u'
const mnemonic = 'spend nephew bird brown rude kitten spice scale satisfy cruise mobile excess'

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
      provider: new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraAPIKey}`),
    },
    rinkeby: {
      host: '127.0.0.1', // localhost
      port: 8545,
      network_id: 4,
      provider: new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${infuraAPIKey}`),
    },
  },
}
