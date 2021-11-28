import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from '../settings.service';

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

    constructor(private settingsService :SettingsService) {
        this.settingsService.whitePieceColor$.subscribe((color)=>{
            this.whitePieceColor.setValue(color);       
        })


        this.blackPieceColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackPieceColor$.next(color);
        });

        this.whiteSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.whiteSquareColor$.next(color);
        });

        this.blackSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackSquareColor$.next(color);
        });
    }

    ngOnInit(): void {

    }

    

}
