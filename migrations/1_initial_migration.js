// const TodoList = artifacts.require("TodoList");
const Payout = artifacts.require("Payout");

module.exports = function (deployer) {
    // deployer.deploy(TodoList);
    deployer.deploy(Payout);
};