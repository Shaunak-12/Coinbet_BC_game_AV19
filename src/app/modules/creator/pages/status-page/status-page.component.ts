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
  selector: 'app-status-page',
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
  templateUrl: './status-page.component.html',
  styleUrl: './status-page.component.scss'
})
export class StatusPageComponent implements OnInit {
	@Input() isCredit=false;
	@Input() pageData:any;
	@Output() onSave = new EventEmitter<any>();
	@Output() onCancel = new EventEmitter<any>();
	
	submitDisabled=false;
	pagestatusForm!: FormGroup;
	
	constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
	
	ngOnInit(){
		// console.log(this.pageData);
		this.initializeForm();
	}
	
	initializeForm(){
		this.pagestatusForm = this.formBuilder.group({
			Description: [""],
			DCPageId: [this.pageData.DCPageId]
		});
	}
	
	onBack(){
		this.onCancel.emit();
	}
	
	onSubmit(){
		if(this.pageData.StatusId==1 && this.pagestatusForm.get('Description')?.getRawValue()==''){
			this.utilities.toastMsg('warning',"Please enter Remark",'');
			return;
		}
		this.submitDisabled=true;
		this.apiservice.sendRequest(config['changeCreatorPageStatus'],this.pagestatusForm.getRawValue()).subscribe((data: any) => {
			if (data.ErrorCode === "1") {
				this.utilities.toastMsg('success',"Success", data.ErrorMessage);
				this.onSave.emit({value:this.pageData.StatusId==1?0:1});
				this.onCancel.emit();
			}
			else {
				this.submitDisabled=false;
				this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
				this.onSave.emit({value:this.pageData.StatusId});
			}
		}, (error) => {
			console.log(error);
		});
	}
}