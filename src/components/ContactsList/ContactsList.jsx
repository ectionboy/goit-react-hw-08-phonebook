import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Filter from 'components/Filter/Filter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContacts } from 'redux/contacts/slice';
import {
  ContactsContainer,
  // ContactsListUl,
  // ContactsItem,
  // ContactsButton,
} from './ContactsList.styled';
import { deleteContact, fetchContacts } from 'redux/contacts/operations';
import { getContacts, getFilter } from 'redux/selectors';
import { refreshContacts } from 'api/contacts';

const ContactsList = () => {
  const [filtered, setFiltered] = useState([]);
  const { items, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    refreshContacts()
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteItem = id => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    if (filter && items) {
      setFiltered(
        items.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()))
      );
    } else {
      setFiltered(items);
    }
  }, [filter, items]);

  return (
    <ContactsContainer>
      <h2>Contacts</h2>
      <Filter />
      <div>
        {isLoading && <p>Loading contacts...</p>}
        {error && <b>{error}</b>}
        {/* <ContactsListUl>
        {filtered &&
          filtered.map(contact => (
            <ContactsItem key={contact.id}>
              <p>
                {contact.name}: {contact.number}
              </p>
              <ContactsButton 
              onClick={() => deleteItem(contact.id)}
              >Delete</ContactsButton>
            </ContactsItem>
          ))}
      </ContactsListUl> */}
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {filtered &&
            filtered.map(contact => (
              <ListItem
                alignItems="flex-start"
                sx={{ padding: '4px 16px' }}
                key={contact.id}
              >
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', marginLeft: '8px' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {contact.number}
                      </Typography>
                      <IconButton aria-label="delete" onClick={() => deleteItem(contact.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
        </List>
      </div>
    </ContactsContainer>
  );
};

export default ContactsList;
