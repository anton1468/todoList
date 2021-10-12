import * as yup from 'yup';
class ValidationSchema {
    todo = () => yup.object().shape({
      title: yup.string().required('Title field is required')
          .min(5, 'This field should be more than 5 characters')
          .max(35, 'This field should be up to 35 characters'),
      description: yup.string().required('Description field is required')
          .min(5, 'This field should be more than 5 characters')
          .max(100, 'This field should be up to 100 characters'),
      year: yup.string().required('Date field is required')
          .length(4, 'This field has to be exactly 4 characters!'),
    });

    login = () => yup.object().shape({
      email: yup.string()
          .email('This is not a valid email')
          .required('Email field can\'t be blank'),
      password: yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password field can\'t be blank'),
    })

    register = () => yup.object().shape({
      userName: yup.string()
          .required('Username is required'),
      email: yup.string()
          .email('This is not a valid email')
          .required('Email is required'),
      password: yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      verifyPassword: yup.string()
          .oneOf([yup.ref('password'), null], 'Passwords have to match')
          .required('Verify password field is required'),
    })
}

const validation = new ValidationSchema();
export default validation;
