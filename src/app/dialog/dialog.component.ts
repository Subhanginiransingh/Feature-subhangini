import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  candidateform !: FormGroup;
  actionBtn : string="Save"
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.candidateform = this.formBuilder.group({
      Name: ['', Validators.required],
      experiance: ['', Validators.required],
      skill: ['', Validators.required]
    });
    if(this.editData){
      this.actionBtn="Update";
      this.candidateform.controls['Name'].setValue(this.editData.Name);
      this.candidateform.controls['experiance'].setValue(this.editData.experiance);
      this.candidateform.controls['skill'].setValue(this.editData.skill);
      this.candidateform.controls['id'].setValue(this.editData.id);
    }
  }
  addCandidate() {
    if(!this.editData){
      if (this.candidateform.valid) {
        this.api.postCandidate(this.candidateform.value).subscribe({
          next:(res)=>{
            alert("candidate added successfully")
            this.candidateform.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("error while adding the candidate")
          }
        })
      }
    }
    else{
      this.updateCandidate();
    }
  }
  updateCandidate(){
    this.api.putCandidate(this.candidateform.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("candidate details update successfully");
        this.candidateform.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("error while updating");
      }
    })
  }  

}
