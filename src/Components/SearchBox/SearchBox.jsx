import s from './SearchBox.module.css';

const SearchBox = ({ filterValue, handleFilterValue }) => {
  return (
    <div className={s.searchbox_wrapper}>
      <label className={s.searchbox_label}>
        Find contacts by name
        <input
          className={s.searchbox_input}
          type="text"
          value={filterValue}
          onChange={handleFilterValue}
        />
      </label>
    </div>
  );
};
export default SearchBox;
