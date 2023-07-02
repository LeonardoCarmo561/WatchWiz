import * as yup from "yup";

export interface IFormData {
  username: string;
  password: string;
  grant_type: string;
}

const formValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(6),
  grant_type: yup.string().required(),
});

export default formValidationSchema
