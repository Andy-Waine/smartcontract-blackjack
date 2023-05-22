Future Items

    Required

        Connect MetaMask functionality (use temporary button for testing)
            You should be able to see the account balance
        EVM Smart Contract for betting payouts
            -Set up Truffle and Ganache/Hardhat for development and testing.
            -Install and configure the web3.js library to interact with the Ethereum blockchain.
            -Develop a smart contractyo handle betting payouts based upon the player's win/loss/blackjack/tie status.
            -Implement Metamask to connect the user to the Ethereum network.
            -Deploy the smart contract to the Ethereum network.
        Make Container dynamic so that the table does not appear unless MetaMask is connected
        Demo Video
        Detailed README


    Semi-Optional
        Flow Blockchain integration
        Data Feed
        Eth to USD translation while player is betting
        If the screen width is less than a certain amount, remove the Data Feed entirely
        Top Right UI:
            'Deal' Button (Replaces 'new game' test button)
            When pressed, the input field and Max/Deal buttons are deactivated
        Betting Logic
        Dyanmic Availability of Hit/Stand Buttons (Greyed out unless player turn)

    Optional
        Dark Mode w/ Toggle
        Sounds for Card Draw, win, loss
        Image for Card Backs
        'Breathing' colorful background
        Comment at top of app.tsx for stack of functions in a game
        More detailed card front images


Truffle Commands
    truffle init
    add contract to 1_initial_migrations
    truffle compile
    truffle migrate --reset (adds contract to local blockchain)


Our payout smart contract for our blackjack game should have the following characteristics:
Inputs... 
    player_bet: number - the amount of ethereum that the player has placed as a bet for this round 
    game_result: string - the player's status at the end of the game ('Win' || 'Loss' || 'Blackjack' || 'Push')
Functionality... If (game_result == 'Win' || 'Blackjack') {
                   * pay the player the amount of eth equal to (2 * player_bet) *
                } else if (game_result == 'Push') {
                    * Return the eth to the player in the amount of player_bet *
                } else {
                    * send the player's player_bet eth to the house's wallet *
                }


VRFID 2153