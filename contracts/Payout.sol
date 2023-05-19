pragma solidity ^0.8.19;

contract Payout {
    function payout(uint256 player_bet, string memory game_result) public payable {
        address payable player = address(msg.sender);
        if (game_result = "Win") {
            player.transfer(2 * player_bet);
        } else if (game_result = "Push") {
            player.transfer(player_bet);
        } else if (game_result = "Blackjack") {
            player.transfer(2.5 * player_bet);
        } else {
            uint256 house_wallet = 0x0000000000000000000000000000000000000000;
            address payable house_wallet_payable = address(house_wallet);
            house_wallet_payable.transfer(player_bet);
        }
    }
}