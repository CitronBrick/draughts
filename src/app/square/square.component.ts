import { HostListener, Component, OnInit, Input, HostBinding } from '@angular/core';
import { GameService } from '../game.service';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {


    @Input()
    row:number = 0;

    @Input()
    column:number = 0;

    @Input()
    @HostBinding('attr.data-piece')
    piece:string = '';

    @HostBinding('attr.data-bgcolor')
    bgColor: string = '';

    @HostBinding('class.square')
    className: boolean = true;

    dropDisabled: boolean = false;

    constructor(private gameService :GameService) {
        this.gameService.winner$.subscribe((winner :string)=>{
            if(winner) {
                this.dropDisabled = true;
            }
        });
    }

    ngOnInit(): void {
        this.setBgColor();
    }

    ngOnChanges() :void{
        this.setBgColor();
    }

    setBgColor(): void {
        this.bgColor = (((this.row%2) == (this.column%2))?'red':'black');
    }

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
            // this.gameService.move(coord, {row: this.row, column: this.column});
            this.gameService.makeLegalMove( coord, {row: this.row, column: this.column});
        }
    }



}
