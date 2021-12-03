import { Injectable } from '@angular/core';
import {Coord} from './coord';
import { Move } from './move';

import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    board :Array<Array<string>> = [['']];
    turn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // white turn
    winner$: Subject<string> = new Subject();


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
        this.turn$.next(true);
        this.winner$.next('');

    }

    move(origin :Coord, destination: Coord, capture: Coord|false) {
        let p = this.board[origin.row][origin.column];
        this.board[destination.row][destination.column] = (p == 'b' && destination.row == 7 || p == 'w' && destination.row == 0)?p.toUpperCase():p;
        this.board[origin.row][origin.column] = '';
        if(capture) {
            this.board[capture.row][capture.column] = '';
        }
    }

    makeLegalMove(origin :Coord, destination:Coord) {
        let possibleMoveList = this.findPossibleMoves(this.turn$.value?'w':'b');
        let legal:Move|undefined = possibleMoveList.find((m,i)=>(origin.row == m.origin.row && origin.column == m.origin.column && destination.row == m.destination.row && destination.column == m.destination.column));
        if(legal) {
            this.move(origin, destination, legal.capture);
            this.turn$.next(!this.turn$.value);
        }
        this.checkWin();
    }

    checkWin() {
        ['w','b'].forEach((color)=>{
            let colorList: string[] = this.board.flat().filter(p=>p.toLowerCase() == color);
            if(colorList.length == 0) {
                let winner = (color=='w')?'Black':'White';
                this.winner$.next(winner);
                alert(winner + ' has won !!!');
            }
        })
    }

    findPossibleMoves(color :string) :Move[]  {
        let res :Move[] = [];
        this.board.forEach((row,r)=>{
            row.forEach((piece,c)=> {
                if(piece.toLowerCase() == color) {
                    var captureList: Move[] = this.findPossibleCaptures(piece, r, c);
                    if(captureList.length) { 
                        res = res.concat(captureList);
                    }
                    let destinationList: Coord[] = [];
                    let legal = false;
                    if(piece == 'b' || piece == 'B') {
                        if(r < 7) {
                            // black piece move right
                            if(c < 7 &&  !this.board[r+1][c+1]) {
                                // res.push({row: r+1, column: c+1, capture: false});
                                destinationList.push({row: r+1 , column: c+1});
                                legal = true;
                            }
                            // black piece move left
                            if(c > 0 && !this.board[r+1][c-1]) {
                                // res.push({row: r+1, column: c-1, capture: false});
                                destinationList.push({row: r+1, column: c-1});
                                legal = true;
                            }
                        }   
                        if(piece == 'B') {
                            if(r > 0) {
                                // black queen move left backwards
                                if(c > 0 && !this.board[r-1][c-1]) {
                                    // res.push({row: r-1, column: c-1, capture: false});
                                    destinationList.push({row: r-1, column:c-1});
                                    legal = true;
                                }
                                // black queen move right backwards
                                if(c < 7 && !this.board[r-1][c+1]) {
                                    destinationList.push({row: r-1, column:c+1});
                                    legal = true;
                                } 
                            }
                        }
                    }
                    if(piece == 'w' || piece == 'W') {
                        if(r > 0) {
                            // white piece move right
                            if(c < 7 && !this.board[r-1][c+1]) {
                                // res.push({row: r-1, column: c+1, capture:false});
                                destinationList.push({row: r-1, column:c+1});
                                legal = true;
                            }
                            // white piece move left
                            if( c > 0 && !this.board[r-1][c-1]) {
                                // res.push({row: r-1, column: c-1, capture: false});        
                                destinationList.push({row: r-1, column:c-1});
                                legal = true;
                            }
                        }
                        if(piece == 'W') {
                            if(r < 7) {
                                // white queen move left backwards
                                if(c > 0 && !this.board[r+1][c-1]) {
                                    // res.push({row: r+1, column: c-1, capture: false});
                                    destinationList.push({row: r+1, column: c-1});
                                    legal = true;
                                }
                                // white queen move right backwards
                                if(c < 7 && !this.board[r+1][c+1]) {

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
        // force capture
        if(res.some(m=>m.capture)) {
            res = res.filter(m=>m.capture);
        }
        return res;
    }


    findPossibleCaptures(piece :string, row: number, column :number) {
        var res:Move[] = [];
        var origin = {row,column};
        let targetList = [
            [[-1,-1],[-2,-2]],
            [[-1,+1],[-2,+2]],
            [[+1,-1],[+2,-2]],
            [[+1,+1],[+2,+2]]
        ];
        // white and black queen capture
        if(piece.toUpperCase() == piece) {
            res = res.concat(this.findCapturesForPiece(piece, row, column, targetList));
        } else if(piece == 'w') {
            res = res.concat(this.findCapturesForPiece(piece, row, column, targetList.slice(0,2)));
        } else if(piece == 'b') {
            res = res.concat(this.findCapturesForPiece(piece, row, column, targetList.slice(2)));
        }
        return res;
    }

    findCapturesForPiece(piece: string, row: number, column :number, targetList : number[][][]) :Move[] {
        let result :Move[] = [];
        return targetList.reduce((acc,pair)=> {
            let res = acc;
            // capture and destination must be within board
            if(pair.every((c)=> (this.within(row+c[0],0,7) && this.within(column+c[1],0,7) ))) {
                let p = this.board[row + pair[0][0]][column + pair[0][1]];
                if(this.areEnemies(piece,p) && !this.board[row+pair[1][0]][column+pair[1][1]] ) {
                    let capture = this.arrayToCoord([row + pair[0][0], column + pair[0][1]]);
                    let destination = this.arrayToCoord([row + pair[1][0], column+pair[1][1]]);
                    res = res.concat({origin:{row,column}, destination , capture});
                }
            }
            return res;
        },result);
    }

    arrayToCoord([row,column] : number[]): Coord {
        return {row,column};
    }

    areEnemies(color1 :string, color2 :string): boolean {
        return (color1 && color2)?(color1.toLowerCase() != color2.toLowerCase()):false;
    }

    within(num:number,min:number,max:number) :boolean  {
        return num >= min && num <= max;
    }


}


