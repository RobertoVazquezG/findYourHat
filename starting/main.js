const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let hatRepeated = false;
/* The Field constructor should take a two-dimensional array representing the “field” itself. A field consists of a grid containing “holes” (O) and one “hat” (^). 
We use a neutral background character (░) to indicate the rest of the field itself. The player will begin in the upper-left of the field, and the player’s path is represented by *. */

function randomSymbol() {
    if(!hatRepeated){
        let randomNumber = Math.floor(Math.random() * 5);
        if(randomNumber==0){
            hatRepeated = true;
        }
        return randomNumber;
    }
    else if(hatRepeated){
        randomNumber = Math.floor(Math.random() * 4) + 1;
        return randomNumber;
    }
}

class Field {
    constructor(arrayField){
        this.field = arrayField;
    }
    print(){
        console.log(this.field[0].join(""));
        console.log(this.field[1].join(""));
        console.log(this.field[2].join(""));
    }
    static generateField(arrayHeight, arrayWidth){
        const symbolsArray = [ hat, hole, fieldCharacter, fieldCharacter,fieldCharacter];
        let newArrayGenerated = [];
    //    newArrayGenerated[0][0] = pathCharacter;
        for(let i=0; i < arrayHeight; i++){
            for(let j=0; j < arrayWidth; j++){
                if(i==0 && j==0){
                    newArrayGenerated.push(pathCharacter);
                    continue;
                }
                newArrayGenerated.push(symbolsArray[randomSymbol()]);  
                        
            }
        }
        return newArrayGenerated;
    }
}

const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, fieldCharacter, hat]
]);

/*Your game should be playable by users. In order to facilitate this, build out the following behavior:

When a user runs main.js, they should be prompted for input and be able to indicate which direction they’d like to “move”.
After entering an instruction, the user should see a printed result of their current field map with the tiles they have visited marked with *. They should be prompted for their next move.
This should continue until the user either:

Wins by finding their hat.
Loses by landing on (and falling in) a hole.
Attempts to move “outside” the field.
When any of the above occur, let the user know and end the game.*/

let positionH = 0;
let positionV = 0;

while(true){
    myField.print();
    const input = prompt('Which way? ');
    if(input === 'u'){
        positionH--;
        if(positionH < 0){
            console.log('You lose. You are out of the bounds!');
            break;
        }
    }
    else if(input === 'd'){
        positionH++;
        if(positionH > myField.field.length - 1){
            console.log('You lose. You are out of the bounds!');
            break;
        }
    }
    else if(input === 'r'){
        positionV++;
        if(positionV > myField.field[0].length - 1){
            console.log('You lose. You are out of the bounds!');
            break;
        }
    }
    else if(input === 'l'){
        positionV--;
        if(positionV < 0){
            console.log('You lose. You are out of the bounds!');
            break;
        }
    }
    if(myField.field[positionH][positionV] === hat){
        console.log('Congrutlations!! Yout found your hat!. Bye :)');
        break;
    }
    else if(myField.field[positionH][positionV] === hole){
        console.log('You lose. You fell down in a hole! :(');
        break;
    }
    myField.field[positionH][positionV] = pathCharacter;
}

console.log(Field.generateField(4,4));
  
/* Add a .generateField() method to your Field class. This doesn’t need to be tied to a particular instance, so make it a static method of the class itself.

This method should at least take arguments for height and width of the field, and it should return a randomized two-dimensional array representing the field with a hat and one or more holes. 
In our solution, we added a third percentage argument used to determine what percent of the field should be covered in holes.*/



