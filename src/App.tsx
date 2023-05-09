import React from 'react';
import './App.css';
import { Button } from '@mui/material'

// global variable(s)
var deck: string[] = [
  "A\u{2660}", "A\u{2666}", "A\u{2663}", "A\u{2665}",
  "K\u{2660}", "K\u{2666}", "K\u{2663}", "K\u{2665}",
  "Q\u{2660}", "Q\u{2666}", "Q\u{2663}", "Q\u{2665}",
  "J\u{2660}", "J\u{2666}", "J\u{2663}", "J\u{2665}",
  "10\u{2660}", "10\u{2666}", "10\u{2663}", "10\u{2665}",
  "9\u{2660}", "9\u{2666}", "9\u{2663}", "9\u{2665}",
  "8\u{2660}", "8\u{2666}", "8\u{2663}", "8\u{2665}",
  "7\u{2660}", "7\u{2666}", "7\u{2663}", "7\u{2665}",
  "6\u{2660}", "6\u{2666}", "6\u{2663}", "6\u{2665}",
  "5\u{2660}", "5\u{2666}", "5\u{2663}", "5\u{2665}",
  "4\u{2660}", "4\u{2666}", "4\u{2663}", "4\u{2665}",
  "3\u{2660}", "3\u{2666}", "3\u{2663}", "3\u{2665}",
  "2\u{2660}", "2\u{2666}", "2\u{2663}", "2\u{2665}",
];

function App() {
  return (
    <div className="app-root">
      {/* New Game button for testing only, to be removed */}
      <Button variant="contained" onClick={round_start}>
        New Game
      </Button>
      <div className="container">
          <div className="row">
              <div className="col-2 col-options col-border-right">
                  <div className="row row-header">
                      <h6>Data Header</h6>
                  </div>
              </div>
              <div className="col-8 col-options col-border-right">
                  <div className="row row-header">
                      <h5>Main Table Header</h5>
                  </div>
                  <div className="row row-body">
                      <h6>Playing Field</h6>
                  </div>
                  <div className="row row-footer">
                      <div className="col-3 col-options"></div>
                      <div className="col-6 col-options">
                          <div className="row row-player-hand" id="player-hand">

                          </div>
                          <div className="row row-player-choices">
                            <div className="col-2 col-options col-choice-button"></div>
                            <div className="col-4 col-options col-choice-button">
                              <Button variant="contained" className="button-hit">
                                Hit
                              </Button>
                            </div>
                            <div className="col-4 col-options col-choice-button">
                              <Button variant="outlined" className="button-stand">
                                Stand
                              </Button>
                            </div>
                            <div className="col-2 col-options col-choice-button"></div>


                          </div>
                      </div>
                      <div className="col-3 col-options"></div>
                  </div>
              </div>
              <div className="col-2 col-options">
                  <div className="row row-header">
                      <h6>Betting Header</h6>
                  </div>
              </div>
          </div>
      </div>
    </div>

  );
}

async function round_start() {
  console.log("New Round!");

  // dealer deals
  var { player_hand, dealer_hand, isHandBlackjack } = await deal();

  // player's turn
    // player_status: 'Bust' || 'Blackjack' || 'Stand'
  var { player_status, player_score }= await playersTurn(player_hand); 

  // dealer's turn
    // dealer_status: 'Bust' || 'Blackjack' || 'Stand'
  var { dealer_status, dealer_score } = await dealersTurn(dealer_hand);

  // determine round result
    // round_result: 'Win' || 'Blackjack' || 'Loss' || 'Push'
  var round_result = await determineResult(player_status, player_score, dealer_status, dealer_score);

  // NOTE: the round_result will be fed into the smart contract

  console.log("Game Over.");
  console.log("player_hand: " + player_hand);
  console.log("player_status: " + player_status);
  console.log("player_score: " + player_score);
  console.log("dealer_hand: " + dealer_hand);
  console.log("isHandBlackjack: " + isHandBlackjack);
  console.log("dealer_status: " + dealer_status);
  console.log("dealer_score: " + dealer_score);
  console.log("round_result: " + round_result);
  console.log("deck: " + deck);
}

