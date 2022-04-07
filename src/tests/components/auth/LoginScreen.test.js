import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { MemoryRouter } from 'react-router-dom';
import { mount } from "enzyme";
import { Provider } from "react-redux"
import { LoginScreen } from "../../../components/auth/LoginScreen"
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}; 

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));


describe('Pruebas en LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('debe disparar la accion de startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });
    
    test('debe disparar la accion de startLoginEmailPassword con valores correspondientes', () => {
        wrapper.find('.animate__animated').simulate('submit')
        expect(startLoginEmailPassword).toHaveBeenCalledWith('tomas@mail.com','123123')
    })
});