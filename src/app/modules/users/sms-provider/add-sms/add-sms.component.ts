import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormsModule, FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-add-sms',
  imports: [
    // SharedModule
    ModulesModule
  ],
  templateUrl: './add-sms.component.html',
  styleUrl: './add-sms.component.scss'
})
export class AddSmsComponent implements OnInit {

  @Input() submitBtn!:boolean;
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
      URL: ["", [Validators.required]],
      SMSLimit: ["", [Validators.required]],
      Priority: ["", [Validators.required]],
      Description: ["", [Validators.required]],
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
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['saveProvider'],FormValue).subscribe((data: any) => {
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
