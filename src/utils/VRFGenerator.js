const { ethers, BigNumber } = require("ethers");
const VrfConsumerContract = "0x1c1441b5b752ccf556dd641755fdd53a8fe07551";
const abi = require("./VrfAbi.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/mtNCn_26X7xDMildwPp4xDaJBXr25Fqg"
);
// const provider = new ethers.providers.Web3Provider(window.ethereum);
const Private_key =
  "7de424d2a6f25d077817f8d45b6bfe5698481abc5d71a26072a361c9dd5255d6";
const wallet = new ethers.Wallet(Private_key, provider);
// const signer = provider.getSigner();
// const contract = new ethers.Contract(VrfConsumerContract, abi, provider);
// const contractSigner = contract.connect(wallet);
export const GetRandomNumber = async () => {
  try {
    const contract = new ethers.Contract(VrfConsumerContract, abi, provider);
    const contractSigner = contract.connect(wallet);
    const tx = await contractSigner.requestRandomWords({ gasLimit: 300000 });
    const _lastRequestId = await contract.lastRequestId();
    await tx.wait(10);
    const _randnumber = await contract.getRequestStatus(_lastRequestId);
    const rand = _randnumber[1].toString();
    return rand;
    // console.log(_randnumber[1]);
    // console.log(rand);
    // let timeTaken = Date.now() - start;
    // console.log("Total time taken : " + timeTaken + " milliseconds");
  } catch (err) {
    console.log(err);
    return 0;
  }
};
// let start = Date.now();
// GetRandomNumber()
//   .then()
//   .catch((err) => console.log(err));
