// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.17;

// contract BlackjackHouse {
//     address payable public houseWallet;

//     event Payout(address recipient, uint256 amount);

//     constructor() {
//         houseWallet = payable(msg.sender);
//     }

//     function playRound(
//         string memory round_result,
//         uint256 player_bet
//     ) public payable {
//         require(msg.value == player_bet, "Incorrect bet amount");

//         if (compareStrings(round_result, "Win")) {
//             uint256 payoutAmount = player_bet * 2;
//             emit Payout(msg.sender, payoutAmount);
//             payable(msg.sender).transfer(payoutAmount);
//         } else if (compareStrings(round_result, "Loss")) {
//             houseWallet.transfer(player_bet);
//         } else if (compareStrings(round_result, "Blackjack")) {
//             uint256 payoutAmount = (player_bet * 15) / 10;
//             emit Payout(msg.sender, payoutAmount);
//             payable(msg.sender).transfer(payoutAmount);
//         } else if (compareStrings(round_result, "Push")) {
//             payable(msg.sender).transfer(player_bet);
//         } else {
//             revert("Invalid round result");
//         }
//     }

//     function compareStrings(
//         string memory a,
//         string memory b
//     ) internal pure returns (bool) {
//         return (keccak256(abi.encodePacked((a))) ==
//             keccak256(abi.encodePacked((b))));
//     }
// }
// address - 0x8e5fe6934504459dd39650d4164fe2dfcaf664fd