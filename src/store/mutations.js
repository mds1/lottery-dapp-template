export default {
  // mutations corresponding to asynchronous tasks

  SET_MANAGER(state, address) {
    state.manager = address
  },

  SET_PLAYERS(state, players) {
    state.players = players
  },

  SET_BALANCE(state, balance) {
    state.balance = balance
  },

  // form mutations
  SET_TO_ADDRESS(state, address) {
    state.transactionObject.to = address
  },

  SET_VALUE(state, value) {
    state.transactionObject.value = value
  }
}