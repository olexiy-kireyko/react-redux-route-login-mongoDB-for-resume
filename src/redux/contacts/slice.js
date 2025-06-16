import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  editContact,
} from './operations';
import { logout } from '../auth/operations';

const handlePending = state => {
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], loading: false, error: null },
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
        console.log('action.payload in slice', action.payload);
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload.data);
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          item => item._id === action.payload._id
        );
        state.items.splice(index, 1);
      })

      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = false;
      })

      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          item => item._id === action.payload._id
        );
        state.items.splice(index, 1, {
          _id: action.payload._id,
          name: action.payload.name,
          phoneNumber: action.payload.phoneNumber,
          email: action.payload.email,
          isFavourite: action.payload.isFavourite,
          contactType: action.payload.contactType,
        });
      })

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          editContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          editContact.rejected
        ),
        handleRejected
      );
  },
});

export default contactsSlice.reducer;
