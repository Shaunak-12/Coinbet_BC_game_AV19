import { ActivatedRoute } from '@angular/router';
import { AdvanceTableComponent } from '@shared/advance-table/advance-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation,OnDestroy,TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-approve-reel',
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