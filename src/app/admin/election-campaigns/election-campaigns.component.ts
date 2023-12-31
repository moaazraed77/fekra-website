import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { election } from '../interfaces/election.interface';
import { Database } from '@angular/fire/database';
import { DataService } from 'src/app/new-services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-election-campaigns',
  templateUrl: './election-campaigns.component.html',
  styleUrls: ['./election-campaigns.component.scss']
})
export class ElectionCampaignsComponent implements OnInit {


  // api_link="http://markitingwebsite-001-site1.dtempurl.com";
  // formData: FormData= new FormData();

  
  // for control the view 
  controlItem:string ="";
  uploadingImg:string="";
  // variables for getting the data 
  photoUrl : any="" ;
  electionList:election[]=[ ]
  // for add the image
  election=this.formBuilder.group({
    image:[{}, Validators.required],
    id:[new Date().getTime()]
  })
  // for update the image 
  updateObject:election={
    id:0,
    image:""
  }

  constructor( private formBuilder:FormBuilder ,private db:Database, private dataServ:DataService , private firestorage:AngularFireStorage) {
    this.controlShow("showData")
   }

  ngOnInit(): void {
  }

  // ----------------------- to control the show   with API  -----------------------
  controlShow(data:string){
    this.controlItem=data;
    if(data=="showData"){
      this.electionList=[];
      setTimeout(() => { this.getData() }, 700);
    }
  }

  // -----------  for uploading image on firebase  ----------
  async uploadImg(event:any){
    this.uploadingImg="uploadingImg";
    const file=event.target.files[0];
    if(file){
      const path=`fekra/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.photoUrl=url;
    }
    this.uploadingImg="imgUploaded";
    this.election.patchValue({
      image:this.photoUrl
    })
  }



  // -------------------- get data for firebase  --------------------
  getData(){
    this.dataServ.getElection().subscribe(data=>{
      for (const key in data) {
        this.electionList.push(data[key])
      }
    })
  }
  // -------------- sending data to function() ----------------
  submit(){
    if(this.controlItem=="add"){
      this.dataServ.createElection(this.election.value)
    }else {
      this.dataServ.getElection().subscribe(data=>{
        for (const key in data) {
          if(data[key].id==this.updateObject.id){
            this.dataServ.updateElection(key,this.election.value)
          }
        }
      })
    }
    setTimeout(() => { this.controlShow("showData"); this.photoUrl=""  }, 700);
  }
  // ----------------- to update data -------------------
  editItem(item:election){
    this.updateObject=item;
    this.election.patchValue({
      id:this.updateObject.id
    })
  }
  // ----------------- for deleting item -----------------
  deleteItem(id:number){
    this.dataServ.getElection().subscribe(data=>{
      for (const key in data) {
        if(data[key].id==id)
          this.dataServ.deleteElection(key);
      }
    })
    this.controlShow("showData")
  }



}





  // fileUploaded(event:any){
  // code should be ... because we want to send file as it is created in => event.target.files[0] - not to add it again to formdata
    // this.formData=new FormData;
    // const  file =event.target.files[0];
    // this.formData.append('file', file);
    //  this.election.patchValue({
    //   image:event.target.files[0]
    // })
    //  this.dataServ.createElection(this.election.value).subscribe(
    //   (response) => {
    //     console.log('File uploaded successfully', response);
    //   },
    //   (error) => {
    //     console.error('Error uploading file', error);
    //   }
    //  )
  // }


// submit database for the ASP.Net
  // submit(){
  //   if(this.controlItem=="add"){
  //     this.dataServ.createElection(this.formData).subscribe(
  //       (response: any) => {
  //         console.log('File uploaded successfully', response);
  //       },
  //       (error: any) => {
  //         console.error('Error uploading file', error);
  //       }
  //      )
  //   }else {
  //     this.dataServ.updateElection(this.updateObject.id,this.formData).subscribe(
  //       (response: any) => {
  //         console.log('File uploaded successfully', response);
  //       },
  //       (error: any) => {
  //         console.error('Error uploading file', error);
  //       }
  //      )
  //   }
  // }