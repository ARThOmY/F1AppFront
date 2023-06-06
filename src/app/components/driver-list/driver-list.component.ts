import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import {Driver} from 'src/app/models/driver';
import {Team} from 'src/app/models/teams';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit{

  constructor(private driverService : DriverService, private modalService : NgbModal, private teamService : TeamService){}
  public pilotos : Driver[] = []
  public teamList : Team[] = []

  driver = new Driver()
  driverForm: FormGroup
  team_id 

  nameView = ""
  lastNameView = ""
  ageView = ""
  carNumberView = ""
  nationalityView = ""
  positionView = ""
  teamView = ""

  ngOnInit(): void {

    this.driver.name = ''
    this.driver.age = null
    this.driver.carNumber = null
    this.driver.lastName = ""
    this.driver.nationality = ""
    this.driver.position = null

  
    this.driverForm = new FormGroup({
    'inputName' : new FormControl(this.driver.name, {validators: [Validators.required], updateOn: 'blur'}),
    'inputLastName' : new FormControl(this.driver.lastName, {validators: [Validators.required], updateOn: 'blur'}), 
    'inputAge' : new FormControl(this.driver.age, {validators: [Validators.required], updateOn: 'blur'}),
    'inputCarNumber' : new FormControl(this.driver.carNumber, {validators: [Validators.required], updateOn: 'blur'}),
    'inputNationality' : new FormControl(this.driver.nationality, {validators: [Validators.required], updateOn: 'blur'}),
    'inputPosition' : new FormControl(this.driver.position, {validators: [Validators.required], updateOn: 'blur'}),
    'teamId' : new FormControl(this.team_id, {validators: [Validators.required], updateOn : 'blur'}) 
  })

  
    this.driverService.getAll().subscribe(response => {
      console.log(response)
      this.pilotos = response
      this.pilotos.sort((a, b) => a.position - b.position)
    }, error =>{
      alert("Error")
    })

    this.teamService.getAll().subscribe(response =>{
      console.log(response)
      this.teamList = response
    },error =>{
      alert("Error al obtener los equipos")
    })  
  }

  get name(){return this.driverForm.get('inputName')}
  get lastName(){return this.driverForm.get('inputLastName')}
  get age(){return this.driverForm.get('inputAge')}
  get carNumber(){return this.driverForm.get('inputCarNumber')}
  get nationality(){return this.driverForm.get('inputNationality')}
  get position(){return this.driverForm.get('inputPosition')}
  get team(){return this.driverForm.get('teamId')}


  delete(id : number){
    this.driverService.delete(id).subscribe(()=>{
      location.reload()
      alert("Baja Exitosa")
    }, error =>{
      console.error(error)
    })
  }
  add(){
    let piloto = new Driver()
    piloto.name = this.name.value
    piloto.lastName = this.lastName.value
    piloto.age = parseInt(this.age.value)
    piloto.carNumber = parseInt(this.carNumber.value)
    piloto.position = parseInt(this.position.value)
    piloto.nationality = this.nationality.value
    this.driverService.add(piloto, parseInt(this.team.value) ).subscribe(()=>{
      location.reload()
      alert("Alta Exitosa")
      location.reload
    }, error =>{
      console.error(error)
    })
  }

  view(ver : any, p : Driver){

    this.nameView = p.name
    this.lastNameView = p.lastName
    this.ageView = p.age.toString()
    this.carNumberView = p.carNumber.toString()
    this.positionView = p.position.toString()
    this.nationalityView = p.nationality

    this.modalService.open(ver).result.then(() => {
      let piloto = new Driver()
      piloto.id = p.id
      piloto.name = this.nameView
      piloto.lastName = this.lastNameView
      piloto.age = parseInt(this.ageView)
      piloto.carNumber = parseInt(this.carNumberView)
      piloto.position = parseInt(this.positionView)
      piloto.nationality = this.nationalityView
      this.driverService.edit(piloto, p.id, parseInt(this.teamView)).subscribe(()=>{
        location.reload()
        alert("Modificacion Exitosa")
        location.reload
      }, error =>{
        console.error(error)
      })
    })
  }
}
