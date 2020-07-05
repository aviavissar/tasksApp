import * as yup from "yup";


const SUPPORTED_FORMATS=['jpg','png']
const FILE_SIZE=2000000;

 const schema = yup.object().shape({
  name: yup.string()
.required("This field is required.")
  ,
  age: yup
  .number().required("This field is required.")
  .positive()
  .integer(),
 
  email: yup.string().email("This field is required."),
  password: yup.string().min(6)
  .required("This field is required."),
  passwordConfirmation: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  ,

  createdAt: yup.date().default(function () {
    return new Date();
  }),
  // avatar: yup.mixed()
  //  .test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE) 
  // .test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(value.type))
});
export default schema