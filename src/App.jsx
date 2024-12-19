import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import contactsBase from './data/contacts.json';

function App() {
  const [contacts, setContacts] = useState(() => {
    const contactsLocalStorage = window.localStorage.getItem('contacts');
    if (contactsLocalStorage === null) {
      return contactsBase;
    }
    return JSON.parse(contactsLocalStorage);
  });

  const [filterValue, setFilterValue] = useState('');

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleFilterValue = e => {
    setFilterValue(e.target.value);
  };

  const addContact = (values, actions) => {
    setContacts(prev => [
      ...prev,
      { id: nanoid(5), name: values.name, number: values.number },
    ]);
    actions.resetForm();
  };

  const deleteContact = contactDeleteId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactDeleteId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox
        filterValue={filterValue}
        handleFilterValue={handleFilterValue}
      />
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </>
  );
}

export default App;
