import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { CompanyInfo } from 'src/app/model/companyInfo';
import { EmpInfo } from 'src/app/model/employeeInfo';
import { EducationInfo } from 'src/app/model/educationInfo';
import { SkillInfo } from 'src/app/model/skillInfo';
import { Router } from '@angular/router';
import { NewServiceService } from 'src/app/services/new-service.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewCompanyComponent implements OnInit {

  companyFormGroup: FormGroup;
  employeeData: any;
  editMode = false;
  companyArray: any;
  maxDate = new Date();
  userData: any;
  skillName: FormArray;
  cancelButton = false;
  designations = [
    { id: '1', value: 'Developer' },
    { id: '2', value: 'Manager' },
    { id: '3', value: 'System Admin' },
    { id: '4', value: 'Team Lead' },
    { id: '5', value: 'PM' }
  ];

  skills = ['Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP',
    'GIT', 'AWS', 'Python', 'Django', 'C', 'C++', 'C#', 'Unity', 'R', 'AI', 'NLP', 'Photoshop', 'Nodejs'];

  constructor(@Inject(MAT_DIALOG_DATA) public row: any, private snackBarService: SnackbarService, private dialogRef: MatDialogRef<NewCompanyComponent>,
    private formBuilder: FormBuilder, private http: HttpClient, private route: Router, private getService: NewServiceService
  ) { }

  ngOnInit(): void {
    const a = localStorage.setItem('skills', JSON.stringify(this.skills));
    this.companyFormGroup = this.formBuilder.group({
      company_name: [null, Validators.required],
      company_address: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required, Validators.pattern(/^[0-9]{0,15}$/)]],
      created_at: [null, Validators.required],
      employee_name: [null, Validators.required],
      designation: [null, Validators.required],
      join_date: [null, Validators.required],
      emp_Email: [null, [Validators.required, Validators.email]],
      phone_number1: [null, [Validators.required, Validators.pattern(/^[0-9]{0,15}$/)]],
      skillName: this.formBuilder.array([this.skillSet()]),
      college_name: [null, Validators.required],
      course_name: [null, Validators.required],
      completed_year: [null, Validators.required]
    });
    if (JSON.stringify(this.row) !== '{}') {
      this.skillName = this.companyFormGroup.get('skillName') as FormArray;
      this.skillName.removeAt(0);
      this.row.empInfo[0].skillInfo.forEach(element => {
        this.skillName.push(this.formBuilder.group({
          skill_name: [element.skillNamee],
          skill_rating: [element.skillRating, [Validators.pattern(/^[0-5]{1}$/)]]
        }));
      });
    }
    if (this.row.edit !== undefined) {
      this.editMode = this.row.edit;
    }
    if (JSON.stringify(this.row) !== '{}') {
      this.companyFormGroup.controls['company_name'].setValue(this.row.company_name);
      this.companyFormGroup.controls['company_address'].setValue(this.row.company_address);
      this.companyFormGroup.controls['email'].setValue(this.row.email);
      this.companyFormGroup.controls['phone_number'].setValue(this.row.phone_number);
      this.companyFormGroup.controls['created_at'].setValue(this.row.created_at);
      this.companyFormGroup.controls['employee_name'].setValue(this.row.empInfo[0].empName);
      this.companyFormGroup.controls['designation'].setValue(this.row.empInfo[0].designation);
      this.companyFormGroup.controls['join_date'].setValue(this.row.empInfo[0].joinDate);
      this.companyFormGroup.controls['emp_Email'].setValue(this.row.empInfo[0].email);
      this.companyFormGroup.controls['phone_number1'].setValue(this.row.empInfo[0].phoneNumber);
      this.companyFormGroup.patchValue(['skill_name', 'skill_rating']);
      this.companyFormGroup.controls['college_name'].setValue(this.row.empInfo[0].educationInfo[0].instituteName);
      this.companyFormGroup.controls['course_name'].setValue(this.row.empInfo[0].educationInfo[0].courseName);
      this.companyFormGroup.controls['completed_year'].setValue(this.row.empInfo[0].educationInfo[0].completedYear);

    }
    this.getCompanyDetail();
  }

  skillSet(): FormGroup {
    return this.formBuilder.group({
      skill_name: [null, Validators.required],
      skill_rating: [null, [Validators.required, Validators.pattern(/^[0-5]{1}$/)]]
    });
  }


  addItem(): void {
    this.skillName = this.companyFormGroup.get('skillName') as FormArray;
    this.skillName.push(this.skillSet());
  }

  removeQuantity(i: number) {
    this.skillName.removeAt(i);
  }

  closeDialog(): void {
    this.cancelButton = true;
    this.dialogRef.close(true);
  }

  onSubmit(): void {
    let companyInfo = new CompanyInfo();
    let empInfo = new EmpInfo();
    let educationInfo = new EducationInfo();
    let educationInfoList: EducationInfo[] = [];
    let skillInfoList: SkillInfo[] = [];
    let empInfoList: EmpInfo[] = [];

    companyInfo.company_name = this.companyFormGroup.value.company_name;
    companyInfo.company_address = this.companyFormGroup.value.company_address;
    companyInfo.created_at = this.companyFormGroup.value.created_at;
    companyInfo.email = this.companyFormGroup.value.email;
    companyInfo.phone_number = this.companyFormGroup.value.phone_number;

    empInfo.designation = this.companyFormGroup.value.designation;
    empInfo.email = this.companyFormGroup.value.emp_Email;
    empInfo.empName = this.companyFormGroup.value.employee_name;
    empInfo.joinDate = this.companyFormGroup.value.join_date;
    empInfo.phoneNumber = this.companyFormGroup.value.phone_number1;

    if (this.skillName === undefined) {
      let skillInfo = new SkillInfo();
      skillInfo.skillNamee = this.companyFormGroup.value.skillName[0].skill_name;
      skillInfo.skillRating = this.companyFormGroup.value.skillName[0].skill_rating;
      skillInfoList.push(skillInfo);
    } else {
      for (let i = 0; i < this.skillName.length; i++) {
        let skillInfo = new SkillInfo();
        skillInfo.skillNamee = this.companyFormGroup.value.skillName[i].skill_name;
        skillInfo.skillRating = this.companyFormGroup.value.skillName[i].skill_rating;
        skillInfoList.push(skillInfo);
      }
    }
    educationInfo.instituteName = this.companyFormGroup.value.college_name;
    educationInfo.courseName = this.companyFormGroup.value.course_name;
    educationInfo.completedYear = this.companyFormGroup.value.completed_year;

    educationInfoList.push(educationInfo);

    empInfo.educationInfo = educationInfoList;
    empInfo.skillInfo = skillInfoList;
    empInfoList.push(empInfo);

    companyInfo.empInfo = empInfoList;

    this.userData = companyInfo;
    localStorage.setItem('company', JSON.stringify(this.userData));
    if (this.editMode) {
      this.getService.updateCompany('api/Company', this.row._id, companyInfo)
        .subscribe(data => {
          this.companyArray = data;
          if (this.cancelButton === false) {
            this.snackBarService.showSnackBar('Company details updated successfully', '', 'success');
            this.dialogRef.close(true);
          }
        });
    } else {
      this.getService.addCompany('/api/Company', companyInfo)
        .subscribe(data => {
          this.companyArray = data;
          this.snackBarService.showSnackBar('Company details submitted successfully', '', 'success');
          this.route.navigate(['/company-list'])
        });
    }
  }

  getCompanyDetail(): void {
    this.getService.getCompany('/api/Company')
      .subscribe(data => {
        this.employeeData = data;
      });
  }
}
