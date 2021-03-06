import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Sidebar } from "../../../components/journal/Sidebar";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));




const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth: {
        uid:'123',
        name: 'tomas',
    },
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
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar/>
    </Provider>
);

describe('Pruebas en sidebar', () => {
    test('debe hacer match con snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('debe llamar el startLogout', () => {
        wrapper.find('.btn').simulate('click')
        expect(startLogout).toHaveBeenCalled();
    });
    test('debe llamar startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });
});