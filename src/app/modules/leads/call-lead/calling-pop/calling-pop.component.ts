import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

import { config } from '@services/config';
import { ApiService } from '@services/api.service';
import { CommonFunctionService } from '@services/common-function.service';

@Component({
  selector: 'app-calling-pop',
  imports: [],
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
