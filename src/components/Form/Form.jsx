import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { FormElement, Title, FormInput, FormButton } from './Form.styled';
import { addContact } from 'redux/contacts/operations';
import { getContacts } from 'redux/selectors';
import { Box, Button, Container, TextField } from '@mui/material';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { items } = useSelector(getContacts);
  const dispatch = useDispatch();

  const createContact = data => {
    dispatch(addContact(data));
  };

  const formSubmit = e => {
    e.preventDefault();

    if (items && inNameNew(items, name) !== undefined) {
      return alert(`${name} is already in contacts.`);
    }

    createContact({ name, number:phone });
    setName('');
    setPhone('');
  };

  const inNameNew = (phoneBook, newContact) => {
    return phoneBook.find(({ name }) => name === newContact);
  };

  const inputName = ({ target: { value } }) => {
    setName(value);
  };
  const inputPhone = ({ target: { value } }) => {
    setPhone(value);
  };





  return (
    // <div>
    //   <FormElement onSubmit={formSubmit}>
    //     <div>
    //       <Title>Name</Title>
    //       <FormInput
    //         type="text"
    //         onChange={inputName}
    //         name="name"
    //         pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    //         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    //         value={name}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <Title>Number</Title>
    //       <FormInput
    //         type="tel"
    //         onChange={inputNumber}
    //         name="number"
    //         pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
    //         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    //         value={phone}
    //         required
    //       />
    //     </div>
    //     <FormButton type="submit">Add contact</FormButton>
    //   </FormElement>
    // </div>


<Box
  onSubmit={formSubmit}
  component="form"
  sx={{
    width: '220px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  }}
>
  <TextField
    value={name}
    onChange={inputName}
    id="name"
    label="Name"
    variant="standard"
    type="text"
    required
  />
    <TextField
    value={phone}
    onChange={inputPhone}
    id="phone"
    label="Phone"
    variant="standard"
    type="tel"
    required
  />

  <Button type="submit" variant="contained">
  Add contact
  </Button>
</Box>
  );
};

export default Form;
