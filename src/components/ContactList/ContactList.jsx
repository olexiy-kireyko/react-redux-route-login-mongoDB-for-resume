import s from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

const ContactList = () => {
  const filterContacts = useSelector(selectFilteredContacts);

  return (
    <>
      {filterContacts && (
        <ul className={s.contactlist_list}>
          {filterContacts.map(contact => (
            <li key={contact._id}>
              <Contact contact={contact} />
            </li>
          ))}
        </ul>
      )}
      {filterContacts.length === 0 && <h4>You do not have contacts yet</h4>}
    </>
  );
};

export default ContactList;
