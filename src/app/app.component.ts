import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HomeComponent } from './page/home/home.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from "./stepper/stepper.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, FooterComponent, CdkStepperModule, StepperComponent]
})
export class AppComponent {
  title = 'proyectoCrm';
}
