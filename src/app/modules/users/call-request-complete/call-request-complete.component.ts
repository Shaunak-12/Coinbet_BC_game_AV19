import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Component, OnInit,TemplateRef, ViewChild, Input, Output, EventEmitter,OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Validators,FormControl,FormsModule,FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-call-request-complete',
  imports: [
	// SharedModule
	ModulesModule
],
  templateUrl: './call-request-complete.component.html',
  styleUrl: './call-request-complete.component.scss'
})
export class CallRequestCompleteComponent implements OnInit {
	@Input() rowData:any;
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
			Description: [""],
			Id: [this.rowData.Id]
		});
	}
	
	onSubmit(){
		if(this.adminForm.get('Description')?.getRawValue()==''){
			this.utilities.toastMsg('warning',"Please enter Description",'');
			return;
		}
		this.submitDisabled=true;
		this.apiservice.sendRequest(config['saveCallRequest'],this.adminForm.getRawValue()).subscribe((data: any) => {
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
