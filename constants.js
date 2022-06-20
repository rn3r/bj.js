const BJ_WIN = 21;
const BJ_DEALER_MAX = 17;
const BJ_FACE = 10;
const BJ_ACE_MIN = 1;
const BJ_ACE_MAX = 11;

const SUITS = [
    '♠', '♥', '♦', '♣'
]

const FACES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"
]

class Outcome {
    constructor(WIN, LOSS, TIE, OTHER) {
        this.WIN = WIN;
        this.LOSS = LOSS;
        this.TIE = TIE;
        this.OTHER = OTHER;
    }
}

class Outcomes {
    constructor(outcome) {
        var m = [
            { 'message' : 'You win!', 'color': 0x4CAF50 },
            { 'message' : 'You lost ):', 'color': 0xE53935 },
            { 'message' : 'You tied.', 'color': 0xFFB300 },
            { 'message' : 'Wtf did you just do.', 'color': 0xFFB300 }
        ];
        this.outcome = outcome.WIN ? m[0] : outcome.LOSS ? m[1] : outcome.TIE ? m[2] : m[3];
    }
}

class Outcomeresult {
    constructor(outcome, reason, extra) {
        this.outcome = outcome;
        this.reason = reason;
        this.extra = extra;
    }
}

module.exports = { SUITS, FACES, BJ_WIN, BJ_DEALER_MAX, BJ_FACE, BJ_ACE_MIN, BJ_ACE_MAX, Outcome, Outcomes, Outcomeresult };