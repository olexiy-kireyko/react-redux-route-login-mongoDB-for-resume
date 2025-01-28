import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import s from './ContactsPage.module.css';
import { DNA } from 'react-loader-spinner';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.contacts_page}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
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
  );
};

export default ContactsPage;
