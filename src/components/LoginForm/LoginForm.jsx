import { login } from '../../redux/auth/operations';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import { BiLogInCircle } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const logSchema = Yup.object().shape({
  email: Yup.string().email('Not valid email!').required('Required!'),
  password: Yup.string()
    .min(7, 'Too short!')
    .max(12, 'Too long!')
    .required('Required!'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('login success', hotToastStyle);
      })
      .catch(() => {
        toast.error('login error', hotToastStyle);
      });
    actions.resetForm();
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={logSchema}
      >
        <Form className={s.loginform}>
          <div>
            <label htmlFor={emailId}>email</label>
            <Field
              className={s.loginform_field}
              type="text"
              id={emailId}
              name="email"
              placeholder="enter your email"
            />
            <ErrorMessage
              className={s.loginform_message_first}
              name="email"
              component="span"
            />
          </div>
          <div>
            <label htmlFor={passwordId}>password</label>
            <Field
              className={s.loginform_field}
              type={isShowPassword ? 'text' : 'password'}
              id={passwordId}
              name="password"
              placeholder="enter your password"
            />
            <div className={s.loginform_form_eye} onClick={handleShowPassword}>
              {!isShowPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <ErrorMessage
              className={s.loginform_message_second}
              name="password"
              component="span"
            />
          </div>
          <button className={s.loginform_btn} type="submit">
            <BiLogInCircle />
            login
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
