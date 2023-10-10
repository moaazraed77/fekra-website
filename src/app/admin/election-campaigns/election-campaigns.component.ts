import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-election-campaigns',
  templateUrl: './election-campaigns.component.html',
  styleUrls: ['./election-campaigns.component.scss']
})
export class ElectionCampaignsComponent implements OnInit {

  constructor( private formBuilder:FormBuilder , private route : Router) { }

  photoUrl : any="" ;
  
  election=this.formBuilder.group({
    photourl:["", Validators.required],
  })

  ngOnInit(): void {
  }
  submit(){
    console.log(this.election.value);
  }

  fileUpload(event:any){
      if (event.files && event.files[0]) {
          var reader = new FileReader();
          reader.onload = (e: any) => {
          this.photoUrl = e.target.result;
      }
        reader.readAsDataURL(event.files[0]);
    }
  }
}
