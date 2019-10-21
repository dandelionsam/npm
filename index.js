
var credit = undefined;
var extNum = undefined;

var comboPrizes = {
    "plein" : 35,
    "cheval" : 17,
    "transversale_pleine" : 11,
    "carre" : 8,
    "transversale_simple" : 5,
    "even" : 1,
    "odd" : 1,
    "red" : 1,
    "black" : 1,
    "manque" : 1,
    "passe" : 1
};

var numbers = [ {id: 0, colour: "GREEN", parity: "ZERO", dozen: "ZERO", column: "ZERO"},
    {id: 1, colour: "RED", parity: "ODD", dozen: "ST", column: "ST"},
    {id: 2, colour: "BLACK", parity: "EVEN", dozen: "ST", column: "ND"},
    {id: 3, colour: "RED", parity: "ODD", dozen: "ST", column: "RD"},
    {id: 4, colour: "BLACK", parity: "EVEN", dozen: "ST", column: "ST"},
    {id: 5, colour: "RED", parity: "ODD", dozen: "ST", column: "ND"},
    {id: 6, colour: "BLACK", parity: "EVEN", dozen: "ST", column: "RD"},
    {id: 7, colour: "RED", parity: "ODD", dozen: "ST", column: "ST"},
    {id: 8, colour: "BLACK", parity: "EVEN", dozen: "ST", column: "ND"},
    {id: 9, colour: "RED", parity: "ODD", dozen: "ST", column: "RD"},
    {id: 10, colour: "BLACK", parity: "EVEN", dozen: "ST", column: "ST"},
    {id: 11, colour: "BLACK", parity: "ODD", dozen: "ST", column: "ND"},
    {id: 12, colour: "RED", parity: "EVEN", dozen: "ST", column: "RD"},
    {id: 13, colour: "BLACK", parity: "ODD", dozen: "ND", column: "ST"},
    {id: 14, colour: "RED", parity: "EVEN", dozen: "ND", column: "ND"},
    {id: 15, colour: "BLACK", parity: "ODD", dozen: "ND", column: "RD"},
    {id: 16, colour: "RED", parity: "EVEN", dozen: "ND", column: "ST"},
    {id: 17, colour: "BLACK", parity: "ODD", dozen: "ND", column: "ND"},
    {id: 18, colour: "RED", parity: "EVEN", dozen: "ND", column: "RD"},
    {id: 19, colour: "RED", parity: "ODD", dozen: "ND", column: "ST"},
    {id: 20, colour: "BLACK", parity: "EVEN", dozen: "ND", column: "ND"},
    {id: 21, colour: "RED", parity: "ODD", dozen: "ND", column: "RD"},
    {id: 22, colour: "BLACK", parity: "EVEN", dozen: "ND", column: "ST"},
    {id: 23, colour: "RED", parity: "ODD", dozen: "ND", column: "ND"},
    {id: 24, colour: "BLACK", parity: "EVEN", dozen: "ND", column: "RD"},
    {id: 25, colour: "RED", parity: "ODD", dozen: "RD", column: "ST"},
    {id: 26, colour: "BLACK", parity: "EVEN", dozen: "RD", column: "ND"},
    {id: 27, colour: "RED", parity: "ODD", dozen: "RD", column: "RD"},
    {id: 28, colour: "BLACK", parity: "EVEN", dozen: "RD", column: "ST"},
    {id: 29, colour: "BLACK", parity: "ODD", dozen: "RD", column: "ND"},
    {id: 30, colour: "RED", parity: "EVEN", dozen: "RD", column: "RD"},
    {id: 31, colour: "BLACK", parity: "ODD", dozen: "RD", column: "ST"},
    {id: 32, colour: "RED", parity: "EVEN", dozen: "RD", column: "ND"},
    {id: 33, colour: "BLACK", parity: "ODD", dozen: "RD", column: "RD"},
    {id: 34, colour: "RED", parity: "EVEN", dozen: "RD", column: "ST"},
    {id: 35, colour: "BLACK", parity: "ODD", dozen: "RD", column: "ND"},
    {id: 36, colour: "RED", parity: "EVEN", dozen: "RD", column: "RD"}, ];

