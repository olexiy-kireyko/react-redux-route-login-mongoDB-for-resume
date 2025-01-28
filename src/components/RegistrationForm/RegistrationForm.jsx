import { register } from '../../redux/auth/operations';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import { MdOutlineAppRegistration } from 'react-icons/md';
import toast from 'react-hot-toast';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const regSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required('Required!'),
  email: Yup.string().email('Not valid email!').required('Required!'),
  password: Yup.string()
    .min(7, 'Too short!')
    .max(12, 'Too long!')
    .required('Required!'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success('registration success', hotToastStyle);
      })
      .catch(() => {
        toast.error('registration error', hotToastStyle);
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
        validationSchema={regSchema}
      >
        <Form className={s.registration_form}>
          <div>
            <label htmlFor={nameId}>name</label>
            <Field
              className={s.registration_form_field}
              type="text"
              id={nameId}
              name="name"
              placeholder="enter your name"
            />
            <ErrorMessage
              className={s.registration_form_message_first}
              name="name"
              component="span"
            />
          </div>
          <div>
            <label htmlFor={emailId}>email</label>
            <Field
              className={s.registration_form_field}
              type="text"
              id={emailId}
              name="email"
              placeholder="enter your email"
            />

            <ErrorMessage
              className={s.registration_form_message_second}
              name="email"
              component="span"
            />
          </div>
          <div>
            <label htmlFor={passwordId}>password</label>
            <Field
              className={s.registration_form_field}
              type={isShowPassword ? 'text' : 'password'}
              id={passwordId}
              name="password"
              placeholder="enter your password"
            />
            <div
              className={s.registration_form_eye}
              onClick={handleShowPassword}
            >
              {!isShowPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <ErrorMessage
              className={s.registration_form_message_third}
              name="password"
              component="span"
            />
          </div>
          <button className={s.registration_form_btn} type="submit">
            <MdOutlineAppRegistration />
            register
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationForm;
