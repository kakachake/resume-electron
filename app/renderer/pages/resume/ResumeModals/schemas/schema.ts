import { baseSchema } from './Base/baseSchema';
import { certificateSchema } from './Certificate/certificateSchema';
import { contactSchema } from './Contact/contactSchema';

export const resumeSchema = {
  base: baseSchema,
  contact: contactSchema,
  certificate: certificateSchema,
};
