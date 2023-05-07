import React from 'react';
import './App.css';

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
      <div className="container">
          <div className="row">
              <div className="col-2 col-options">
                  <div className="row col-header">
                      <h5>Left</h5>
                  </div>
              </div>
              <div className="col-8 col-options">
                  <div className="row col-header">
                      <h5>Main Table</h5>
                  </div>
              </div>
              <div className="col-2 col-options no-border-right">
                  <div className="row col-header">
                      <h5>Right</h5>
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

  // player chooses
  var { player_status, player_score }= await choose(player_hand); // 'Bust' || 'Blackjack' || 'Stand'

  console.log("Game Over.");
  console.log("player_hand: " + player_hand);
  console.log("player_status: " + player_status);
  console.log("player_score: " + player_score);
  console.log("dealer_hand: " + dealer_hand);
  console.log("isHandBlackjack: " + isHandBlackjack);
  console.log("deck: " + deck);
}

function deal() {
  console.log("Dealing cards...");
  // ALL Randomization to be Replaced by Chainlink VRF
  let card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];           // selects random card from deck for player
  let dealer_card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];   // selects random card from deck for dealer
  let card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];         // selects random card from deck for player
  let dealer_card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]; // selects random card from deck for dealer
  
  var player_hand: string[] = [card_1.toString(), card_2.toString()];                          // compounds cards into 'hand' array
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
  if (aceCounter == 1 && faceCounter == 1) {
    return true; // blackjack :)
  } else {
    return false; // not blackjack :(
  }
}

/*
    Returns PlayerStatus,
            player_score,
*/
function choose(player_hand: string[]) {           // results in Bust or Stand PlayerStatus
    
  console.log("Your Hand: "); 
  console.log(player_hand);
  console.log("How would you like to proceed?");
  console.log("(1) Hit");
  console.log("(2) Stand");                         

  // declarations (w/ dummy values)
  let player_status: string = 'Stand'; // dummy value until user choice is made
  let player_choice: number = 2; // dummy value until we implement user input UI in html
  let player_score: number = 0; // dummy value until score is evaluated
  

  if (player_choice == 1) {                       // (1) HIT
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
        choose(player_hand);                         // loops back to choose until STAND or BUST
    }                            
  } else if (player_choice == 2) {               // (2) STAND
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
  return 0; // dummy value until we implement eval_score
}

round_start()

export default App;
