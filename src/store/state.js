export default {
  // Dapp properties
  MetaMask: {
    isInstalled: true,
    isUnlocked: true,
    isOnCorrectNetwork: true,
  },

  // Network information
  network: {
    required: '', // network required by the dapp (set in functions.js)
    current: '', // network user is connected to
  },

  // Contract properties (require asynchronous calls)
  contract: {
    manager: '', // address of who deployed contract
    players: [], // list of entered addresses
    balance: '', // contract balance
  },
}
