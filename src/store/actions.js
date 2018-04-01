import web3 from '@ethereum/web3'
import lottery from '@ethereum/lotteryInstance.js'
import * as functions from '@common/functions.js'

export default {

  // ======================================================================
  //                          MetaMask Checks
  // ======================================================================

  set_isMetaMaskInstalled(context) {
    // Ensure MetaMask/web3 is installed
    let isMetaMaskInstalled = false
    // check for injected web3
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      isMetaMaskInstalled = true
    }
    // commit state mutation
    context.commit('SET_IS_METAMASK_INSTALLED', isMetaMaskInstalled)
  },

  async set_isMetaMaskUnlocked(context) {
    // Ensure MetaMask/web3 is unlocked/available
    let isMetaMaskUnlocked = false
    // check list of accounts
    const accounts = await web3.eth.getAccounts()
    if (accounts[0] !== undefined) {
      isMetaMaskUnlocked = true
    }
    // commit state mutation
    context.commit('SET_IS_METAMASK_UNLOCKED', isMetaMaskUnlocked)
  },

  async set_isMetaMaskOnCorrectNetwork(context) {
    // Ensure MetaMask is on the network required by the dapp
    let isMetaMaskOnCorrectNetwork = false
    // get required and current networks
    const requiredNetwork = functions.requiredNetwork()
    const currentNetwork = await functions.currentNetwork()
    if (requiredNetwork.toUpperCase() === currentNetwork.toUpperCase()) {
      isMetaMaskOnCorrectNetwork = true
    }
    // commit state mutation
    context.commit('SET_IS_METAMASK_ON_CORRECT_NETWORK', isMetaMaskOnCorrectNetwork)

  },

  // ======================================================================
  //                             Network Checks
  // ======================================================================

  set_requiredNetwork(context) {
    const requiredNetwork = functions.requiredNetwork()
    context.commit('SET_REQUIRED_NETWORK', requiredNetwork)
  },

  async set_currentNetwork(context) {
    const currentNetwork = await functions.currentNetwork()
    context.commit('SET_CURRENT_NETWORK', currentNetwork)
  },

  // ======================================================================
  //                      Getting Contract Properties
  // ======================================================================

  async setManager(context) {
    // get manager
    const manager = await lottery.methods.manager().call()
    // commit state mutation
    context.commit('SET_MANAGER', manager)
  },

  async setPlayers(context) {
    // get list of platers
    const players = await lottery.methods.getPlayers().call()
    // commit state mutation
    context.commit('SET_PLAYERS', players)
  },

  async setBalance(context) {
    // get list of platers
    const balance = await web3.eth.getBalance(lottery.options.address)
    // commit state mutation
    context.commit('SET_BALANCE', web3.utils.fromWei(balance, 'ether'))
  },
}
