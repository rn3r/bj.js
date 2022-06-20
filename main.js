import { Outcomes, BJ_DEALER_MAX } from "./constants.js";
import { Card, counthand, deal } from './cards.js';
import { renderData, getOutcome } from "./logic.js";

var stood = false
var outcome = null
var hands = {
    player: [],
    dealer: []
}

function displayRender(render) {
    console.log(render.description)
    for(field of render.fields) {
        console.log(`${field.title}: ${field.value}`)
    }
}

for(i = 0; i < 2; i++) {
    hands.player.push(deal(hands.player, true))
    hands.dealer.push(deal(hands.dealer, true))
}

while(1) {
    getRender = renderData(hands.player, hands.dealer, stood)
    // Clears terminal
    console.log('\033c')
    displayRender(getRender)

    outcome = getOutcome(hands.player, hands.dealer, stood)
    print(outcome ? Outcomes(outcome.outcome).outcome.message : null)

    choice = prompt("Hit/Stand? (h/s)")

    if(choice == "h") {
        deal(hands.player, false)
    }
    else if(choice == "s") {
        stood = true
        while(countHand(hands.dealer) < BJ_DEALER_MAX) {
            deal(hands.dealer, false)
        }
    }
}