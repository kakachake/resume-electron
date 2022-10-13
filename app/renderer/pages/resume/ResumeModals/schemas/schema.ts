import { baseSchema } from './Base/baseSchema';
import { certificateAdapter, certificateSchema } from './Certificate/certificateSchema';
import { contactSchema } from './Contact/contactSchema';
import { jobSchema } from './Job/jobSchema';
import { skillAdapter, skillSchema } from './Skill/skillSchema';

export const resumeSchema = {
  base: baseSchema,
  contact: contactSchema,
  certificate: certificateSchema,
  skill: skillSchema,
  job: jobSchema,
};

export const resumeAdapter = {
  certificateAdapter,
  skillAdapter,
};