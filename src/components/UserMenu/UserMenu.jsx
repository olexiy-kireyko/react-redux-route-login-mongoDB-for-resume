import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserMenu.module.css';
import { IoMdLogOut } from 'react-icons/io';
import toast from 'react-hot-toast';

const hotToastStyle = {
  style: {
    marginTop: '100px',
    padding: '24px',
  },
};

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success('logout success', hotToastStyle);
      })
      .catch(() => {
        toast.error('logout error', hotToastStyle);
      });
  };
  return (
    <div className={s.usermenu}>
      <div>Welcome, {user.name}</div>
      <button className={s.usermenu_btn} type="button" onClick={handleLogout}>
        Log out
        <IoMdLogOut />
      </button>
    </div>
  );
};

export default UserMenu;