exports.getCredit = function(){ return credit; };
exports.setCredit = function(amount){ credit = amount; };

function extract(){
    extNum = Math.floor(Math.random() * 37);
    return extNum;
};

function getMultiplier(betType){
    if (typeof(betType) === "object"){

        // bet type is a number or an array of numbers
        // checking array length to determine which type of combo is

        switch(betType.length){
            case 1: return multiplier = comboPrizes.plein;
            case 2: return multiplier = comboPrizes.cheval;
            case 3: return multiplier = comboPrizes.transversale_pleine;
            case 4: return multiplier = comboPrizes.carre;
            case 6: return multiplier = comboPrizes.transversale_simple;
            default: return 1;
        }
    
    } else if (typeof(betType) === "string"){

        // bet type is simple
        // have not to check the string content to determine which type of bet is
        // because the multiplier is same for this type of bets

        return 1;
    }
}

var bet3 = [
    {
        play: [3,4,5,6,7,8],
        amount: 15
    },
];

exports.play = function(bet){
    
    if (credit === undefined) {
        return "You must set the player credit first.";
    }

    var resMessage = [];
    resMessage.push({startCredit: exports.getCredit()});
    resMessage.push({extraction: extract()});

    for (let i = 0; i < bet.length; i++){

        var play = bet[i].play;
        var amount = bet[i].amount;

        if ((play.length >= 1 || play.length === undefined) && typeof(play) !== "string"){

            // the bet is on a single number 
            // or on an array of numbers

            var mult = getMultiplier(play);
            
            for (let j = 0; j < play.length; j++){
                if (play[j] == extNum){
                    exports.setCredit(exports.getCredit() + amount * mult);
                    resMessage.push({message: "Bet won with number " + play[j]});
                    lostBet = false;
                    break;
                    // console.log(exports.getCredit());
                    // return "Bet won with number " + play[j];
                } else {
                    lostBet = true;
                }
            }

            // This control here will help us to understand when, having a single bet on multiple numbers,
            // it result in a loss because every single number we played is not the extracted number, so
            // it will enable the "lostBet" boolean switch at the top of this comment in order to check it
            // after the loop is done.

            if (lostBet){
                exports.setCredit(exports.getCredit() - amount);
                resMessage.push({message: "Bet lost." + " You lost " + amount});
                
                // console.log(exports.getCredit());
                //return "Bet lost";
            }

        } else {

            // the bet type is string
            // FIXME: or can it be an empty array

            var mult = 1;

            if ((play == "EVEN"     && numbers[extNum].parity == "EVEN")         ||
                (play == "ODD"      && numbers[extNum].parity == "ODD")          ||
                (play == "RED"      && numbers[extNum].colour == "RED")          ||
                (play == "BLACK"    && numbers[extNum].colour == "BLACK")        ||
                (play == "MANQUE"   && (extNum >= 1  && extNum <= 18))  ||
                (play == "PASSE"    && (extNum >= 19 && extNum <= 36))  ||
                (play == "ST-COL"   && numbers[extNum].column == "ST")           || 
                (play == "ND-COL"   && numbers[extNum].column == "ND")           || 
                (play == "RD-COL"   && numbers[extNum].column == "RD")           || 
                (play == "ST-DOU"   && numbers[extNum].dozen == "ST")            || 
                (play == "ND-DOU"   && numbers[extNum].dozen == "ND")            || 
                (play == "RD-DOU"   && numbers[extNum].dozen == "RD")){
                    exports.setCredit(exports.getCredit() + amount * mult);
                    resMessage.push({message: "Bet " + play + " won with number " + extNum});
                    
                    // console.log(exports.getCredit());
                    // return "Bet " + play + " won with number " + extNum;

                } else {
                    exports.setCredit(exports.getCredit() - amount);
                    resMessage.push({message: "Bet lost." + " You lost " + amount});
                    
                    // console.log(exports.getCredit());
                    //return "Bet lost";
                }
        }
    }

    resMessage.push({finalCredit: exports.getCredit()});
    return resMessage;
}; 