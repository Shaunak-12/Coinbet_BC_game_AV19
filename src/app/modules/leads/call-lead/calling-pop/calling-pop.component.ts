import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModulesModule } from '@modules/modules/modules.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-calling-pop',
  imports: [
    // SharedModule
    ModulesModule
  ],
  templateUrl: './calling-pop.component.html',
  styleUrl: './calling-pop.component.scss'
})
export class CallingPopComponent implements OnInit {
  @Input() userData:any;
  @Input() userWal:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  adminData:any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
