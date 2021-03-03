import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios';
import { addOrder } from '../../../actions';
import withErrorHandler from '../../../hoc/withErrorHandler';
import './ContactData.css';

const ContactData = ({ ingredients, price, emailAddress, addOrder }) => {
  const history = useHistory();
  const [contactData, setContactData] = useState({
    firstName: {
      inputType: 'input',
      value: '',
      label: 'First Name',
      config: {
        type: 'text',
        placeholder: 'Your First Name',
      },
      validation: {
        required: {
          minLength: 2,
          maxLength: 20,
        },
        valid: false,
        touched: false,
        errorMessage: 'First name must be between 2 and 20 symbols',
      },
    },
    lastName: {
      inputType: 'input',
      value: '',
      label: 'Last Name',
      config: {
        type: 'text',
        placeholder: 'Your Last Name',
      },
      validation: {
        required: {
          minLength: 2,
          maxLength: 20,
        },
        valid: false,
        touched: false,
        errorMessage: 'Last name must be between 2 and 20 symbols',
      },
    },
    emailAddress: {
      inputType: 'input',
      value: '',
      label: 'emailAddress',
      config: {
        type: 'emailAddress',
        placeholder: 'Your Mail',
      },
      validation: {
        required: {
          minLength: 6,
          maxLength: 40,
        },
        valid: false,
        touched: false,
        errorMessage: 'Email Address must be between 6 and 40 symbols',
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
      emailAddress: {
        ...contactData.emailAddress,
        value: emailAddress,
        validation: {
          ...contactData.emailAddress.validation,
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
      firstName: contactData.firstName.value,
      lastName: contactData.lastName.value,
      emailAddress: contactData.emailAddress.value,
      address: contactData.address.value,
      postalCode: contactData.postalCode.value,
      deliveryMethod: contactData.deliveryMethod.value,
    };

    addOrder(orderData);
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
  emailAddress: state.auth.emailAddress,
});

export default connect(mapStateToProps, { addOrder })(
  withErrorHandler(ContactData, axios)
);
