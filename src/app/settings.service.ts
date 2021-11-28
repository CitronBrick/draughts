import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    whiteSquareColor$ :BehaviorSubject<string>; 
    blackSquareColor$ :BehaviorSubject<string>;
    whitePieceColor$ :Subject<string>;
    blackPieceColor$ :Subject<string>

    constructor() {
        this.whiteSquareColor$ = new BehaviorSubject('firebrick');
        this.blackSquareColor$ = new BehaviorSubject('black');
        // this.whitePieceColor$ = new BehaviorSubject('yellow');
        // this.blackPieceColor$ = new BehaviorSubject('greenyellow');
        this.whitePieceColor$ = new BehaviorSubject('orange');
        this.blackPieceColor$ = new BehaviorSubject('mediumvioletred');

    }


}
