export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const ERROR_API = 'ERROR_API';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const responseAPI = (currencies) => ({
  type: RESPONSE_API,
  currencies,
});

export const errorAPI = (error) => ({
  type: ERROR_API,
  error,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await response.json();
      delete result.USDT;
      return dispatch(responseAPI(result));
    } catch (error) {
      dispatch(errorAPI(error.message));
    }
  };
}
