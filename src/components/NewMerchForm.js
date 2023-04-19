import React from "react";
import PropTypes from "prop-types";
import { v4 } from 'uuid';

function NewMerchForm(props) {

  function handleNewMerchFormSubmission(event) {
    event.preventDefault();
    props.onNewMerchCreation({
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      quantity: event.target.quantity.value,
      id: v4()
    });
  }
  return (
    <React.Fragment>
      <form onSubmit={handleNewMerchFormSubmission}>
        <p>Merch:  
        <input
          type='text'
          name='name'
          placeholder='Name of Merch' /><br></br></p>
        <input
          type='number'
          name='price'
          placeholder='Price' /><br></br>
        <textarea
          name='description'
          placeholder='Description' /><br></br>
        <input
          type='number'
          name='quantity'
          placeholder='Quantity' /><br></br>
        <button type='submit'>Submit Merch!</button>
      </form>
    </React.Fragment>
  );
}

NewMerchForm.propTypes = {
  onNewMerchCreation: PropTypes.func
};

export default NewMerchForm;