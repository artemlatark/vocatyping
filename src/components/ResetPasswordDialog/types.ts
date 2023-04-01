import {InferType} from 'yup';

import {schema} from './formSchema';

export interface Props {
  handleOpenClose: (value: boolean) => void;
  isOpen: boolean;
}

export type FormData = InferType<typeof schema>;
