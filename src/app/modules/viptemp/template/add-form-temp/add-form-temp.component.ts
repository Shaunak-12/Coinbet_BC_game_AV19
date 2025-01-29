import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Subscription } from 'rxjs';
import moment from 'moment';

import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild , ViewEncapsulation,OnDestroy } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS, MatRippleModule } from '@angular/material/core';
// import _moment, { Moment } from 'moment';
import { FormControl,FormsModule,FormBuilder,FormGroup,Validators, FormArray } from '@angular/forms';
// import {MatDatepicker} from '@angular/material/datepicker';
import _moment , {default as _rollupMoment} from 'moment';
import { ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
@Component({
  selector: 'app-add-form-temp',
  imports: [
    MatProgressSpinnerModule,CommonModule,
              ReactiveFormsModule,
                  MatTableModule,
                  MatFormFieldModule,
                  MatSnackBarModule,
                  MatIconModule,
                  FormsModule,
                  MatButtonModule,
                  MatDatepickerModule,
                  MatInputModule,
                  MatNativeDateModule,
                  MatTabsModule,
                  MatDialogModule,
                  MatRadioModule,
                  MatSelectModule,
                  MatPaginatorModule,
                  MatSlideToggleModule,
                  FeatherModule,
                  MatCheckboxModule,
                  MatExpansionModule,
                  MatProgressBarModule,
                  MatRippleModule
  ],
  templateUrl: './add-form-temp.component.html',
  styleUrl: './add-form-temp.component.scss'
})
export class AddFormTempComponent implements OnInit {
  @Input() submitBtn!:boolean;
  @Input() groupArr:any=[];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  
  submitDisabled=false;
  
  resetBtn = true;
  addForm!: FormGroup;
  adminPass = '';
  userWals:any=[];
  defGrp:any=[];
  grpOps:any=[];

  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }

  ngOnInit(){
    this.userWals = JSON.parse(sessionStorage.getItem('WalList')||'{}');
    this.initializeForm();
    let mGroup1 = this.groupArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == this.addForm.get('WalletTypeId')?.getRawValue());
    if(mGroup1&&('WalletwsList' in mGroup1)){
      this.grpOps=mGroup1.WalletwsList.map(({ Id, Name }:{Id: any, Name: any}) => ({ name: Name, value: Id }));
      this.addForm.get('GroupId')?.setValue(this.grpOps[0].value);
    }
    else{
      this.grpOps=[];
      this.addForm.get('GroupId')?.setValue('');
    }
    this.addForm.get('WalletTypeId')?.valueChanges.subscribe(value => {
      let mGroup = this.groupArr.find((wal: { WalletTypeId: any; }) => wal.WalletTypeId == value);
      if(mGroup&&('WalletwsList' in mGroup)){
        this.grpOps=mGroup.WalletwsList.map(({ Id, Name }:{Id: any, Name: any}) => ({ name: Name, value: Id }));
        this.addForm.get('GroupId')?.setValue(this.grpOps[0].value);
      }
      else{
        this.grpOps=[];
        this.addForm.get('GroupId')?.setValue('');
      }
		});
  }
  
  initializeForm(){
    this.addForm = this.formBuilder.group({
      Name: ["", [Validators.required]],
      WalletTypeId: [parseInt(sessionStorage.getItem('WalChosen')||'{}')],
      SiteCode: [sessionStorage.getItem('selectedSite')],
      GroupId :['']
      });
      console.log(this.addForm.getRawValue());
  }
  
  onBack(){
    this.onCancel.emit();
  }
  
  onSubmit(){
    if(this.addForm.invalid){
      this.utilities.toastMsg('warning','Please enter Required Data!','');
    }
    else{
      this.submitDisabled=true;
      let FormValue = this.addForm.getRawValue();
      if(!FormValue.id){
        delete FormValue.id;
        this.apiservice.sendRequest(config['newTempMst'],FormValue,"newTempMst").subscribe((data: any) => {
          this.submitDisabled=false;
          if (data.ErrorCode === "1") {
            this.utilities.toastMsg('success',"Success", data.ErrorMessage);
            this.adminPass=data.ErrorMessage;
            this.addForm.disable();
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