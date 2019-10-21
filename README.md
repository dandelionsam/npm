## Main Points
The goal is to have a complete and working roulette system, with bet and credit management.
In this package you can send information, arrange in certain way (explained below) and have a return of the result of all your bets.

### At the moment the system is able to manage the request only per single player

## Install
``` $ npm install roulette-dande ```

## Usage
You can call the package with the well known syntax:
```javascript
const roulette = require('roulette-dande');
```

First of all, you **must** set the initial credit of the player, using the ``` setCredit( bar ) ``` method like this:
```javascript
var onegilliondollar = 1000000000000000;
roulette.setCredit(onegilliondollar);
```

You can later know what is the player credit calling the _getter_ method:
```javascript
var playerCredit = roulette.getCredit();
```

Then you can have your result calling the ``` play( bar ) ``` method which require a bet array to be passed.
In this way, the code will extract a single number, evaluate the bets:
```javascript
var results = roulette.play( bar ); 
```

**Pay attention: the extraction will happen every time you call the play method.**
Later, if there will be needs, I can improve this adding more custom functions. 

The return will be an array you can handle as a JSON object, which contains:
* Initial credit of the player
* First bet result
* Second bet result (if there is one)
* Other bet result (if there are any)
* Final credit of the player after calculations