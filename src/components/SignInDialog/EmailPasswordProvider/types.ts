import {InferType} from 'yup';

import {StateDialog} from '../types';
import {schema} from './formSchema';
import {Props as SignInDialogProps} from '../types';

export interface Props extends Pick<SignInDialogProps, 'handleOpenClose'> {
  stateDialog: StateDialog;
}

export type FormData = InferType<typeof schema>;
