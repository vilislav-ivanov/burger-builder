import React, { useState, useEffect, Fragment } from 'react';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Fragment>
        <Modal show={error} onClick={errorConfirmedHandler}>
          {error ? error.response.data.error : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
