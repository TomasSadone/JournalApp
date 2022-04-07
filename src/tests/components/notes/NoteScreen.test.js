import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id:1234,
            title:'hola',
            body: 'mundo',
            date: 0
        }
    }
}; 

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen/>
    </Provider>
);
describe('Pruebas en NoteScreen', () => {
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('debe disparar el active note', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola'
            }
        });
        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body:'mundo',
                title:'Hola',
                id:1234,
                date: 0
            }
        )
    })
})