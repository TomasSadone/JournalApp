import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('pruebas en authReducer', () => {
    test('debe devolver uid y name', () => {
        const action = {
            type: types.login,
            payload: {
                uid:'idUnico',
                displayName:'Tomas'
            }
        };
        const state = authReducer({}, action)
        expect(state).toEqual({
            uid: 'idUnico',
            name: 'Tomas'
        });
    });
    test('debe limpiar initial state', () => {
        const initialState = {
            uid:'idUnico',
            displayName:'Tomas'
        }
        const action = {
            type: types.logout,
        };
        const state = authReducer(initialState, action)
        expect(state).toEqual({ });
    });
    test('debe devolver {}', () => {
        const action = {
            type: types.nada,
        };
        const state = authReducer({}, action)
        expect(state).toEqual({ });
    });
});