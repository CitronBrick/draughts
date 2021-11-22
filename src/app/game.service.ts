import { Injectable } from '@angular/core';
import {Coord} from './coord';
import { Move } from './move';

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

    move(origin :Coord, destination: Coord) {
        let p = this.board[origin.row][origin.column];
        this.board[destination.row][destination.column] = (p == 'b' && destination.row == 7 || p == 'w' && destination.row == 0)?p.toUpperCase():p;
        this.board[origin.row][origin.column] = '';
    }

    makeLegalMove(origin :Coord, destination:Coord) {
        let possibleMoveList = this.findPossibleMoves(this.turn?'w':'b');
        let legal = possibleMoveList.find((m,i)=>(origin.row == m.origin.row && origin.column == m.origin.column && destination.row == m.destination.row && destination.column == m.destination.column));
        if(legal) {
            this.move(origin, destination);
            this.turn = !this.turn;
        }
    }

    findPossibleMoves(color :string) :Move[]  {
        let res :Move[] = [];
        this.board.forEach((row,r)=>{
            row.forEach((piece,c)=> {
                if(piece.toLowerCase() == color) {
                    let destinationList: Coord[] = [];
                    let legal = false;
                    if(piece == 'b' || piece == 'B') {
                        if(r < 7) {
                            if(c < 7 &&  !this.board[r+1][c+1]) {
                                // res.push({row: r+1, column: c+1, capture: false});
                                destinationList.push({row: r+1 , column: c+1});
                                legal = true;
                            }
                            if(c > 0 && !this.board[r+1][c-1]) {
                                // res.push({row: r+1, column: c-1, capture: false});
                                destinationList.push({row: r+1, column: c-1});
                                legal = true;
                            }
                        }   
                        if(piece == 'B') {
                            if(r > 0) {
                                if(c > 0 && !this.board[r-1][c-1]) {
                                    // res.push({row: r-1, column: c-1, capture: false});
                                    destinationList.push({row: r-1, column:c-1});
                                    legal = true;
                                }
                                if(c < 7 && !this.board[r-1][c+1]) {
                                    destinationList.push({row: r-1, column:c+1});
                                    legal = true;
                                } 
                            }
                        }
                    }
                    if(piece == 'w' || piece == 'W') {
                        if(r > 0) {
                            if(c < 7 && !this.board[r-1][c+1]) {
                                // res.push({row: r-1, column: c+1, capture:false});
                                destinationList.push({row: r-1, column:c+1});
                                legal = true;
                            }
                            if( c > 0 && !this.board[r-1][c-1]) {
                                // res.push({row: r-1, column: c-1, capture: false});        
                                destinationList.push({row: r-1, column:c-1});
                                legal = true;
                            }
                        }
                        if(piece == 'W') {
                            console.log('white queen');
                            if(r < 7) {
                                console.log('not bottom row');
                                if(c > 0 && !this.board[r+1][c-1]) {
                                    console.log('left free');
                                    // res.push({row: r+1, column: c-1, capture: false});
                                    destinationList.push({row: r+1, column: c-1});
                                    legal = true;
                                }
                                if(c < 7 && !this.board[r+1][c+1]) {
                                    console.log('right free');

                                    // res.push({row: r+1, column: c-1, capture: false});
                                    destinationList.push({row: r+1, column: c+1});
                                    legal = true;
                                }

                            }
                        }
                    }
                    if(legal && destinationList.length) {
                        destinationList.forEach((destination)=>{
                            res.push({origin: {row: r, column: c }, destination: destination, capture: false});
                        });
                    }
                }
            });
        });
        return res;
    }
}
