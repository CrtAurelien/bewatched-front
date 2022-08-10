import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Montre} from "../../../core/model/Montre.interface";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  @Input()
  panier!: Montre[];
  @Input()
  totalPanier!: number;
  @Input()
  activeTemplatePanierVide!: boolean;
  @Input()
  hasError!: boolean;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

}
