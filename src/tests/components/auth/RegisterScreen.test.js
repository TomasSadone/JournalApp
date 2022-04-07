import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { MemoryRouter } from 'react-router-dom';
import { mount } from "enzyme";
import { Provider } from "react-redux"
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
}; 

let store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>
);
describe('pruebas en RegisterScreen', () => { 
    test('debe hacer match con snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe hacer dispatch de accion pertinente', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change',{
            target: {
                value: '',
                name: 'email'
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Debe ingresar un mail valido'
        });
    });
    
    test('debe mostrar caja de alerta con el error', () => {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            },
            notes: {
                notes: [],
                active: null
            }
        }; 
        
        let store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
    })
});