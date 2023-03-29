import {InferType} from 'yup';

import {StateDialog} from '../types';
import {schema} from './formSchema';

export interface Props {
  stateDialog: StateDialog;
}

export type FormData = InferType<typeof schema>;
