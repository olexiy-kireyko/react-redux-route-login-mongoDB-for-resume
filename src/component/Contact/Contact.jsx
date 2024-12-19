import s from './Contact.module.css';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Contact = ({ contact: { id, name, number }, deleteContact }) => {
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
          onClick={() => deleteContact(id)}
        >
          Delete
        </button>
      </div>
    </>
  );
};
export default Contact;
