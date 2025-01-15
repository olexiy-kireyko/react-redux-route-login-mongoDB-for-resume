import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const handleFilterValue = e => {
    dispatch(changeFilter(e.target.value.trim()));
  };

  return (
    <div className={s.searchbox_wrapper}>
      <label className={s.searchbox_label}>
        Find contacts by name
        <input
          className={s.searchbox_input}
          type="text"
          onChange={handleFilterValue}
        />
      </label>
    </div>
  );
};
export default SearchBox;
