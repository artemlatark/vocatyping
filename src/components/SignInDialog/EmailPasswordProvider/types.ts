import {InferType} from 'yup';

import {schema} from './formSchema';
import {Props as SignInDialogProps, StateDialog} from '../types';

export interface Props extends Pick<SignInDialogProps, 'handleOpenClose'> {
  stateDialog: StateDialog;
}

export type FormData = InferType<typeof schema>;
