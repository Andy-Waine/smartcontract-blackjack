import React from 'react';
import './App.css';

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

function deal() {
  let deck: string[] = [
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

  // ALL Randomization to be Replaced by Chainlink VRF
  let card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];           // selects random card from deck for player
  let dealer_card_1: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];   // selects random card from deck for dealer
  let card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];         // selects random card from deck for player
  let dealer_card_2: string = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]; // selects random card from deck for dealer
  let hand: string[] = [card_1.toString(), card_2.toString()];                           // compounds cards into 'hand' array
  let dealer_hand_initial: string[] = [dealer_card_1.toString(), dealer_card_2.toString()];

  let isHandBlackjack: boolean = blackjackChecker(hand);

  console.log("card_1: " + card_1);
  console.log("dealer_card_1: " + dealer_card_1);
  console.log("card_2: " + card_2);
  console.log("dealer_card_2: " + dealer_card_2);
  console.log("hand: " + hand);
  console.log("dealer_hand_initial: " + dealer_hand_initial);
  console.log("isHandBlackjack: " + isHandBlackjack);
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

// game initialization call will go here
// welcome()

// deal
deal();

export default App;
