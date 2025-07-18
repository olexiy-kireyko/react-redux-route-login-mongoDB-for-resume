import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');

      return response.data.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('name', contact.name);
      formData.append('phoneNumber', contact.phoneNumber);
      formData.append('email', contact.email);
      formData.append('isFavourite', contact.isFavourite);
      formData.append('contactType', contact.contactType);
      formData.append('photo', contact.photo);
      const response = await axios.post('/contacts', formData);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (
    { _id, name, phoneNumber, email, isFavourite, contactType, photo },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);
      formData.append('isFavourite', isFavourite);
      formData.append('contactType', contactType);
      formData.append('photo', photo);
      const response = await axios.patch(`/contacts/${_id}`, formData);

      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
