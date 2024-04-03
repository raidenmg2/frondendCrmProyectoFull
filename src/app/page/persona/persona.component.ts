import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
    selector: 'app-persona',
    standalone: true,
    templateUrl: './persona.component.html',
    styleUrl: './persona.component.css',
    imports: [HeaderComponent]
})
export class PersonaComponent {

}
