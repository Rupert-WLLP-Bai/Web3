# HelloWorld
2023年5月28日22:40:34

!!! 这个教程似乎已经过时了，需要更新

## 1. hardhat

1. 安装hardhat

```bash
npm install hardhat
```

2. 初始化hardhat

```bash
```bash
npx hardhat
```

3. 选择一个空的项目

```bash
? What do you want to do? …
  Create a sample project
❯ Create an empty hardhat.config.js
    Quit
```

4. 添加文件夹

```bash
mkdir contracts
mkdir scripts
```

- contracts/ 是保存我们的 hello world 智能合约代码文件的位置
- scripts/ 是我们存放脚本的位置，用于部署我们的合约和与之交互。

5. 创建合约

```bash
vim contracts/HelloWorld.sol
```

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// 一个合约是函数和数据（其状态）的集合。 Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // 状态变量是其值永久存储在合约存储中的变量。 The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // 构造器用于初始化合约的数据。 Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

6. 安装dotenv

```bash
npm install dotenv
```

.env文件的内容大致如下:
```bash
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

7. 安装 ETHERS.JS

```bash
npm install @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-etherscan
```

8. 配置hardhat.config.js

```javascript
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "mainnet",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

9. 编译合约

```bash
npx hardhat compile
```

10. 编写部署脚本

```bash
vim scripts/deploy.js
```

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

11. 部署合约

```bash
npx hardhat run scripts/deploy.js --network mainnet
```