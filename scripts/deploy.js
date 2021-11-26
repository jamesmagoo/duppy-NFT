const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const nftContractFactory = await hre.ethers.getContractFactory('Duppy');
  const nftContract = await nftContractFactory.deploy();
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

  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();

  console.log('Minted NFT #3');
  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();

  console.log('Minted NFT #4');
  txn = await nftContract.makeAnEpicNFT();
  // Wait for it to be mined.
  await txn.wait();
  console.log('Minted NFT #5');
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
