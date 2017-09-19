//init empty array
var hand = [
    {"rank": "two", "suit":"diamonds"},
    {"rank": "three", "suit":"diamonds"},
    {"rank": "four", "suit":"diamonds"},
    {"rank": "king", "suit":"diamonds"},
    {"rank": "queen", "suit":"diamonds"}

];

//ALL POSSIBLE RANKS

var ranks = ["two", "three", "four", "five", "seven","eight","nine","ten","jack","queen","king","ace"];
var suits = ["hearts","diamonds","clubs","spades"];
var twoPair = false;
var threeKind = false;
var flush = false;
var fourKind = false;

//Function to check how many times each rank appears and returns that value.
function containsNTimes(handR, ranks) {
        var count = handR.reduce(function(n, val) {
            return n + (val === ranks);
        }, 0);
        return count;
    };

var handRanks;
//stores all of the ranks in var handRanks
handRanks = hand.map(function (card) {
    return card.rank;
});
var handSuits;
//stores all of the ranks in var handRanks
handSuits = hand.map(function (card) {
    return card.suit;
});

//TWOPAIR-------------------------------------------------------
ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank) >= 2){
        twoPair = true;
    }
    if(twoPair == true){
        console.log("Two Pair!");
    };
});

//THREE OF A KIND-------------------------------------------------------
ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank) >= 3){
        threeKind = true;
    }
    if(threeKind == true){
        console.log("Three of a kind!");
    };
});

//FOUR OF A KIND----------------------------------------------------
ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank) >= 4){
        fourKind = true;
    }
    if(fourKind == true){
        console.log("Four of a kind!");
    };
});

//FLUSH---------------------------------------------------------------
suits.forEach(function (suit){
    if (containsNTimes(handSuits, suit) == 5){
        flush = true;
    }
    if(flush == true){
        console.log("Flush!");
    };
});


//BUST
if(twoPair != true && flush !=true){
    console.log("Bust");
};


