import { HostListener, Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { GameService } from '../game.service';
import { SettingsService } from '../settings.service';

import { Subscription } from 'rxjs';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit, OnDestroy {


    @Input()
    row:number = 0;

    @Input()
    column:number = 0;

    @Input()
    @HostBinding('attr.data-piece')
    piece:string = '';

    @HostBinding('attr.data-bgcolor')
    bgColor: string = '';


    whiteSquareColor :string = '';
    blackSquareColor :string = '';

    @HostBinding('style.backgroundColor')
    backgroundColor :string = '';

    @HostBinding('class.square')
    className: boolean = true;

    @HostBinding('style.height')
    @HostBinding('style.width')
    squareSize :string = '';

    subscriptionList :Subscription[] = [];

    dropDisabled: boolean = false;

    constructor(private gameService :GameService, private settingsService :SettingsService) {



    }


    ngOnInit(): void {
        this.setBgColor();

        this.makeSubscriptions();
    }

    makeSubscriptions() : void {
        this.subscriptionList = [];

        //this.backgroundColor = this.isWhiteSquare()?this.whiteSquareColor:this.blackSquareColor;

        let winnerSub: Subscription = this.gameService.winner$.subscribe((winner :string)=>{
            if(winner) {
                this.dropDisabled = true;
            }
        });

        let whiteSquareSub :Subscription = this.settingsService.whiteSquareColor$.subscribe((color :string) =>{
            if(this.bgColor == 'white') {
                this.whiteSquareColor = color;
                this.setBgColor();
            }
        });

        let blackSquareSub :Subscription = this.settingsService.blackSquareColor$.subscribe((color: string)=> {
            if(this.bgColor == 'black') {
                this.blackSquareColor = color;
                this.setBgColor();
            }
        });

        let squareSizeSub :Subscription = this.settingsService.squareSize$.subscribe((size :number) => {
            this.squareSize = size + 'px';
        });


        [winnerSub,whiteSquareSub, blackSquareSub, squareSizeSub].forEach((sub :Subscription) => {
            this.subscriptionList.push(sub);
        });
    }

    ngOnChanges() :void{
        this.setBgColor();
        this.makeSubscriptions();

    }

    setBgColor(): void {
        this.bgColor = (((this.row%2) == (this.column%2))?'white':'black');
        this.backgroundColor = this.isWhiteSquare()?this.whiteSquareColor:this.blackSquareColor;
    }

    isWhiteSquare() :boolean {
        return (this.row%2) == (this.column%2); 
    }

    /*
    @HostBinding('style.backgroundColor')
    get backgroundColor() : string {
        return (this.isWhiteSquare())?this.whiteSquareColor: this.blackSquareColor;
    }
    */

    @HostListener('dragover',['$event'])
    handleDragOver(evt :DragEvent) {
        evt.preventDefault();
    }

    @HostListener('drop', ['$event']) 
    handleDrop(evt: DragEvent) {
        evt.preventDefault();

        if(this.dropDisabled) {
            return;
        }

        let data = evt?.dataTransfer?.getData('application/json');
        if(data) {
            let coord = JSON.parse(data);
            this.gameService.makeLegalMove( coord, {row: this.row, column: this.column});
        }
    }

    ngOnDestroy() {
        this.subscriptionList.forEach((sub:Subscription)=> {
            sub.unsubscribe();
        })
    }

}
