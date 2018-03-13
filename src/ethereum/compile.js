const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

// Delete contens of build folder
const buildpath = path.resolve(__dirname, 'build')
fs.removeSync(buildpath)

// Recreate an empty build folder
fs.ensureDirSync(buildpath)

// Read in and compile Solidity contract -- replace ContractName.sol with your contract name
const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(contractPath, 'utf8')
const output = solc.compile(source, 1).contracts

// Take each contract in output and write it to a file in build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildpath, contract.replace(':', '') + '.json'),
    output[contract]
  )
}
