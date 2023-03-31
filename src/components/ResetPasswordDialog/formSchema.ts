import {object, string} from 'yup';

export const schema = object({
  email: string().required('Email is a required field'),
});

export const defaultValues = {
  email: '',
};
