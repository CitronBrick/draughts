import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    board :Array<Array<string>> = [['']];
    turn: boolean = true;


    constructor() {
        this.initGameState();
    }


    initGameState() {
        this.board = Array.from({length: 8}, (o, r)=>
            Array.from({length: 8}, (obj, c)=> {
                let blackSquare = r%2 != c%2;
                if(r < 3) {
                    return (blackSquare)?'b':'';
                } else if(r >= 5) {
                    return (blackSquare)?'w':'';
                }
                return '';
                
            })
        );
        console.log(this.board);
    }
}
