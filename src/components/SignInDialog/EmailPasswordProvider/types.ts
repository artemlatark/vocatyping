import {InferType} from 'yup';

import {schema} from './formSchema';

export type FormData = InferType<typeof schema>;
