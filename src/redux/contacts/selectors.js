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
        console.log(
          'typeFilters, contact.contactType',
          typeFilters,
          contact.contactType
        );
        return false;
      }
      if (
        favouriteFilters !== 'all' &&
        contact.isFavourite !== favouriteFilters
      ) {
        console.log(
          'favouriteFilters, contact.isFavourite',
          favouriteFilters,
          contact.isFavourite
        );
        return false;
      }
      if (contact.name.toLowerCase().includes(filters.toLowerCase())) {
        console.log('in contact.name');

        return true;
      }
      if (contact.phoneNumber.toLowerCase().includes(filters.toLowerCase())) {
        console.log('in contact.phoneNumber');
        return true;
      }
      if (contact.email.toLowerCase().includes(filters.toLowerCase())) {
        console.log('in contact.email');
        return true;
      }

      return false;
    })
);
