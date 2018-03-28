export default {
  // Dapp properties
  MetaMask: {
    isInstalled: true,
    isUnlocked: true,
    isOnCorrectNetwork: true
  },

  network: {
    required: '',
    current: '',
  },

  // Contract properties (require asynchronous calls)
  contract: {
    manager: '', // address of who deployed contract
    players: [], // list of entered addresses
    balance: '', // contract balance
  }
}
