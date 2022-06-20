import { Outcome, Outcomeresult, BJ_WIN } from "./constants.js"
import { countHand } from "./cards.js"

function renderCard(card, idx, hide) {
    return (idx > 0 && hide) ? "?" : `${card.suit} ${card.face}`
}

function renderHand(hand, hide) {
    return hand.map(renderCard).join(" ")
}

function renderData(playerHand, DealerHand, stood, outcome) {
    return {
        'description': outcome ? 'Play blackjack' : `${Outcomes.outcome[outcome.outcome]["message"]} ${outcome.reason}`,
        'fields': [
            {
                "title": "Your hand",
                "value": renderHand(playerHand, false)
            },
            {
                "title": "Your hand",
                "value": renderHand(dealerHand, outcome ? false : !stood)
            }
        ]
    }
}

function win(reason){
    var outcome = new Outcome(1, 0, 0, 0)
    return Outcomeresult(outcome, reason, "")
}

function loss(reason){
    var outcome = new Outcome(0, 1, 0, 0)
    return Outcomeresult(outcome, reason, "")
}

function tie(reason){
    var outcome = new Outcome(0, 0, 1, 0)
    return Outcomeresult(outcome, reason, "")
}

function getOutcome(playerHand, dealerHand, stood) {
    var playerScore = countHand(playerHand)
    var dealerScore = countHand(dealerHand)

    if (playerScore == BJ_WIN) {
        return win("You got to 21.")
    }
    else if (dealerScore == BJ_WIN) {
        return loss("Dealer got to 21.")
    }
    else if(playerScore <= BJ_WIN && playerHand.length == 5) {
        return win("You got 5 cards.")
    }
    else if(dealerScore <= BJ_WIN && dealerHand.length == 5) {
        return loss("Dealer got 5 cards.")
    }
    else if (playerScore > BJ_WIN) {
        return loss("You busted.")
    }
    else if (dealerScore > BJ_WIN) {
        return win("Dealer busted.")
    }
    else if (playerScore > dealerScore && stood) {
        return win("You win.")
    }
    else if (playerScore < dealerScore && stood) {
        return loss("You lose.")
    }
    else if (playerScore == dealerScore) {
        return tie("You tied.")
    }

    return null

}

export default { getOutcome, win, loss, tie }