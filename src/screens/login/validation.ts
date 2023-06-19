import * as yup from "yup";

export interface IFormData {
  email: string;
  password: string;
}

const formValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

export default formValidationSchema
