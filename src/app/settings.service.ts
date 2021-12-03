import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    whiteSquareColor$ :BehaviorSubject<string>; 
    blackSquareColor$ :BehaviorSubject<string>;
    whitePieceColor$ :Subject<string>;
    blackPieceColor$ :Subject<string>;

    squareSize$ : Subject<number>;

    constructor() {
        this.whiteSquareColor$ = new BehaviorSubject('#B22222'); // firebrick
        this.blackSquareColor$ = new BehaviorSubject('#000000'); // black
        this.whitePieceColor$ = new BehaviorSubject('#FFA500'); // orange
        this.blackPieceColor$ = new BehaviorSubject('#C71585'); // mediumvioletred

        this.squareSize$ = new BehaviorSubject(50);

    }


}
