import Web3 from 'web3'
let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Code is running in the browser *AND* MetaMask is running
  // get the current provider from MetaMask's web3 instance
  web3 = new Web3(window.web3.currentProvider)
}
else {
  // Code is running on the server *OR* the user is not running MetaMask
  // set up our own provider to connect to network through Infura
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/ExTa98BYpyL3Smnegw8u'
  )
  web3 = new Web3(provider)
}

// export the web3 instance
export default web3
