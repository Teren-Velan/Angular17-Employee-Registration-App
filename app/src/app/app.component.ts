import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  StepListType,
  EmployeeObjectType,
  EmployeeSkillsObject,
  EmployeeExperienceObject,
} from './app.type';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.loadDesignations()
    this.loadRoles()
  }

  loadDesignations(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation").subscribe((res:any) =>{
      if(res.result && res.data.length > 0){
        console.log(res.data);
        this.designationList = res.data
      }
    })
  }

  
  loadRoles(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles").subscribe((res:any) =>{
      if(res.result && res.data.length > 0){
        this.roleList = res.data
      }
    })
  }

  designationList:any[] = []

  roleList:any[] = []

  steplist: StepListType[] = [
    {
      stepName: 'Basic Details',
      isComplete: false,
    },
    {
      stepName: 'Skills',
      isComplete: false,
    },
    {
      stepName: 'Experience',
      isComplete: false,
    },
  ];

  activeStep: StepListType = this.steplist[0];

  employeeObj: EmployeeObjectType = {
    roleId: 0,
    userName: '',
    empCode: '',
    empId: 0,
    empName: '',
    empEmailId: '',
    empDesignationId: 0,
    empContactNo: '',
    empAltContactNo: '',
    empPersonalEmailId: '',
    empExpTotalYear: 0,
    empExpTotalMonth: 0,
    empCity: '',
    empState: '',
    empPinCode: '',
    empAddress: '',
    empPerCity: '',
    empPerState: '',
    empPerPinCode: '',
    empPerAddress: '',
    password: '',
    erpEmployeeSkills: [],
    ermEmpExperiences: [],
  };



  setActiveStep(activeStep: StepListType) {
    this.activeStep = activeStep;
  }

  addSkills() {
    const skillsObj:EmployeeSkillsObject = {
      empSkillId: 0,
      empId: 0,
      skill: '',
      totalYearExp: 0,
      lastVersionUsed: '',
    };
    this.employeeObj.erpEmployeeSkills.unshift(skillsObj);
  }

  addExperience() {
    const experienceObj:EmployeeExperienceObject = {
      empExpId: 0,
      empId: 0,
      companyName: '',
      startDate: '2024-06-30T04:55:42.665Z',
      endDate: '2024-06-30T04:55:42.665Z',
      designation: '',
      projectsWorkedOn: '',
    };

    this.employeeObj.ermEmpExperiences.unshift(experienceObj);
  }

  saveEmployee(){
    this.http.post("https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee" , this.employeeObj).subscribe((res:any) => {
      if(res.result){
        alert('Employee created Successfully')
      }else{
        alert(res.message)
      }
    })
  }
}
