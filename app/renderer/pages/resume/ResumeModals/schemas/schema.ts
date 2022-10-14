import { baseSchema } from './Base/baseSchema';
import { certificateAdapter, certificateSchema } from './Certificate/certificateSchema';
import { contactSchema } from './Contact/contactSchema';
import { evaluationAdapter, evaluationSchema } from './Evaluation/evaluationSchema';
import { jobSchema } from './Job/jobSchema';
import {
  projectExperienceAdapter,
  projectExperienceSchema,
} from './ProjectExperience/projectExperience';
import {
  schoolExperienceAdapter,
  schoolExperienceSchema,
} from './SchoolExperience/schoolExperience';
import { skillAdapter, skillSchema } from './Skill/skillSchema';
import {
  workExperienceAdapter,
  workExperienceSchema,
} from './WorkExperience/workExperience';

export const resumeSchema = {
  base: baseSchema,
  contact: contactSchema,
  certificate: certificateSchema,
  skill: skillSchema,
  job: jobSchema,
  evaluation: evaluationSchema,
  projectExperience: projectExperienceSchema,
  schoolExperience: schoolExperienceSchema,
  workExperience: workExperienceSchema,
};

export const resumeAdapter = {
  certificateAdapter,
  skillAdapter,
  evaluationAdapter,
  projectExperienceAdapter,
  schoolExperienceAdapter,
  workExperienceAdapter,
};
