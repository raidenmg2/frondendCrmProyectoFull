import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { ROUTER_APP } from '../../core/enum/router-app.enum';
import { LoginComponent } from "../../auth/login/login.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, FooterComponent, RouterOutlet, LoginComponent]
})
export class HomeComponent  {
    get ROUTER_APP(){

        return ROUTER_APP;

    }

    

}
