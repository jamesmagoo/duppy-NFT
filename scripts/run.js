const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('Duppy');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log('Contract deployed to:', nftContract.address);


  try {

    const checkNoTxn = await nftContract.getMintedAmount();
  
    // Call the function.
    let txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();

    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();

    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();

    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();
    
    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();
    
  } catch (error) {
    console.log(error);
    console.log("--------------------\n");
    const checkNoTxn = await nftContract.getMintedAmount();
  }

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
