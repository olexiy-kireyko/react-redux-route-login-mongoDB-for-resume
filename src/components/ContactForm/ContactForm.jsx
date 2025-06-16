import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { FaHeart, FaHeartBroken, FaRegAddressBook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const ContactForm = () => {
  const MAX_FILE_SIZE = 512000; //500KB

  const validFileExtensions = {
    image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
  };

  function isValidFileType(fileName, fileType) {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
    );
  }

  const dispatch = useDispatch();
  const [isCheckedfavourite, setIsCheckedfavourite] = useState(false);
  const handleIsCheckedfavourite = () => {
    setIsCheckedfavourite(!isCheckedfavourite);
  };
  const nameId = useId();
  const numberId = useId();
  const emailId = useId();
  const isFavouriteId = useId();
  const contactTypeId = useId();
  const photoTypeId = useId();

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'too short')
      .max(50, 'too long')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(7, 'too short')
      .max(12, 'too long')
      .required('Required'),
    email: Yup.string().email().required('Required'),
    isFavourite: Yup.boolean().required('Required'),
    contactType: Yup.string().required('Required'),
    photo: Yup.mixed()
      .test('is-valid-type', 'Not a valid image type', value =>
        isValidFileType(value && value.name.toLowerCase(), 'image')
      )
      .test(
        'is-valid-size',
        'Max allowed size is 500KB',
        value => value && value.size <= MAX_FILE_SIZE
      )
      .required('Photo is Required'),
  });

  const [preview, setPreview] = useState(null);

  const handleAddContact = (values, actions) => {
    dispatch(
      addContact({
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

        toast.success('add contact success', hotToastStyle);
      })
      .catch(() => {
        toast.error('add contact error', hotToastStyle);
      });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNumber: '',
        email: '',
        isFavourite: false,
        contactType: 'home',
        // photo: '',
      }}
      onSubmit={handleAddContact}
      validationSchema={FormSchema}
    >
      {({ setFieldValue, setFieldError, errors }) => (
        <Form className={s.contactform}>
          <label htmlFor={nameId}>Name</label>
          <Field
            className={s.contactform_field}
            type="text"
            name="name"
            id={nameId}
            placeholder="enter contact's name"
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
            name="phoneNumber"
            id={numberId}
            placeholder="enter contact's number"
          />
          <ErrorMessage
            name="phoneNumber"
            component="span"
            className={s.contactform_message_second}
          />

          <label htmlFor={emailId}>Email</label>
          <Field
            className={s.contactform_field}
            type="text"
            name="email"
            id={emailId}
            placeholder="enter contact's email"
          />
          <ErrorMessage
            name="email"
            component="span"
            className={s.contactform_message_third}
          />

          <label
            htmlFor={isFavouriteId}
            className={s.contactform_field_checkbox_wrapper}
          >
            Is Favourite:
            <Field
              onClick={handleIsCheckedfavourite}
              className={s.contactform_field_checkbox}
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
            className={s.contactform_field_radio_wrapper}
          >
            <label className={s.contactform_field_radio_label}>
              work
              <Field
                className={s.contactform_field_radio}
                type="radio"
                value="work"
                name="contactType"
              />
            </label>

            <label className={s.contactform_field_radio_label}>
              personal
              <Field
                className={s.contactform_field_radio}
                type="radio"
                value="personal"
                name="contactType"
              />
            </label>

            <label className={s.contactform_field_radio_label}>
              home
              <Field
                className={s.contactform_field_radio}
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
            ) : (
              <img className={s.contact_photo} src="/images/defaultPhoto.jpg" />
            )}
          </div>

          <label className={s.contactform_photo_label}>
            {preview ? (
              <span>Change contacts photo</span>
            ) : (
              <span>Upload contacts photo</span>
            )}
            <input
              type="file"
              id={photoTypeId}
              onChange={event => {
                const file = event.currentTarget.files[0];
                setFieldValue('photo', file);
                // setFieldTouched('photo', true);
                setFieldError('photo', undefined);

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setPreview(null);
                }
              }}
              name="photo"
              style={{ display: 'none' }}
            />
            {errors.photo && (
              <div className={s.contactform_message_fourth}>{errors.photo}</div>
            )}
          </label>

          <button className={s.contactform_btn} type="submit">
            <FaRegAddressBook /> Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default ContactForm;
