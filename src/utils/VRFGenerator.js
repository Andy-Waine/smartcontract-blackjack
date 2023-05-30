const Web3 = require("web3");
const VrfConsumerContract = "0x1c1441b5B752cCf556Dd641755FDD53A8fe07551";
const abi = require("./VrfAbi.json");

export const GetRandomNumber = async (provider) => {
  try {
    const gasLimit = 200000;
    const options = {
      from: account.address,
      gas: gasLimit,
    };
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, VrfConsumerContract);
    const tx = await contract.methods.requestRandomWords().send(options);
    const lastRequestId = await contract.methods.lastRequestId().call();
    const randNumber = await contract.methods
      .getRequestStatus(lastRequestId)
      .call();
    return randNumber[1];
  } catch (err) {
    console.log(err);
    return 0;
  }
};
