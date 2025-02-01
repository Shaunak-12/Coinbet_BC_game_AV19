import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation,OnDestroy,TemplateRef, ViewChild } from '@angular/core';
import { FormControl,FormsModule,FormBuilder,FormGroup,Validators, FormArray } from '@angular/forms';
// import {MatDatepicker} from '@angular/material/datepicker';
import _moment , {default as _rollupMoment} from 'moment';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-approve-reel',
  imports: [
    // SharedModule
    ModulesModule
  ],
  templateUrl: './approve-reel.component.html',
  styleUrl: './approve-reel.component.scss'
})
export class ApproveReelComponent implements OnInit {

  @Input() pageData:any;
  @Input() AcceptRejectVar='A';
  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();

  DataLoader=false;
  BankDataCollumns=[]
  BankDataRows:any=[];
  Description=new FormControl('',Validators.required);

  approveDisabled=false;
  trxdisabled=false;

  constructor(private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    // console.log(this.pageData);
  }

  onBack(){
    this.onCancel.emit();
  }

  onApprove(){
    if(!this.Description.value && this.AcceptRejectVar=='R'){
      this.utilities.toastMsg('error',"Fill Description to Reject","");
    }
    else{
      let param = {Id:this.pageData.Id,StatusCode:(this.AcceptRejectVar=='A'?"A":"R"),Remarks:this.Description.value};
      this.approveDisabled=true;
      this.apiservice.sendRequest(config['changeDCPromotionStatus'],param).subscribe((data: any) => {
        this.approveDisabled=false;
        if (data.ErrorCode == "1") {
          this.utilities.toastMsg('success',data.Result, data.ErrorMessage);
          this.onBack();
          this.onSubmit.emit();
        }
        else {
          this.utilities.toastMsg('warning',data.Result,data.ErrorMessage);
        }
      }, (error) => {
        this.approveDisabled=false;
        console.log(error);
      });
    }
  }
}