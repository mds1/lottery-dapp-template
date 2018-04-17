const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledLottery = require('./build/Lottery.json')

// Set up provider for Rinkeby testnet
const provider = new HDWalletProvider(
  // this seed is a dummy seed which holds no real Ether
  // replace this with the appropriate seed
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat',
  // replace this with your own infura address
  'https://rinkeby.infura.io/ExTa98BYpyL3Smnegw8u'
)

// Create web3 instance
const web3 = new Web3(provider)

// Create function to enable us to use async/await
const deploy = async() => {
  // Get list of accounts from seed phrase above
  const accounts = await web3.eth.getAccounts()

  // Display status of deployment
  console.log('Deploying contract from account', accounts[0])

  // Create instance of contract, deploy it, and send it
  const result = await new web3.eth.Contract(JSON.parse(compiledLottery.interface))
    .deploy({
      data: compiledLottery.bytecode,
      // arguments: ['Hi!']
    })
    .send({
      from: accounts[0],
      gas: '1000000',
    })

  // Get address of where contract was deployed to
  console.log('Contract deployed to', result.options.address)
}

// Call deploy function
deploy()
