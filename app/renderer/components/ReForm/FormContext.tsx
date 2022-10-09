import { createContext } from 'react';
import { FormStore, IFormApi } from './FormStore';

const FormContext = createContext<IFormApi>({} as FormStore);

export default FormContext;
