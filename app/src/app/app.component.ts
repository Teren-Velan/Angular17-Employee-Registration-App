import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  steplist: StepListType[] = [
    {
      stepName:'Basic Details',
      isComplete:false
    },
    {
      stepName:'Skills',
      isComplete:false
    },
    {
      stepName:'Experience',
      isComplete:false
    }
  ];

  activeStep: StepListType = this.steplist[0]

  setActiveStep(activeStep:StepListType){
    this.activeStep = activeStep
  }


}


interface StepListType {
  stepName:string,
  isComplete:boolean
}