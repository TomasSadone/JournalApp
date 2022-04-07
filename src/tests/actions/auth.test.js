/** * @jest-environment node */

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}; 
let store = mockStore(initState);
describe('Pruebas con las acciones de Auth', () => {

    beforeEach(() => store = mockStore(initState));

    test('login y logout deben crear la accion respectiva ', async () => {
        const actions = store.getActions();
        await store.dispatch(login('id','displayName'))
    
        expect(actions[0]).toEqual({
            type: types.login,
            payload: { uid: 'id', displayName: 'displayName' }
        });
    
        await store.dispatch(logout());
        expect(actions[1]).toEqual({type:types.logout});
    });
    
    test('debe realizar el startLogout', async () => {
        await store.dispatch(startLogout())
        const actions = store.getActions();
    
        expect(actions[0]).toEqual({ 
            type: types.logout
        });
    
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        });
    });
    
    test('debe de inicial el startLoginEmailPassword', async () => {
        await store.dispatch(startLoginEmailPassword('test@journalapp.com', 'pruebas123'));
        const actions = store.getActions();
    
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'txZUflXALjTyIzzeCtnxmErrN7m2', 
                displayName: null
            }
        });
    });
}); 