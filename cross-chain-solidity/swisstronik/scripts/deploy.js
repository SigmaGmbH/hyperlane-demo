// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const mailbox = "0x3Bae6367518d5cAb93EEa61f93D737FE6e546783";
  const recipient = "0x0f0292ef074294b2fD30066685Fea0cC71a42176";
  const Registry = await hre.ethers.getContractFactory("Increase");
  const registry = await Registry.deploy(mailbox, recipient);

  await registry.deployed();

  console.log(
    `deployed to ${registry.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
