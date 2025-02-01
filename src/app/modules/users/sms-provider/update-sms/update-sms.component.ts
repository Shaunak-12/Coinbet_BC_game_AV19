import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Component, OnInit,TemplateRef, ViewChild, Input, Output, EventEmitter,OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import {Validators,FormControl,FormsModule,FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-update-sms',
  imports: [
    // SharedModule
    ModulesModule
  ],
  templateUrl: './update-sms.component.html',
  styleUrl: './update-sms.component.scss'
})
export class UpdateSmsComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() userData:any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  addSms!: FormGroup;
  adminPass = '';

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.initializeForm();
  }
  
  initializeForm(){
    this.addSms = this.formBuilder.group({
      URL: [this.userData.ProviderUrl, [Validators.required]],
      SMSLimit: [this.userData.SMSLimit, [Validators.required]],
      ResetDate: [this.userData.ResetDate?moment(this.userData.ResetDate).format("yyyy-MM-DD"):'', [Validators.required]],
      Description: [this.userData.Description, [Validators.required]],
      SiteCode: [sessionStorage.getItem('selectedSite')]
      });
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.addSms.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.addSms.getRawValue();
      FormValue.Id = this.userData.Id;
      if(!FormValue.id){
        this.apiservice.sendRequest(config['updateLan'],FormValue).subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.addSms.disable();
            this.onCancel.emit();
          }
          else {
            this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
          }
          this.onSave.emit();
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

}
