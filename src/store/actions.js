import web3 from '@ethereum/web3'
import lottery from '@ethereum/lotteryInstance.js'

export default {
  // use actions to commit mutations and execute asynchronous tasks
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
