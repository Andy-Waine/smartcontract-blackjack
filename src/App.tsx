import * as React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { VRFGenerator } from "../utils/VRFGenerator"; // changed
// import { ethers } from 'ethers';

import "./App.css";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import image from "./eth-symbol.png";

// global variable(s)
var deck: string[] = [
  "A\u{2660}",
  "A\u{2666}",
  "A\u{2663}",
  "A\u{2665}",
  "K\u{2660}",
  "K\u{2666}",
  "K\u{2663}",
  "K\u{2665}",
  "Q\u{2660}",
  "Q\u{2666}",
  "Q\u{2663}",
  "Q\u{2665}",
  "J\u{2660}",
  "J\u{2666}",
  "J\u{2663}",
  "J\u{2665}",
  "10\u{2660}",
  "10\u{2666}",
  "10\u{2663}",
  "10\u{2665}",
  "9\u{2660}",
  "9\u{2666}",
  "9\u{2663}",
  "9\u{2665}",
  "8\u{2660}",
  "8\u{2666}",
  "8\u{2663}",
  "8\u{2665}",
  "7\u{2660}",
  "7\u{2666}",
  "7\u{2663}",
  "7\u{2665}",
  "6\u{2660}",
  "6\u{2666}",
  "6\u{2663}",
  "6\u{2665}",
  "5\u{2660}",
  "5\u{2666}",
  "5\u{2663}",
  "5\u{2665}",
  "4\u{2660}",
  "4\u{2666}",
  "4\u{2663}",
  "4\u{2665}",
  "3\u{2660}",
  "3\u{2666}",
  "3\u{2663}",
  "3\u{2665}",
  "2\u{2660}",
  "2\u{2666}",
  "2\u{2663}",
  "2\u{2665}",
];

