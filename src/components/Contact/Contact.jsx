import s from './Contact.module.css';
import { BsFillPersonFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
import {
  MdDeleteForever,
  MdEdit,
  MdDelete,
  MdDeleteOutline,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiCloseLargeFill } from 'react-icons/ri';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const Contact = ({ contact: { id, name, number } }) => {
  const nameId = useId();
  const numberId = useId();
  const EditFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
    number: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
  });

  const dispatch = useDispatch();
  const [deleteContactData, setDeleteContactData] = useState(null);
  const [editContactData, setEditContactData] = useState(null);

  const handleEditContact = () => {
    setEditContactData({ id, name, number });
  };

  const handleCloseEditForm = () => {
    setEditContactData(null);
  };

  const handleSaveContact = (values, actions) => {
    dispatch(
      editContact({
        id: editContactData.id,
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => {
        actions.resetForm();
        setEditContactData(null);
        toast.success('edit contact success', hotToastStyle);
      })
      .catch(() => {
        toast.error('edit contact error', hotToastStyle);
      });
  };

  const handleFirstClickDeleteContact = () => {
    setDeleteContactData(1);
  };
  const handleSecondClickDeleteContact = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        setDeleteContactData(null);
        toast.success('delete contact success', hotToastStyle);
      })
      .catch(() => {
        toast.error('delete contact error', hotToastStyle);
      });
  };
  const handleCancelDeleteContact = () => {
    setDeleteContactData(null);
  };

  return (
    <>
      <div className={s.contact_card}>
        <ul className={s.contact_list}>
          <li className={s.contact_item}>
            <BsFillPersonFill />
            <p>{name}</p>
          </li>
          <li className={s.contact_item}>
            <BsFillTelephoneFill />
            <p>{number}</p>
          </li>
        </ul>
        <div className={s.contact_btn_wrapper}>
          <button
            type="button"
            className={s.contact_btn}
            onClick={handleEditContact}
          >
            <MdEdit />
            Edit
          </button>
          <button
            type="button"
            className={s.contact_btn}
            onClick={handleFirstClickDeleteContact}
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      </div>

      {editContactData && (
        <div className={s.editform_container}>
          <Formik
            initialValues={{
              name: editContactData.name,
              number: editContactData.number,
            }}
            onSubmit={handleSaveContact}
            validationSchema={EditFormSchema}
          >
            <Form className={s.editform}>
              <RiCloseLargeFill
                className={s.editform_container_close}
                onClick={handleCloseEditForm}
              />
              <label htmlFor={nameId}>Name</label>
              <Field
                className={s.editform_field}
                type="text"
                name="name"
                id={nameId}
                placeholder="change contact's name"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={s.editform_message_first}
              />
              <label htmlFor={numberId}>Number</label>
              <Field
                className={s.editform_field}
                type="text"
                name="number"
                id={numberId}
                placeholder="change contact's number"
              />
              <ErrorMessage
                name="number"
                component="span"
                className={s.editform_message_second}
              />
              <button className={s.editform_btn} type="submit">
                <FaSave /> Save changes in contact
              </button>
            </Form>
          </Formik>
        </div>
      )}

      {deleteContactData && (
        <div className={s.deleteform_container}>
          <div className={s.deleteform}>
            <RiCloseLargeFill
              className={s.editform_container_close}
              onClick={handleCancelDeleteContact}
            />
            <p>
              Do you sure you want to delete contact: {deleteContactData.name}?
            </p>
            <button
              className={s.deleteform_btn}
              type="button"
              onClick={handleSecondClickDeleteContact}
            >
              <MdDelete /> Yes, delete
            </button>
            <button
              className={s.deleteform_btn}
              type="button"
              onClick={handleCancelDeleteContact}
            >
              Don&apos;t delete
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Contact;
