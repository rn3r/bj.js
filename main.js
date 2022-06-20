const Constants = require("./constants.js")
const Cards = require("./cards.js")
const Logic = require("./logic.js")

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
    hands.player.push(Cards.deal(hands.player, true))
    hands.dealer.push(Cards.deal(hands.dealer, true))
}

while(1) {
    getRender = Logic.renderData(hands.player, hands.dealer, stood)
    // Clears terminal
    console.log('\033c')
    displayRender(getRender)

    outcome = Logic.GetOutcome(hands.player, hands.dealer, stood)
    print(outcome ? Constants.Outcomes(outcome.outcome).outcome.message : null)

    choice = prompt("Hit/Stand? (h/s)")

    if(choice == "h") {
        Cards.deal(hands.player, false)
    }
    else if(choice == "s") {
        stood = true
        while(Cards.countHand(hands.dealer) < Constants.BJ_DEALER_MAX) {
            Cards.deal(hands.dealer, false)
        }
    }
}