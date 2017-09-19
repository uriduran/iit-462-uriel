//init empty array
var hand = [
    {"rank": "two", "suit":"hearts"},
    {"rank": "two", "suit":"spades"},
    {"rank": "two", "suit":"diamonds"},
    {"rank": "king", "suit":"clubs"},
    {"rank": "seven", "suit":"diamonds"}

];

//ALL POSSIBLE RANKS

var ranks = ["two", "three", "four", "five", "seven","eight","nine","ten","jack","queen","king","ace"];

var twoPair = false;
var threeKind = false;


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


//TWOPAIR-------------------------------------------------------
ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank) <= 2){
        twoPair = true;
    }
    if(twoPair == true){
        console.log("Two Pair!");
    };
});

//THREE OF A KIND-------------------------------------------------------

ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank) == 3){
        threeKind = true;
    }
    if(threeKind == true){
        console.log("Three of a kind!");
    };
});
