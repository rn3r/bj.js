const Constants = require("./constants.js")

function randomInArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

class Card {
    constructor (face, suit, baseValue) {
        this.face = face;
        this.suit = suit;
        this.baseValue = baseValue;
    }
}

function countHandRaw(hand) {
    // Sums the base value of all cards in the hand
    return hand.reduce((acc, card) => acc + card.baseValue, 0);
}

function countHand(hand) {
    for(var card of hand){
        if (card.face == "A")
            card.baseValue = Constants.BJ_ACE_MAX
    }

    var lowerAce = null
    var aceCheck = hand.filter(card => card.face == "A" && card.baseValue != Constants.BJ_ACE_MIN)
    var lowerAce = aceCheck.length > 0 ? aceCheck[0] : None

    while(
        countHandRaw(hand) > Constants.BJ_WIN &&
        lowerAce != None
    ) {
        lowerAce.baseValue = Constants.BJ_ACE_MIN
        break
    }

    return countHandRaw(hand)
}

function deal(hand, initial) {
    var face = randomInArray(Constants.FACES)
    var suit = randomInArray(Constants.SUITS)

    var cardCheck = hand.filter(card => card.face == face && card.suit == suit)

    if (cardCheck.length > 0) {
        return deal(hand, initial)
    }

    var card = new Card(face, suit, typeof(face) == "number" ? face : (face == "A" ? Constants.BJ_ACE_MIN : Constants.BJ_FACE) )

    if (initial && countHand(hand + card) >= Constants.BJ_WIN) {
        return deal(hand, initial)
    }

    return hand.push(card)
}

module.exports = { Card, countHand, deal }