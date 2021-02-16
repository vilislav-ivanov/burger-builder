import React from 'react';

const orderAction = ({
  ingredients,
  price,
  name,
  email,
  address,
  postalCode,
  onAcceptButtonClicked,
  acceptButtonDisabled,
  onSendButtonClicked,
  sendButtonDisabled,
  onDeleteButtonClicked,
}) => {
  const ingredientsDisplay = Object.keys(ingredients).map((ingKey) => (
    <p key={ingKey} className="border p-1 mb-0">
      {ingKey}({ingredients[ingKey]})
    </p>
  ));
  return (
    <div className="container">
      <div className="row">
        {ingredientsDisplay}
        <p className="p-1 mb-0">${price.toFixed(2)}</p>
      </div>
      <div className="row py-2">
        <p className="mb-0 mr-1">
          Made by: {name}({email}).
        </p>
        <p className="mb-0">
          Address: {address}({postalCode}).
        </p>
      </div>
      <div className="row">
        <button
          className="btn btn-primary btn-sm"
          onClick={onAcceptButtonClicked}
          disabled={acceptButtonDisabled}
        >
          Accept
        </button>
        <button
          className="btn btn-secondary btn-sm mx-3"
          onClick={onSendButtonClicked}
          disabled={sendButtonDisabled}
        >
          Send
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDeleteButtonClicked}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
};

export default orderAction;
