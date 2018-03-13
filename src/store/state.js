export default {
  // contract properties (require asynchronous calls)
  manager: '', // address of who deployed contract
  players: [], // list of entered addresses
  balance: '', // contract balance

  transactionObject: {
    from: '',
    to: null,
    value: null,
    gas: '',
    gasPrice: '',
    data: '',
    nonce: ''
  }
}
