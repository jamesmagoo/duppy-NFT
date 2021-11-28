const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const nftContractFactory = await hre.ethers.getContractFactory('Duppy');
  // note argument sets totalSupply initiated in contract constructor
  const nftContract = await nftContractFactory.deploy(100);
  await nftContract.deployed();
  console.log('DuppyNFT deployed to:', nftContract.address);

  // Call the function.
  let txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
  console.log('Minted NFT #1');

  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
  console.log('Minted NFT #2');
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
