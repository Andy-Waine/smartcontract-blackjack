// const TodoList = artifacts.require("TodoList");
const Payout = artifacts.require("Payout");
// const Random = artifacts.require("VRFConsumer");
module.exports = function (deployer) {
  // deployer.deploy(TodoList);
  deployer.deploy(Payout);
};
// module.exports = function (deployer) {
//   // deployer.deploy(TodoList);
//   const constructorarg = 2284;
//   deployer.deploy(Random, constructorarg).then((deployedContract) => {
//     console.log("Contract deployed at address", deployedContract.address);
//   });
// };
