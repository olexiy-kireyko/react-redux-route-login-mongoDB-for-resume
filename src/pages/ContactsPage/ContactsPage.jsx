import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { useEffect, useState } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import s from './ContactsPage.module.css';
import { DNA } from 'react-loader-spinner';

import {
  MdFilterAlt,
  MdFilterAltOff,
  MdPersonAdd,
  MdPersonAddDisabled,
} from 'react-icons/md';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const [isShowContactForm, setIsShowContactForm] = useState(false);
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const handleShowContactForm = () => {
    setIsShowContactForm(!isShowContactForm);
  };
  const handleShowSearchBox = () => {
    setIsShowSearchBox(!isShowSearchBox);
  };

  return (
    <div className={s.contacts}>
      <div className={s.contacts_page}>
        <h1>Phonebook</h1>

        <div className={s.contacts_page_btn_wrapper}>
          <button
            className={s.contacts_page_btn_contactform}
            type="button"
            onClick={handleShowContactForm}
          >
            {isShowContactForm ? (
              <>
                <MdPersonAddDisabled /> <p>hide form to add new contact</p>
              </>
            ) : (
              <>
                <MdPersonAdd />
                <p>show form to add new contact</p>
              </>
            )}
          </button>

          <button
            className={s.contacts_page_btn_filter}
            type="button"
            onClick={handleShowSearchBox}
          >
            {isShowSearchBox ? (
              <>
                <MdFilterAltOff /> <p>hide form to define filters</p>
              </>
            ) : (
              <>
                <MdFilterAlt />
                <p>show form to define filters</p>
              </>
            )}
          </button>
        </div>

        {isShowContactForm && <ContactForm />}
        {isShowSearchBox && <SearchBox />}
        {loading && (
          <div className={s.contacts_loader}>
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {error && <p>error...</p>}
        <ContactList />
      </div>
    </div>
  );
};

export default ContactsPage;
