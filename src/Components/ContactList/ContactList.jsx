import s from './ContactList.module.css';
import Contact from '../Contact/Contact';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={s.contactlist_list}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} deleteContact={deleteContact} />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