var round_result: String = ""; // 'Win' || 'Blackjack' || 'Loss' || 'Push'
var player_hand: string[] = [];
var dealer_hand: string[] = [];
const _VRFGenerator = async (provider) => {
  // changed
  const randomNumber = await VRFGenerator();
};
function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getMetamaskBalance = async () => {
      const web3 = new Web3((window as any).ethereum);
      const accounts = await (window as any).ethereum.enable();
      const balanceString: string = await web3.eth.getBalance(accounts[0]);
      // transform wei to ether, transform balanceString to number, set balance
      const balanceUnformatted = Number(
        web3.utils.fromWei(balanceString, "ether")
      );
      // fix balance to three decimal places without rounding
      const balance = Math.floor(balanceUnformatted * 1000) / 1000;
      setBalance(balance);
    };
    getMetamaskBalance();
  }, []);

  return (
    <div className="app-root">
      {/* New Game & Reload buttons for testing only, to be removed */}
      <div className="row match-bg">
        <Button
          variant="contained"
          className="button-hit"
          onClick={refreshPage}
        >
          Restart
        </Button>
        <Button
          variant="contained"
          className="button-hit"
          onClick={round_start}
        >
          Deal
        </Button>
      </div>

      <div className="container z-index-0 width-900">
        <div className="row">
          <div className="col-2 col-options col-border-right">
            <div className="row row-header">
              <h6>Data Feed</h6>
            </div>
          </div>
          <div className="col-8 col-options col-border-right">
            <div className="row row-header">
              <h5>Smart Contract Blackjack</h5>
            </div>
            <div className="row row-body">
              <div className="col-2 col-options"></div>
              <div className="col-8 col-options col-dealer-hand  width-340">
                <div className="row row-dealer-hand z-index-10">
                  <span className="row-dealer-hand-fill z-index-0">
                    <span className="your-hand">Dealer's Hand</span>
                    <div className="col col-hand" id="dealer-hand">
                      {/* Dealer's Hand */}
                    </div>
                  </span>
                </div>
              </div>
              <div className="col-2 col-options"></div>
            </div>
            <div className="row row-footer">
              <div className="col-2 col-options"></div>
              <div className="col-8 col-options width-340">
                <div className="row row-player-hand z-index-10">
                  <span className="row-player-hand-fill z-index-0">
                    <span className="your-hand">Your Hand</span>
                    <span className="game-result" id="game_result">
                      {/* Game Result */}
                    </span>
                    <div className="col col-hand" id="player-hand">
                      {/* Player's Hand */}
                    </div>
                  </span>
                </div>
                <div className="row row-player-choices">
                  <div className="col-2 col-options col-choice-button"></div>
                  <div className="col-4 col-options col-choice-button">
                    <Button
                      variant="contained"
                      className="button-hit"
                      id="hit-btn"
                    >
                      Hit
                    </Button>
                  </div>
                  <div className="col-4 col-options col-choice-button">
                    <Button
                      variant="outlined"
                      className="button-stand"
                      id="stand-btn"
                    >
                      Stand
                    </Button>
                  </div>
                  <div className="col-2 col-options col-choice-button"></div>
                </div>
              </div>
              <div className="col-2 col-options"></div>
            </div>
          </div>
          <div className="col-2 col-options">
            <div className="row row-header">
              <h6>Wager</h6>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "10ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <OutlinedInput
                    defaultValue={0.001}
                    type="number"
                    size="small"
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">
                        <img
                          src={image}
                          alt="Ethereum Symbol"
                          className="ethLogoMain"
                        />
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    sx={{
                      width: "115px",
                      border: "1px solid #a0b3f2",
                      input: {
                        color: "#1a2b6b2",
                      },
                    }}
                    inputProps={{
                      "aria-label": "weight",
                      step: ".001",
                      min: ".001",
                      max: ".02",
                    }}
                  />
                </FormControl>
              </Box>
              <div className="row row-wager-btn">
                <Button
                  variant="contained"
                  className="button-wager"
                  id="wager-btn"
                >
                  Wager
                </Button>
              </div>
              <div className="row row-balance">
                <div className="col-6 wallet-balance">Balance:</div>
                <div className="col-6 wallet-balance">
                  {balance}{" "}
                  <img src={image} alt="Ethereum Symbol" className="ethLogo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function round_start() {
  // clear local storage
  localStorage.clear();

  // reset round result
  round_result = ""; // 'Win' || 'Blackjack' || 'Loss' || 'Push'

  // reset hands
  player_hand = [];
  dealer_hand = [];

  // reset

  console.log("New Round!");

  // reset deck
  deck = [
    "A\u{2660}",
    "A\u{2666}",
    "A\u{2663}",
    "A\u{2665}",
    "K\u{2660}",
    "K\u{2666}",
    "K\u{2663}",
    "K\u{2665}",
    "Q\u{2660}",
    "Q\u{2666}",
    "Q\u{2663}",
    "Q\u{2665}",
    "J\u{2660}",
    "J\u{2666}",
    "J\u{2663}",
    "J\u{2665}",
    "10\u{2660}",
    "10\u{2666}",
    "10\u{2663}",
    "10\u{2665}",
    "9\u{2660}",
    "9\u{2666}",
    "9\u{2663}",
    "9\u{2665}",
    "8\u{2660}",
    "8\u{2666}",
    "8\u{2663}",
    "8\u{2665}",
    "7\u{2660}",
    "7\u{2666}",
    "7\u{2663}",
    "7\u{2665}",
    "6\u{2660}",
    "6\u{2666}",
    "6\u{2663}",
    "6\u{2665}",
    "5\u{2660}",
    "5\u{2666}",
    "5\u{2663}",
    "5\u{2665}",
    "4\u{2660}",
    "4\u{2666}",
    "4\u{2663}",
    "4\u{2665}",
    "3\u{2660}",
    "3\u{2666}",
    "3\u{2663}",
    "3\u{2665}",
    "2\u{2660}",
    "2\u{2666}",
    "2\u{2663}",
    "2\u{2665}",
  ];

  // reset game result (You Win!/You Lose...) text to 'blank'
  document.getElementById("game_result")!.innerHTML = "";

  // dealer deals
  var { player_hand, dealer_hand, isHandBlackjack } = await deal();

  console.log("player_hand: " + player_hand);
  console.log("dealer_hand: " + dealer_hand);
  console.log("isHandBlackjack: " + isHandBlackjack);

  // player's turn
  playersTurn(player_hand, dealer_hand, isHandBlackjack);
}