async function deal() {
  console.log("Dealing cards...");
  // ALL Randomization to be Replaced by Chainlink VRF
  let card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];           // selects random card from deck for player
  let dealer_card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];   // selects random card from deck for dealer
  let card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];         // selects random card from deck for player
  let dealer_card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]; // selects random card from deck for dealer
  
  var player_hand: string[] = [card_1.toString(), card_2.toString()];                   // compounds cards into 'hand' array
  await generatePlayerHand(player_hand);                                                     // generates player hand on screen
  var dealer_hand: string[] = [dealer_card_1.toString(), dealer_card_2.toString()];

  var isHandBlackjack: boolean = blackjackChecker(player_hand);

  console.log("card_1: " + card_1);
  console.log("dealer_card_1: " + dealer_card_1);
  console.log("card_2: " + card_2);
  console.log("dealer_card_2: " + dealer_card_2);
  console.log("player_hand: " + player_hand);
  console.log("dealer_hand: " + dealer_hand);
  console.log("isHandBlackjack: " + isHandBlackjack);

  return { player_hand, dealer_hand, isHandBlackjack };
}

function blackjackChecker(hand: string[]): boolean {
  let aceCounter: number = 0;   // aceCounter is for A
  let faceCounter: number = 0;  // faceCounter is for K, Q, J, 10
  for (let card of hand) {
    let char1 = card.substring(0, 1);
    if (char1 === "A") {
        aceCounter = aceCounter + 1;
    } else if (char1 === "1") { // if statement checks for value of 10 (2 chars)
        let char2 = card.substring(1, 2);
        if (char2 === "0") { // if char1=1 & char2=0, our value is 10
            faceCounter = faceCounter + 1;
        }
    } else if (char1 === "K" || char1 === "Q" || char1 === "J") {
        faceCounter = faceCounter + 1;
    }
  }
  if (aceCounter === 1 && faceCounter === 1) {
    return true; // blackjack :)
  } else {
    return false; // not blackjack :(
  }
}

/*
    Returns PlayerStatus,
            player_score,
*/
function playersTurn(player_hand: string[]) {           // results in Bust or Stand PlayerStatus
    
  console.log("Your Hand: "); 
  console.log(player_hand);
  console.log("How would you like to proceed?"); // HERE IS WHERE WE NEED AN EVENT LISTENER
  console.log("(1) Hit");
  console.log("(2) Stand");                         

  // declarations (w/ dummy values)
  let player_status: string = 'Stand'; // dummy value until user choice is made
  let player_choice: number = 2; // dummy value until we implement user input UI in html
  let player_score: number = 0; // dummy value until score is evaluated
  

  if (player_choice === 1) {                       // (1) HIT
    console.log("You choose to hit.\n");

    // a new card is drawn from the deck and added to the player's hand
    let new_card: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];    // Randomization to be Replaced by Chainlink VRF
    player_hand.push(new_card);

    // checks if player_hand is a bust
    let [is_bust, player_score] = checkBust(player_hand);

    if (is_bust === true) {
        console.log(player_hand, " | Uh-oh, You BUST!\n");
        player_status = 'Bust';
    } else {
        playersTurn(player_hand);                   // loops back to choose until STAND or BUST
    }                            
  } else if (player_choice === 2) {               // (2) STAND
    console.log("You choose to stand.\n");
    player_score = eval_score(player_hand);
    player_status = 'Stand';
  }
  return { player_status, player_score };
}

function checkBust(player_hand: string[]): [boolean, number] {
  let is_bust: boolean = false; // default value
  let player_score: number = eval_score(player_hand);
  if (player_score > 21) {
    is_bust = true;
  } else {
    is_bust = false;
  }
  return [is_bust, player_score];
}

function eval_score(player_hand: string[]): number {
  let totalScore: number = 0;                                    // 0 placeholder
    let valsToEval: string[] = [];
    for (let card of player_hand) {
        let char1 = card.substring(0, 1);
        if (char1 === "1") {                                        // if statement checks for value of 10 (2 chars)
            let char2 = card.substring(1, 2);
            if (char2 === "0") {                                  // If char1=1 & char2=0, our value is 10
                let char10 = card.substring(0, 2);
                valsToEval.push(char10);     // true if value is 10
            } else {
                valsToEval.push(char1);     // true if value is 1
            }
        } else {
            valsToEval.push(char1);     // true if value is NOT 1 or 10
        }
    }
    for (let cardValue of valsToEval) {
        let cardScore: number;
        if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "10") {
            cardScore = 10;
        } else if (cardValue !== "A") {
            cardScore = +cardValue;
        } else {
            cardScore = 11;
        }
        totalScore = totalScore + cardScore;
    }

    let numAces = valsToEval.filter(x => x === "A").length;              
    if (numAces > 0) {
        for (let i = 0; i < numAces; i++) {
            if (totalScore > 21) {
                totalScore -= 10;
            }                                    // accounts for situations in which aces are converted from 11 to 1
        }
    }
    console.log("Total Score from eval_score: " + totalScore);
    return totalScore;
}

