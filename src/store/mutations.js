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
}
