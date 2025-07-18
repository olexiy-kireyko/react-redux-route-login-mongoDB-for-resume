import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';
import { Field, Form, Formik } from 'formik';

import { TbHeartQuestion } from 'react-icons/tb';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';

const SearchBox = () => {
  const dispatch = useDispatch();
  const handleFilterValue = values => {
    let valueIsFavourite;
    if (values.isFavourite === 'true') {
      valueIsFavourite = true;
    } else if (values.isFavourite === 'false') {
      valueIsFavourite = false;
    } else {
      valueIsFavourite = 'all';
    }

    dispatch(
      changeFilter({
        name: values.name.trim(),
        isFavourite: valueIsFavourite,
        contactType: values.contactType,
      })
    );
  };

  const handleBreakFilters = () => {
    dispatch(
      changeFilter({
        name: '',
        isFavourite: 'all',
        contactType: 'all',
      })
    );
  };

  return (
    <div className={s.searchbox_wrapper}>
      <p>Filter contacts by</p>
      <Formik
        initialValues={{
          name: '',
          isFavourite: 'all',
          contactType: 'all',
        }}
        onSubmit={handleFilterValue}
        onReset={handleBreakFilters}
      >
        <Form className={s.searchbox}>
          <label className={s.searchbox_label}>
            - name/number/email
            <Field
              className={s.searchbox_input}
              type="text"
              name="name"
              placeholder="enter part of name/number/email"
            />
          </label>

          <label className={s.searchbox_checkbox_wrapper}>
            - is favourite?
            <div role="group" className={s.searchbox_field_radio_wrapper}>
              <label className={s.searchbox_field_radio_label}>
                <FaHeart />
                true
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="true"
                  name="isFavourite"
                />
              </label>

              <label className={s.searchbox_field_radio_label}>
                <FaHeartBroken />
                false
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="false"
                  name="isFavourite"
                />
              </label>

              <label className={s.searchbox_field_radio_label}>
                <TbHeartQuestion />
                all
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="all"
                  name="isFavourite"
                />
              </label>
            </div>
          </label>

          <label className={s.searchbox_radio_wrapper}>
            - contact type
            <div
              // id={contactTypeId}
              role="group"
              className={s.searchbox_field_radio_wrapper}
            >
              <label className={s.searchbox_field_radio_label}>
                work
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="work"
                  name="contactType"
                />
              </label>

              <label className={s.searchbox_field_radio_label}>
                personal
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="personal"
                  name="contactType"
                />
              </label>

              <label className={s.searchbox_field_radio_label}>
                home
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="home"
                  name="contactType"
                />
              </label>

              <label className={s.searchbox_field_radio_label}>
                all
                <Field
                  className={s.searchbox_field_radio}
                  type="radio"
                  value="all"
                  name="contactType"
                />
              </label>
            </div>
          </label>

          <button className={s.searchbox_btn} type="submit">
            <MdFilterAlt /> click to filter contacts
          </button>

          <button className={s.searchbox_btn_break} type="reset">
            <MdFilterAltOff /> click to break all filters
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default SearchBox;
