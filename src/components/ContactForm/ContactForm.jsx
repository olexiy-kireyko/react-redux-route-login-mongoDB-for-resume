import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { FaRegAddressBook } from 'react-icons/fa';
// import { nanoid } from 'nanoid';

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameId = useId();
  const numberId = useId();
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
    number: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
  });
  const handleAddContact = (values, actions) => {
    dispatch(addContact({ name: values.name, number: values.number }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleAddContact}
      validationSchema={FormSchema}
    >
      <Form className={s.contactform}>
        <label htmlFor={nameId}>Name</label>
        <Field
          className={s.contactform_field}
          type="text"
          name="name"
          id={nameId}
        />
        <ErrorMessage
          name="name"
          component="span"
          className={s.contactform_message_first}
        />
        <label htmlFor={numberId}>Number</label>
        <Field
          className={s.contactform_field}
          type="text"
          name="number"
          id={numberId}
        />
        <ErrorMessage
          name="number"
          component="span"
          className={s.contactform_message_second}
        />
        <button className={s.contactform_btn} type="submit">
          <FaRegAddressBook /> Add contact
        </button>
      </Form>
    </Formik>
  );
};
export default ContactForm;
