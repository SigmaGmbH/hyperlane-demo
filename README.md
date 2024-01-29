# Swisstronik <-> Anvil demo

## Structure
- cross-chain-solidity – Contains smart contracts for each network (Swisstronik Testnet and Anvil)
- src/public – Contains basic react web app to interact with contracts

We use already deployed contracts:
- 0x0f0292ef074294b2fD30066685Fea0cC71a42176 (Anvil chain)
- 0x2E6e4cf23BE1133d698EB1bCe54efc34Df014201 (Swisstronik chain)

[Contract](/cross-chain-solidity/swisstronik/contracts/Increase.sol) in Swisstronik chain contains counter functionality. After each increase of counter, it sends message to Hyperlane Mailbox contract to sync its state with Anvil contract

[Anvil contract](/cross-chain-solidity/anvil/contracts/Sync.sol) accepts incoming calls from Hyperlane Mailbox (deployed in Anvil chain) and updates its state

## Deploy

If you want to deploy your own contracts, do the following:

Install dependencies for Anvil:
```sh
cd cross-chain-solidity/anvil && npm install
```

Once dependencies are installed, create `.env` file by running:
```sh
cp .env.sample .env
```

In created file fill `DEPLOY_KEY` env var with key from funded account. After that you're ready to deploy contracts. To do it, use the following command:
```sh
npm run deploy
```
The command above will output address of deployed contract. It will be required in next steps.

Then you should deploy contracts to Swisstronik Testnet. At first, go to `/swisstronik` folder by using the following command:
```sh
cd ../swisstronik
```

Next, install required dependencies:
```sh
npm install
```

Update `const recipient = "0x0f0292ef074294b2fD30066685Fea0cC71a42176";` in [scripts/deploy.js](/cross-chain-solidity/swisstronik/scripts/deploy.js) with address of deployed Anvil contract

After successful installation, obtain some test coins from our [faucet](https://faucet.testnet.swisstronik.com/) to be able to deploy contracts to Swisstronik Testnet. Once you receive some test coins, deploy contract by running:
```sh
npm run deploy
```

## Run

To start dApp for interaction with Anvil and Swisstronik cross-chain contracts, at first you should install dependencies:
```sh
npm install
```

If you made changes in logic or added new functions to smart contracts, you should update [abi.js](/src/contracts/abi.js) and prepare functions to interact with your contracts.

Then you're ready to start web app by running:
```sh
npm run start
```