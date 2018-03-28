export default {

  // ======================================================================
  //                          MetaMask Checks
  // ======================================================================

  SET_IS_METAMASK_INSTALLED(state, isMetaMaskInstalled) {
    state.MetaMask.isInstalled = isMetaMaskInstalled
  },

  SET_IS_METAMASK_UNLOCKED(state, isMetaMaskUnlocked) {
    state.MetaMask.isUnlocked = isMetaMaskUnlocked
  },

  SET_IS_METAMASK_ON_CORRECT_NETWORK(state, isMetaMaskOnCorrectNetwork) {
    state.MetaMask.isOnCorrectNetwork = isMetaMaskOnCorrectNetwork
  },

  // ======================================================================
  //                             Network Checks
  // ======================================================================

  SET_REQUIRED_NETWORK(state, network) {
    state.network.required = network
  },

  SET_CURRENT_NETWORK(state, network) {
    state.network.current = network
  },

  // ======================================================================
  //                      Getting Contract Properties
  // ======================================================================

  SET_MANAGER(state, address) {
    state.contract.manager = address
  },

  SET_PLAYERS(state, players) {
    state.contract.players = players
  },

  SET_BALANCE(state, balance) {
    state.contract.balance = balance
  },
}