function dealersTurn(dealerHand: string[]) {
  console.log('The Dealer reveals their initial draw: ', dealerHand);
  let isBlackjack = blackjackChecker(dealerHand);
  let dealer_score = eval_score(dealerHand); //initial score evaluation
  let dealer_status: string;
  while (dealer_score <= 16) {
    let dealerDraw: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]; // Randomization to be Replaced by Chainlink VRF
    console.log('The Dealer draws another card: ', dealerDraw);
    dealerHand.push(dealerDraw.toString());
    dealer_score = eval_score(dealerHand);
  }
  if (dealer_score > 21) {
    console.log('The Dealer BUSTS with the following hand: ', dealerHand);
    dealer_status = 'Bust';
    return { dealer_status, dealer_score };
  } else if (isBlackjack == true) {
    console.log('The Dealer STANDS with a BLACKJACK: ', dealerHand);
    dealer_status = 'Blackjack';
    return { dealer_status, dealer_score };
  } else {
    console.log('The Dealer STANDS with the following hand: ', dealerHand);
    dealer_status = 'Stand';
    return { dealer_status, dealer_score };
  }
}

function determineResult(playerStatus: String, playerScore: number, dealerStatus: String, dealerScore: number) {
  var round_result: String; // 'Win' || 'Blackjack' || 'Loss' || 'Push'

  const winMessage = "!!!   You WIN :)   !!!";
  const loseMessage = "!!!   You LOSE :(   !!!";
  const pushMessage = "!!!   PUSH :|   !!!";
  const blackjackMessage = "!!! NICE BLACKJACK !!!";


  if (playerStatus === 'Stand' && dealerStatus === 'Stand') {
    if (playerScore > dealerScore) {
        console.log(winMessage);
        return round_result = 'Win';
    } else {
        console.log(loseMessage);
        return round_result = 'Loss';
    }
  } else if (playerStatus === 'Stand' && dealerStatus === 'Bust') {
      console.log(winMessage);
      return round_result = 'Win';
  } else if (playerStatus === 'Blackjack' && dealerStatus === 'Bust') {
      console.log(winMessage, blackjackMessage);
      return round_result = 'Blackjack';
  } else if (playerStatus === 'Blackjack' && dealerStatus === 'Stand') {
      console.log(winMessage, blackjackMessage);
      return round_result = 'Blackjack';
  } else if (playerStatus === 'Bust' && dealerStatus === 'Stand') {
      console.log(loseMessage);
      return round_result = 'Loss';
  } else if (playerStatus === 'Bust' && dealerStatus === 'Blackjack') {
      console.log(loseMessage);
      return round_result = 'Loss';
  } else if (playerStatus === 'Stand' && dealerStatus === 'Blackjack') {
      console.log(loseMessage);
      return round_result = 'Loss';
  } else if (playerStatus === 'Blackjack' && dealerStatus === 'Blackjack') {
      console.log(pushMessage);
      return round_result = 'Push';
  } else if (playerStatus === 'Bust' && dealerStatus === 'Bust') {
      console.log(pushMessage);
      return round_result = 'Push';
  }
}

function generatePlayerHand(player_hand : string[]) {
  // Select the "player-cards" div
  var playerHandContainer = document.querySelector('#player-hand');

  // Generate two playing card-shaped divs with the player's hand
  var card1 = document.createElement('div');
  card1.style.width = '80px';
  card1.style.height = '120px';
  card1.style.backgroundColor = 'white';
  card1.style.borderRadius = '10px';
  card1.style.margin = '5px';
  card1.style.float = 'left';
  // Add the first string from the player_hand array as text content to the card1 div
  card1.textContent = player_hand[0];

  var card2 = document.createElement('div');
  card2.style.width = '80px';
  card2.style.height = '120px';
  card2.style.backgroundColor = 'white';
  card2.style.borderRadius = '10px';
  card2.style.margin = '5px';
  card2.style.float = 'left';
  // Add the second string from the player_hand array as text content to the card2 div
  card2.textContent = player_hand[1];

  // Append the two playing card-shaped divs to the "player-cards" div
  playerHandContainer?.appendChild(card1);
  playerHandContainer?.appendChild(card2);
}

export default App;
