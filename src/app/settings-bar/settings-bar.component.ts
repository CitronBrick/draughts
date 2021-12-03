import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { distinct } from 'rxjs';

@Component({
    selector: 'app-settings-bar',
    templateUrl: './settings-bar.component.html',
    styleUrls: ['./settings-bar.component.css']
})
export class SettingsBarComponent implements OnInit {

    whitePieceColor: FormControl = new FormControl('');
    blackPieceColor :FormControl = new FormControl('');
    whiteSquareColor :FormControl = new FormControl('');
    blackSquareColor :FormControl = new FormControl('');
    squareSize :FormControl = new FormControl('');

    constructor(private settingsService :SettingsService) {
        
    }


    /* distinct is used to avoid infinite sync between SettingsService & FormControl */
    ngOnInit(): void {
        this.settingsService.whitePieceColor$.pipe(distinct()).subscribe((color)=>{
            this.whitePieceColor.setValue(color);       
        });

        this.whitePieceColor.valueChanges.subscribe((color)=> {
            this.settingsService.whitePieceColor$.next(color);
        });

        this.settingsService.blackPieceColor$.pipe(distinct()).subscribe((color)=>{
            this.blackPieceColor.setValue(color);
        });


        this.blackPieceColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackPieceColor$.next(color);
        });

        this.settingsService.whiteSquareColor$.pipe(distinct()).subscribe((color)=>{
            this.whiteSquareColor.setValue(color);
        })

        this.whiteSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.whiteSquareColor$.next(color);
        });

        this.settingsService.blackSquareColor$.pipe(distinct()).subscribe((color)=>{
            this.blackSquareColor.setValue(color);
        });

        this.blackSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackSquareColor$.next(color);
        });

        this.settingsService.squareSize$.pipe(distinct()).subscribe((size)=>{
            this.squareSize.setValue(size);
        });

        this.squareSize.valueChanges.subscribe((size)=>{
            this.settingsService.squareSize$.next(size);
        });
    }

    

}