async function deal() {
  console.log("deck ay deal(): " + deck);
  console.log("Dealing cards...");
  // ALL Randomization to be Replaced by Chainlink VRF
  let card_1: string = deck.splice(
    Math.floor(Math.random() * deck.length),
    1
  )[0]; // selects random card from deck for player
  let dealer_card_1: string = deck.splice(
    Math.floor(Math.random() * deck.length),
    1
  )[0]; // selects random card from deck for dealer
  let card_2: string = deck.splice(
    Math.floor(Math.random() * deck.length),
    1
  )[0]; // selects random card from deck for player
  let dealer_card_2: string = deck.splice(
    Math.floor(Math.random() * deck.length),
    1
  )[0]; // selects random card from deck for dealer

  player_hand = [card_1.toString(), card_2.toString()]; // compounds cards into 'hand' array
  await generatePlayerDraw(player_hand); // generates player hand on screen
  dealer_hand = [dealer_card_1.toString(), dealer_card_2.toString()];
  let player_status: string = "";
  await generateDealerDraw(dealer_hand, player_status); // generates dealer hand on screen

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
  let aceCounter: number = 0; // aceCounter is for A
  let faceCounter: number = 0; // faceCounter is for K, Q, J, 10
  for (let card of hand) {
    let char1 = card.substring(0, 1);
    if (char1 === "A") {
      aceCounter = aceCounter + 1;
    } else if (char1 === "1") {
      // if statement checks for value of 10 (2 chars)
      let char2 = card.substring(1, 2);
      if (char2 === "0") {
        // if char1=1 & char2=0, our value is 10
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
function playersTurn(
  player_hand: string[],
  dealer_hand: string[],
  isHandBlackjack: boolean
) {
  // FUTURE: Hit/Stand buttons should be greyed out until NOW

  // declarations (w/ dummy values)
  let player_status: string = ""; // dummy value until user choice is made
  let player_score: number = 0; // dummy value until score is evaluated

  // HIT button event
  const hitButton = document.getElementById("hit-btn");
  hitButton?.addEventListener("click", async () => {
    // player_score = eval_score(player_hand);
    if (player_status !== "Bust" && player_status !== "Stand") {
      console.log("You choose to hit.\n");

      // a new card is drawn from the deck and added to the player's hand
      let new_card: string = await deck.splice(
        Math.floor(Math.random() * deck.length),
        1
      )[0]; // Randomization to be Replaced by Chainlink VRF

      await player_hand.push(new_card);
      console.log("player_hand: " + player_hand);

      // generate new card on screen
      await generatePlayerDraw(player_hand);

      // checks if player_hand is a bust
      let [is_bust, player_score] = checkBust(player_hand);

      console.log("player_score: ", player_score);
      console.log("player_hand: ", player_hand);

      if (is_bust === true) {
        console.log(player_hand, " | Uh-oh, You BUST!");
        player_status = "Bust";
        postDecision(player_status, player_score, dealer_hand); // if BUST, move to dealer turn and game eval
      }
    }
  });

  // STAND button event
  const standButton = document.getElementById("stand-btn");
  standButton?.addEventListener("click", () => {
    // get player score
    let player_score = eval_score(player_hand);
    if (player_score > 21) {
      player_status = "Bust";
    }
    if (player_status !== "Bust" && player_status !== "Stand") {
      console.log("You choose to stand.\n");
      player_score = eval_score(player_hand);
      if (isHandBlackjack === true) {
        player_status = "Blackjack";
      } else {
        player_status = "Stand";
      }
    }
    postDecision(player_status, player_score, dealer_hand); // if STAND, move to dealer turn and game eval
  });

  // if (player_status !== 'Stand' && player_status !== 'Bust' && player_status !== 'Blackjack') {
  //   //set timeout for 30 seconds
  //   setTimeout(() => {
  //     console.log("Waiting for player decision...");
  //     // if no decision is made, playersTurn() is called again
  //     playersTurn(player_hand, dealer_hand, isHandBlackjack);
  //   }, 30000);
  // }
}

async function postDecision(
  player_status: string,
  player_score: number,
  dealer_hand: string[]
) {
  // dealer's turn
  // dealer_status: 'Bust' || 'Blackjack' || 'Stand'
  var { dealer_status, dealer_score } = await dealersTurn(
    dealer_hand,
    player_status
  );

  // UI re-generation for 2-card dealer stand to remove '??' card
  generateDealerDraw(dealer_hand, player_status);

  // determine round result
  // round_result: 'Win' || 'Blackjack' || 'Loss' || 'Push'
  var round_result = await determineResult(
    player_status,
    player_score,
    dealer_status,
    dealer_score
  );

  // if the player won, html is updated to display the win message
  if (round_result === "Win") {
    document.getElementById("game_result")!.innerHTML = "You Win!";
    document.getElementById("game_result")!.style.color = "#375BD2"; // CL Blue
  } else if (round_result === "Blackjack") {
    document.getElementById("game_result")!.innerHTML = "Nice Blackjack!";
    document.getElementById("game_result")!.style.color = "#375BD2"; // CL Blue
  } else if (round_result === "Loss") {
    document.getElementById("game_result")!.innerHTML = "You Lose...";
    document.getElementById("game_result")!.style.color = "#ff5e57"; // reddish orange
  } else if (round_result === "Push") {
    document.getElementById("game_result")!.innerHTML = "Push!";
    document.getElementById("game_result")!.style.color = "#ff5e57"; // reddish orange
  } else {
    document.getElementById("game_result")!.innerHTML = "";
  }

  // NOTE: the round_result will be fed into the smart contract

  console.log("Game Over.");
  console.log("player_status: " + player_status);
  console.log("player_score: " + player_score);
  console.log("dealer_status: " + dealer_status);
  console.log("dealer_score: " + dealer_score);
  console.log("round_result: " + round_result);
  console.log("deck: " + deck);
}

function checkBust(player_hand: string[]): [boolean, number] {
  console.log("checkBust A");
  let is_bust: boolean = false; // default value
  let player_score: number = eval_score(player_hand);
  console.log("checkBust B");
  if (player_score > 21) {
    console.log("checkBust C - is_bust = True");
    is_bust = true;
  } else {
    console.log("checkBust C - is_bust = False");
    is_bust = false;
  }
  return [is_bust, player_score];
}

function eval_score(player_hand: string[]): number {
  console.log("eval_score A");
  let totalScore: number = 0; // 0 placeholder
  let valsToEval: string[] = [];
  for (let card of player_hand) {
    let char1 = card.substring(0, 1);
    if (char1 === "1") {
      // if statement checks for value of 10 (2 chars)
      let char2 = card.substring(1, 2);
      if (char2 === "0") {
        // If char1=1 & char2=0, our value is 10
        let char10 = card.substring(0, 2);
        valsToEval.push(char10); // true if value is 10
      } else {
        valsToEval.push(char1); // true if value is 1
      }
    } else {
      valsToEval.push(char1); // true if value is NOT 1 or 10
    }
  }
  for (let cardValue of valsToEval) {
    let cardScore: number;
    if (
      cardValue === "K" ||
      cardValue === "Q" ||
      cardValue === "J" ||
      cardValue === "10"
    ) {
      cardScore = 10;
    } else if (cardValue !== "A") {
      cardScore = +cardValue;
    } else {
      cardScore = 11;
    }
    totalScore = totalScore + cardScore;
  }

  let numAces = valsToEval.filter((x) => x === "A").length;
  if (numAces > 0) {
    for (let i = 0; i < numAces; i++) {
      if (totalScore > 21) {
        // if hand has ace and score is over 21
        totalScore -= 10; // ace is converted from 11 to 1
      }
    }
  }
  console.log("Total Score from eval_score: " + totalScore);
  return totalScore;
}

async function dealersTurn(dealerHand: string[], player_status: string) {
  console.log("The Dealer reveals their initial draw: ", dealerHand);
  let isBlackjack = blackjackChecker(dealerHand);
  let dealer_score = eval_score(dealerHand); //initial score evaluation
  let dealer_status: string;
  while (dealer_score <= 16) {
    let dealerDraw: string = deck.splice(
      Math.floor(Math.random() * deck.length),
      1
    )[0]; // Randomization to be Replaced by Chainlink VRF
    console.log("The Dealer draws another card: ", dealerDraw);
    dealerHand.push(dealerDraw.toString());
    await generateDealerDraw(dealerHand, player_status); // update dealer's hand UI
    dealer_score = eval_score(dealerHand);
  }
  if (dealer_score > 21) {
    console.log("The Dealer BUSTS with the following hand: ", dealerHand);
    dealer_status = "Bust";
    return { dealer_status, dealer_score };
  } else if (isBlackjack == true) {
    console.log("The Dealer STANDS with a BLACKJACK: ", dealerHand);
    dealer_status = "Blackjack";
    return { dealer_status, dealer_score };
  } else {
    console.log("The Dealer STANDS with the following hand: ", dealerHand);
    dealer_status = "Stand";
    return { dealer_status, dealer_score };
  }
}

function determineResult(
  playerStatus: String,
  playerScore: number,
  dealerStatus: String,
  dealerScore: number
) {
  const winMessage = "!!!   You WIN :)   !!!";
  const loseMessage = "!!!   You LOSE :(   !!!";
  const pushMessage = "!!!   PUSH :|   !!!";
  const blackjackMessage = "!!! NICE BLACKJACK !!!";

  if (playerStatus === "Stand" && dealerStatus === "Stand") {
    if (playerScore > dealerScore) {
      console.log(winMessage);
      return (round_result = "Win");
    } else {
      console.log(loseMessage);
      return (round_result = "Loss");
      //     Web3.eth.sendTransaction({
      //       from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      //       to: "0x086912faa7f6598d28d80c448c8d1e9dae5a4dee",
      //       value: web3.toWei(1, "ether"),
      //   }, function(err, transactionHash) {
      //       if (err) {
      //           console.log(err);
      //       } else {
      //           console.log(transactionHash);
      //       }
      //   });
    }
  } else if (playerStatus === "Stand" && dealerStatus === "Bust") {
    console.log(winMessage);
    return (round_result = "Win");
  } else if (playerStatus === "Blackjack" && dealerStatus === "Bust") {
    console.log(winMessage, blackjackMessage);
    return (round_result = "Blackjack");
  } else if (playerStatus === "Blackjack" && dealerStatus === "Stand") {
    console.log(winMessage, blackjackMessage);
    return (round_result = "Blackjack");
  } else if (playerStatus === "Bust" && dealerStatus === "Stand") {
    console.log(loseMessage);
    return (round_result = "Loss");
  } else if (playerStatus === "Bust" && dealerStatus === "Blackjack") {
    console.log(loseMessage);
    return (round_result = "Loss");
  } else if (playerStatus === "Stand" && dealerStatus === "Blackjack") {
    console.log(loseMessage);
    return (round_result = "Loss");
  } else if (playerStatus === "Blackjack" && dealerStatus === "Blackjack") {
    console.log(pushMessage);
    return (round_result = "Push");
  } else if (playerStatus === "Bust" && dealerStatus === "Bust") {
    console.log(pushMessage);
    return (round_result = "Push");
  }
}

// Function to generate the html/css for player's subsequent draws
function generatePlayerDraw(player_hand: string[]) {
  console.log("player_hand in generatePlayerDraw: ", player_hand);

  // Select the "player-cards" div
  var playerHandContainer = document.querySelector("#player-hand");

  // remove all previously generated player cards
  while (playerHandContainer?.firstChild) {
    playerHandContainer.removeChild(playerHandContainer.firstChild);
  }

  // for all cards in the player's hand, generate a playing card-shaped div with the player's draw
  for (var i = 0; i < player_hand.length; i++) {
    console.log("printing player_hand[i]: ", player_hand[i]);
    var card = document.createElement("div");
    card.classList.add("player-card");
    if (player_hand.length == 2) {
      if (i == 0) {
        card.style.left = "15%";
      } else {
        card.style.left = "-15%";
      }
    } else if (player_hand.length == 3) {
      if (i == 0) {
        card.style.left = "15%";
      } else if (i == 1) {
        card.style.left = "0%";
      } else {
        card.style.left = "-15%";
      }
    } else if (player_hand.length == 4) {
      if (i == 0) {
        card.style.left = "20%";
      } else if (i == 1) {
        card.style.left = "0%";
      } else if (i == 2) {
        card.style.left = "-20%";
      } else {
        card.style.left = "-40%";
      }
    } else if (player_hand.length == 5) {
      if (i == 0) {
        card.style.left = "15%";
      } else if (i == 1) {
        card.style.left = "-5%";
      } else if (i == 2) {
        card.style.left = "-25%";
      } else if (i == 3) {
        card.style.left = "-45%";
      } else {
        card.style.left = "-65%";
      }
    } else if (player_hand.length == 6) {
      if (i == 0) {
        card.style.left = "10%";
      } else if (i == 1) {
        card.style.left = "-10%";
      } else if (i == 2) {
        card.style.left = "-30%";
      } else if (i == 3) {
        card.style.left = "-50%";
      } else if (i == 4) {
        card.style.left = "-70%";
      } else {
        card.style.left = "-90%";
      }
    } else if (player_hand.length == 7) {
      if (i == 0) {
        card.style.left = "5%";
      } else if (i == 1) {
        card.style.left = "-15%";
      } else if (i == 2) {
        card.style.left = "-35%";
      } else if (i == 3) {
        card.style.left = "-55%";
      } else if (i == 4) {
        card.style.left = "-75%";
      } else if (i == 5) {
        card.style.left = "-95%";
      } else {
        card.style.left = "-115%";
      }
    } else if (player_hand.length == 8) {
      if (i == 0) {
        card.style.left = "0%";
      } else if (i == 1) {
        card.style.left = "-20%";
      } else if (i == 2) {
        card.style.left = "-40%";
      } else if (i == 3) {
        card.style.left = "-60%";
      } else if (i == 4) {
        card.style.left = "-80%";
      } else if (i == 5) {
        card.style.left = "-100%";
      } else if (i == 6) {
        card.style.left = "-120%";
      } else {
        card.style.left = "-140%";
      }
    }
    // Add the string from the player_hand array as text content to the card div
    card.textContent = player_hand[i];
    // Append the playing card-shaped div to the "player-cards" div
    playerHandContainer?.appendChild(card);
  }
}

// Function to generate the html/css for dealer's subsequent draws
function generateDealerDraw(dealer_hand: string[], player_status: string) {
  console.log("dealer_hand in generatedealerDraw: ", dealer_hand);

  // Select the "dealer-cards" div
  var dealerHandContainer = document.querySelector("#dealer-hand");

  // remove all previously generated dealer cards
  while (dealerHandContainer?.firstChild) {
    dealerHandContainer.removeChild(dealerHandContainer.firstChild);
  }

  // for all cards in the dealer's hand, generate a playing card-shaped div with the dealer's draw
  for (var i = 0; i < dealer_hand.length; i++) {
    console.log("printing dealer_hand[i]: ", dealer_hand[i]);
    var card = document.createElement("div");
    card.classList.add("dealer-card");
    // Add the string from the dealer_hand array as text content to the card div
    card.textContent = dealer_hand[i];
    if (dealer_hand.length == 2) {
      if (i == 0) {
        card.style.left = "10%";
      } else if (
        i == 1 &&
        player_status !== "Stand" &&
        player_status !== "Bust" &&
        player_status !== "Blackjack"
      ) {
        card.style.left = "-15%";
        card.textContent = "??"; // second dealer card is face-down until player stands/busts
      } else {
        card.style.left = "-15%";
      }
    } else if (dealer_hand.length == 3) {
      if (i == 0) {
        card.style.left = "15%";
      } else if (i == 1) {
        card.style.left = "0%";
      } else {
        card.style.left = "-15%";
      }
    } else if (dealer_hand.length == 4) {
      if (i == 0) {
        card.style.left = "15%";
      } else if (i == 1) {
        card.style.left = "5%";
      } else if (i == 2) {
        card.style.left = "-5%";
      } else {
        card.style.left = "-15%";
      }
    } else if (dealer_hand.length == 5) {
      if (i == 0) {
        card.style.left = "20%";
      } else if (i == 1) {
        card.style.left = "10%";
      } else if (i == 2) {
        card.style.left = "0%";
      } else if (i == 3) {
        card.style.left = "-10%";
      } else {
        card.style.left = "-20%";
      }
    } else if (dealer_hand.length == 6) {
      if (i == 0) {
        card.style.left = "20%";
      } else if (i == 1) {
        card.style.left = "10%";
      } else if (i == 2) {
        card.style.left = "0%";
      } else if (i == 3) {
        card.style.left = "-5%";
      } else if (i == 4) {
        card.style.left = "-10%";
      } else {
        card.style.left = "-20%";
      }
    } else if (dealer_hand.length == 7) {
      if (i == 0) {
        card.style.left = "30%";
      } else if (i == 1) {
        card.style.left = "20%";
      } else if (i == 2) {
        card.style.left = "10%";
      } else if (i == 3) {
        card.style.left = "0%";
      } else if (i == 4) {
        card.style.left = "-10%";
      } else if (i == 5) {
        card.style.left = "-20%";
      } else {
        card.style.left = "-30%";
      }
    } else if (dealer_hand.length == 8) {
      if (i == 0) {
        card.style.left = "35%";
      } else if (i == 1) {
        card.style.left = "25%";
      } else if (i == 2) {
        card.style.left = "15%";
      } else if (i == 3) {
        card.style.left = "5%";
      } else if (i == 4) {
        card.style.left = "-5%";
      } else if (i == 5) {
        card.style.left = "-15%";
      } else if (i == 6) {
        card.style.left = "-25%";
      } else {
        card.style.left = "-35%";
      }
    }
    // Append the playing card-shaped div to the "dealer-cards" div
    dealerHandContainer?.appendChild(card);
  }
}

async function refreshPage() {
  await window.location.reload();
}

export default App;
