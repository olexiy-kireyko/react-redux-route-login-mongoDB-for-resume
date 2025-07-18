import { createSelector } from '@reduxjs/toolkit';
import {
  selectNameFilter,
  selectTypeFilter,
  selectIsFavouriteFilter,
} from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectTypeFilter, selectIsFavouriteFilter],
  (contacts, filters, typeFilters, favouriteFilters) =>
    contacts.filter(contact => {
      if (typeFilters !== 'all' && contact.contactType !== typeFilters) {
        return false;
      }
      if (
        favouriteFilters !== 'all' &&
        contact.isFavourite !== favouriteFilters
      ) {
        return false;
      }
      if (contact.name.toLowerCase().includes(filters.toLowerCase())) {
        return true;
      }
      if (contact.phoneNumber.toLowerCase().includes(filters.toLowerCase())) {
        return true;
      }
      if (contact.email.toLowerCase().includes(filters.toLowerCase())) {
        return true;
      }

      return false;
    })
);
