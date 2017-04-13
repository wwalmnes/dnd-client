import * as SA from '../actions/spells-actions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    spell: {}
};

export default function spellEdit (state = initialState, action): any {
    console.log('action: ', action);
    switch (action.type) {
         case SA.SPELL_EDIT_SUCCESS:
            return Object.assign([], state, {
                isFetching: false,
                didInvalidate: false,
                spell: action.response
            });
        case SA.SPELL_EDIT_REQUEST:
            return Object.assign([], state, {
                isFetching: true,
                didInvalidate: false
            });
        case SA.SET_SPELL_EDIT_VALUE:
            return {...state,
                spell: {...state.spell,
                    [action.key]: action.value
                }
            };

        default:
            return state;
    }
}
