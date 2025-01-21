import s from './Contact.module.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { MdDeleteForever } from 'react-icons/md';

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
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
        <button
          type="button"
          className={s.contact_btn}
          onClick={handleDeleteContact}
        >
          <MdDeleteForever />
          Delete
        </button>
      </div>
    </>
  );
};
export default Contact;
