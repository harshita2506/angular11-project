import { SkillInfo } from './skillInfo';
import { EducationInfo } from './educationInfo';

export class EmpInfo {
  empName: string;
  designation: string;
  joinDate: string;
  email: string;
  phoneNumber: string;
  skillInfo: SkillInfo[];
  educationInfo: EducationInfo[];
}
