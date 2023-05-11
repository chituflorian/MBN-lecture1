const { ethers } = require("ethers");

async function main() {
  const tombola = await ethers.getContractFactory("tombola");

  // Start deployment, returning a promise that resolves to a contract object
  const tombolaMessage = await tombola.deploy("contract deployed!");
  console.log("Contract deployed to address:", tombolaMessage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
