import { CommonFunctionService } from '@services/common-function.service';
import { ApiService } from '@services/api.service';
import { config } from '@services/config';
import { Component, OnInit,TemplateRef, ViewChild, Input, Output, EventEmitter,OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Validators,FormControl,FormsModule,FormBuilder, FormGroup, FormArray, AbstractControl} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules/modules.module';

@Component({
  selector: 'app-block-user',
  imports: [
	// SharedModule
	ModulesModule
],
  templateUrl: './block-user.component.html',
  styleUrl: './block-user.component.scss'
})
export class BlockUserComponent implements OnInit {
	@Input() submitBtn!:boolean;
	@Input() isCredit=false;
	@Input() userData:any;
	@Output() onSave = new EventEmitter<any>();
	@Output() onCancel = new EventEmitter<any>();
	
	submitDisabled=false;
	adminForm!: FormGroup;
	
	constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private utilities : CommonFunctionService) { }
	
	ngOnInit(){
		this.initializeForm();
	}
	
	initializeForm(){
		this.adminForm = this.formBuilder.group({
			Description: [""],
			UserId: [this.userData.Id]
		});
	}
	
	onBack(){
		this.onCancel.emit();
	}
	
	onSubmit(){
		if(this.userData.StatusId==1 && this.adminForm.get('Description')?.getRawValue()==''){
			this.utilities.toastMsg('warning',"Please enter Remark",'');
			return;
		}
		this.submitDisabled=true;
		this.apiservice.sendRequest(config['changeUserStatus'],this.adminForm.getRawValue()).subscribe((data: any) => {
			this.submitDisabled=false;
			if (data.ErrorCode === "1") {
				this.utilities.toastMsg('success',"Success", data.ErrorMessage);
				setTimeout(()=>{
					this.onCancel.emit();
					this.onSave.emit();
				}, 1000);
			}
			else {
				this.utilities.toastMsg('warning',"Failed",data.Result + " : " + data.ErrorMessage);
				this.onSave.emit();
			}
		}, (error) => {
			console.log(error);
		});
	}
}