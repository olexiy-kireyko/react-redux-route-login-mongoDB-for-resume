import s from './Contact.module.css';
import { BsFillPersonFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaHeart, FaHeartBroken, FaHome, FaSave } from 'react-icons/fa';
import {
  MdDeleteForever,
  MdEdit,
  MdDelete,
  MdDeleteOutline,
  MdEmail,
  MdWork,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiCloseLargeFill } from 'react-icons/ri';
import { PiPersonArmsSpreadFill } from 'react-icons/pi';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const Contact = ({
  contact: { _id, name, phoneNumber, email, isFavourite, contactType, photo },
}) => {
  const nameId = useId();
  const numberId = useId();
  const emailId = useId();
  const isFavouriteId = useId();
  const contactTypeId = useId();
  const photoTypeId = useId();

  const EditFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
    email: Yup.string().email().required('Required'),
    isFavourite: Yup.boolean().required('Required'),
    contactType: Yup.string().required('Required'),
  });

  const [isCheckedfavourite, setIsCheckedfavourite] = useState(isFavourite);
  const handleIsCheckedfavourite = () => {
    setIsCheckedfavourite(!isCheckedfavourite);
  };

  const dispatch = useDispatch();

  const [editContactData, setEditContactData] = useState(null);

  const handleEditContact = () => {
    setEditContactData(true);
  };

  const handleCloseEditForm = () => {
    setEditContactData(null);
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('photo', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSaveContact = (values, actions) => {
    dispatch(
      editContact({
        _id,
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        isFavourite: values.isFavourite,
        contactType: values.contactType,
        photo: values.photo,
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

  const [deleteContactData, setDeleteContactData] = useState(null);
  const handleFirstClickDeleteContact = () => {
    setDeleteContactData(1);
  };
  const handleSecondClickDeleteContact = () => {
    dispatch(deleteContact(_id))
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
            <p>{phoneNumber}</p>
          </li>
          <li className={s.contact_item}>
            <MdEmail />
            <p>{email}</p>
          </li>
          <li className={s.contact_item}>
            {!isFavourite ? (
              <>
                <FaHeartBroken />
                <p>Not favourite</p>
              </>
            ) : (
              <>
                <FaHeart />
                <p>Favourite</p>
              </>
            )}
          </li>
          <li className={s.contact_item}>
            {contactType === 'home' ? (
              <FaHome />
            ) : contactType === 'personal' ? (
              <PiPersonArmsSpreadFill />
            ) : (
              <MdWork />
            )}
            <p>{contactType}</p>
          </li>
        </ul>
        <div className={s.contact_btn_wrapper}>
          <div className={s.contact_photo_wrapper}>
            {preview ? (
              <img
                className={s.contact_photo}
                src={preview}
                alt="preview"
                width="200"
              />
            ) : photo ? (
              <img className={s.contact_photo} src={photo} />
            ) : (
              <img className={s.contact_photo} src="/images/defaultPhoto.jpg" />
            )}
          </div>
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
              name,
              phoneNumber,
              email,
              isFavourite,
              contactType,
              // photo: '',
            }}
            onSubmit={handleSaveContact}
            validationSchema={EditFormSchema}
          >
            {({ setFieldValue }) => (
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
                  name="phoneNumber"
                  id={numberId}
                  placeholder="change contact's number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className={s.editform_message_second}
                />

                <label htmlFor={emailId}>Email</label>
                <Field
                  className={s.editform_field}
                  type="text"
                  name="email"
                  id={emailId}
                  placeholder="change contact's email"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={s.editform_message_third}
                />

                <label
                  htmlFor={isFavouriteId}
                  className={s.editform_field_checkbox_wrapper}
                >
                  Is Favourite: {`${isFavourite}`}
                  <Field
                    onClick={handleIsCheckedfavourite}
                    className={s.editform_field_checkbox}
                    type="checkbox"
                    name="isFavourite"
                    id={isFavouriteId}
                  />
                  {!isCheckedfavourite ? <FaHeartBroken /> : <FaHeart />}
                  {!isCheckedfavourite ? <span>false</span> : <span>true</span>}
                </label>

                <p>Contact Type:</p>
                <div
                  id={contactTypeId}
                  role="group"
                  className={s.editform_field_radio_wrapper}
                >
                  <label className={s.editform_field_radio_label}>
                    work
                    <Field
                      className={s.editform_field_radio}
                      type="radio"
                      value="work"
                      name="contactType"
                    />
                  </label>

                  <label className={s.editform_field_radio_label}>
                    personal
                    <Field
                      className={s.editform_field_radio}
                      type="radio"
                      value="personal"
                      name="contactType"
                    />
                  </label>

                  <label className={s.editform_field_radio_label}>
                    home
                    <Field
                      className={s.editform_field_radio}
                      type="radio"
                      value="home"
                      name="contactType"
                    />
                  </label>
                </div>

                <div className={s.contact_photo_wrapper}>
                  {preview ? (
                    <img
                      className={s.contact_photo}
                      src={preview}
                      alt="preview"
                      width="200"
                    />
                  ) : photo ? (
                    <img className={s.contact_photo} src={photo} />
                  ) : (
                    <img
                      className={s.contact_photo}
                      src="/images/defaultPhoto.jpg"
                    />
                  )}
                </div>

                <label className={s.editform_photo_label}>
                  {photo ? (
                    <span>Change contacts photo</span>
                  ) : (
                    <span>Upload contacts photo</span>
                  )}
                  <input
                    id={photoTypeId}
                    type="file"
                    onChange={event => handleFileChange(event, setFieldValue)}
                    name="photo"
                    style={{ display: 'none' }}
                  />
                </label>

                <button className={s.editform_btn} type="submit">
                  <FaSave /> Save changes in contact
                </button>
              </Form>
            )}
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
