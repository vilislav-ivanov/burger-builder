import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios';
import { addOrderAsync } from '../../../actions';
import withErrorHandler from '../../../hoc/withErrorHandler';
import './ContactData.css';

const ContactData = ({ ingredients, price, email, handleOrder }) => {
  const history = useHistory();
  const [contactData, setContactData] = useState({
    name: {
      inputType: 'input',
      value: '',
      label: 'Name',
      config: {
        type: 'text',
        placeholder: 'Your Name',
      },
      validation: {
        required: {
          minLength: 2,
          maxLength: 20,
        },
        valid: false,
        touched: false,
        errorMessage: 'Name must be between 2 and 20 symbols',
      },
    },
    email: {
      inputType: 'input',
      value: '',
      label: 'Email',
      config: {
        type: 'email',
        placeholder: 'Your Mail',
      },
      validation: {
        required: {
          minLength: 5,
          maxLength: 20,
        },
        valid: false,
        touched: false,
        errorMessage: 'Email must be between 5 and 20 symbols',
      },
    },
    address: {
      inputType: 'input',
      value: '',
      label: 'Address',
      config: {
        type: 'text',
        placeholder: 'Your Address',
      },
      validation: {
        required: {
          minLength: 4,
          maxLength: 30,
        },
        valid: false,
        touched: false,
        errorMessage: 'Address must be between 4 and 20 symbols',
      },
    },
    postalCode: {
      inputType: 'input',
      value: '',
      label: 'ZIPCode',
      config: {
        type: 'text',
        placeholder: 'Your ZIP Code',
      },
      validation: {
        required: {
          minLength: 2,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        errorMessage: 'ZIPCode must be between 2 and 5 symbols',
      },
    },
    deliveryMethod: {
      inputType: 'select',
      value: 'fastest',
      label: 'Delivery Method',
      config: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      validation: {
        required: {},
        valid: true,
        touched: true,
      },
    },
  });

  const [formValidity, setformValidity] = useState(false);

  useEffect(() => {
    setContactData({
      ...contactData,
      email: {
        ...contactData.email,
        value: email,
        validation: {
          ...contactData.email.validation,
          valid: true,
        },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inputChange = (e, inputName) => {
    const inputValue = e.target.value;

    let inputValid;

    if (
      contactData[inputName].validation.required.minLength &&
      contactData[inputName].validation.required.maxLength
    ) {
      const minLength = contactData[inputName].validation.required.minLength;
      const maxLength = contactData[inputName].validation.required.maxLength;
      inputValid =
        inputValue.length >= minLength && inputValue.length <= maxLength;
    } else {
      inputValid = true;
    }

    const updatedContactData = {
      ...contactData,
    };
    const updatedValidation = {
      ...contactData[inputName].validation,
      touched: true,
      valid: inputValid,
    };
    const updatedContactElement = {
      ...contactData[inputName],
      value: inputValue,
      validation: updatedValidation,
    };

    updatedContactData[inputName] = updatedContactElement;

    const isvalid = checkFormValidation(updatedContactData);

    setContactData(updatedContactData);
    setformValidity(isvalid);
  };

  const checkFormValidation = (data) => {
    let isValid = true;
    for (const key in data) {
      isValid = isValid ? data[key].validation.valid : false;
    }
    return isValid;
  };

  const contactDataArray = [];
  for (const key in contactData) {
    contactDataArray.push({ id: key, config: contactData[key] });
  }

  const onOrderClicked = (e) => {
    e.preventDefault();
    const orderData = {
      ingredients: {
        ...ingredients,
      },
      price: +price.toFixed(2),
      name: contactData.name.value,
      email: contactData.email.value,
      address: contactData.address.value,
      postalCode: contactData.postalCode.value,
      deliveryMethod: contactData.deliveryMethod.value,
    };

    handleOrder(orderData);
    history.push('/orders');
  };

  return (
    <div className="ContactData">
      <h4>Please provide some information about you</h4>
      <form>
        {contactDataArray.map((element) => {
          return (
            <Input
              key={element.id}
              config={element.config.config}
              inputType={element.config.inputType}
              value={element.config.value}
              label={element.config.label}
              changed={(e) => inputChange(e, element.id)}
              invalid={
                element.config.validation.touched &&
                !element.config.validation.valid
              }
              errorMessage={element.config.validation.errorMessage}
            />
          );
        })}
        <Button
          type="Success"
          onClick={onOrderClicked}
          disabled={!formValidity}
        >
          ORDER
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.auth.email,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleOrder: (orderData) => dispatch(addOrderAsync(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
