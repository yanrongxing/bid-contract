import { ethers } from "hardhat"
import * as ManaConfig from 'decentraland-mana/build/contracts/MANAToken.json'

import {
  MANA_BYTECODE
} from './utils'


enum NETWORKS {
  'MUMBAI' = 'MUMBAI',
  'MATIC' = 'MATIC',
  'GOERLI' = 'GOERLI',
  'LOCALHOST' = 'LOCALHOST',
  'BSC_TESTNET' = 'BSC_TESTNET',
}

enum MANA {
  'MUMBAI' = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  'MATIC' = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  'GOERLI' = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  'LOCALHOST' = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  'BSC_TESTNET' = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
}

const FEES_COLLECTOR_CUT_PER_MILLION = 0
const ROYALTIES_CUT_PER_MILLION = 25000


/**
 * @dev Steps:
 * Deploy the Bid
 */
async function main() {
  const owner = process.env['OWNER']
  const feeCollector = process.env['FEE_COLLECTOR']
  const royaltiesManager = process.env['ROYALTIES_MANAGER']

  const network = NETWORKS[(process.env['NETWORK'] || 'LOCALHOST') as NETWORKS]
  if (!network) {
    throw ('Invalid network')
  }

  // Deploy collection marketplace
  let acceptedToken: string = MANA[network]

  // if (network === 'LOCALHOST') {
  //   const Mana = new ethers.ContractFactory(ManaConfig.abi, MANA_BYTECODE, ethers.provider.getSigner())
  //   const mana = await Mana.deploy()
  //   acceptedToken = mana.address
  // }

  const BidContract = await ethers.getContractFactory("ERC721Bid")
  const bidContract = await BidContract.deploy(
    owner,
    feeCollector,
    acceptedToken,
    royaltiesManager,
    FEES_COLLECTOR_CUT_PER_MILLION,
    ROYALTIES_CUT_PER_MILLION
  )

  console.log('Bid Contract:', bidContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })