import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {

    collapedSideBar: boolean;
    screenPicker: string;

    constructor(private authService: AuthService) {}

    ngOnInit() {

    }

    ngAfterContentChecked(): void {
        // Called after every check of the component's or directive's content.
        // Add 'implements AfterContentChecked' to the class.
        this.authService.screenPicker.subscribe(
            tela => this.screenPicker = tela
        );
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
