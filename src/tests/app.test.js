import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import App from '../App';
import Wallet from '../pages/Wallet';
import rootReducer from '../redux/reducers/index';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Criando testes para Página de Login', () => {
  test('Testando se a tela inical é renderizada', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();

    const btnEntrar = screen.getByRole('button');
    expect(btnEntrar).toHaveTextContent('Entrar');
    expect(btnEntrar).toBeDisabled();
  });

  test('Se a tela wallet é renderizada corretamente', () => {
    const store = createStore(rootReducer);
    renderWithRouterAndRedux(
      <Provider store={ store }>
        <App />
      </Provider>,
      ['/carteira'],
    );

    const titleWallet = screen.getByRole('heading', { level: 3 });
    expect(titleWallet).toBeInTheDocument();
  });

  test('Se o Header é renderizado corretamente no caminho /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const testeEmail = 'teste@teste.com';
    const testePassword = '111222333';
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button');

    userEvent.type(email, testeEmail);
    userEvent.type(password, testePassword);
    userEvent.click(btnEntrar);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });

  test('Testa se o input de valor está funcionando', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, 'teste');
    expect(valueInput.value).toBe('');
  });
});
