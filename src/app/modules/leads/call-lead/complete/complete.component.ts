import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { FormControl,FormsModule,FormBuilder,FormGroup, FormArray } from '@angular/forms';
// import {MatDatepicker} from '@angular/material/datepicker';
import _moment , {default as _rollupMoment} from 'moment';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-complete',
  imports: [
    // SharedModule
    ModulesModule
  ],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss'
})
export class CompleteComponent implements OnInit {
  @Input() userData:any;
  @Input() userWal:any;
  @Output() onSave = new EventEmitter<any>();
    
  submitDisabled=false;
  adminForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
  
  ngOnInit(){
    // console.log(this.rowData);
    this.initializeForm();
  }
  
  initializeForm(){
    this.adminForm = this.formBuilder.group({
      Remark: [""],
      PlayerId: [this.userData.UserId],
      WalletTypeId:[this.userWal]
    });
  }
  
  onSubmit(){
    if(this.adminForm.get('Remark')?.getRawValue()==''){
      this.utilities.toastMsg('warning',"Please enter Description",'');
      return;
    }
    this.submitDisabled=true;
    this.apiservice.sendRequest(config['saveUserCall'],this.adminForm.getRawValue(),'saveUserCall').subscribe((data: any) => {
      this.submitDisabled=false;
      if (data.ErrorCode === "1") {
        this.utilities.toastMsg('success',"Success", data.ErrorMessage);
        setTimeout(()=>{
          this.onSave.emit();
        }, 1000);
      }
      else {
        this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
      }
    }, (error) => {
      console.log(error);
    });
  }
  }
  