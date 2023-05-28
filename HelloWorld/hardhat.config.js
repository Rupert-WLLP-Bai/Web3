require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.8.18",
   defaultNetwork: "mainnet",
   networks: {
      hardhat: {},
      mainnet: {
          url: API_URL,
          accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}