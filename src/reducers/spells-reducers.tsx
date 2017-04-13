import * as SA from '../actions/spells-actions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    spells: [],
    spell: {},
    spellsCount: 0
};

export default function Spells(state = initialState, action): any {
    switch (action.type) {
        case SA.SPELLS_SUCCESS:
            return Object.assign([], state, {
                isFetching: false,
                didInvalidate: false,
                spells: action.response.spells,
                spellsCount: action.response.count
            });
        case SA.SPELLS_REQUEST:
            return Object.assign([], state, {
                isFetching: true,
                didInvalidate: false
            });

         case SA.SPELL_SUCCESS:
            return Object.assign([], state, {
                isFetching: false,
                didInvalidate: false,
                spell: action.response
            });
        case SA.SPELL_REQUEST:
            return Object.assign([], state, {
                isFetching: true,
                didInvalidate: false
            });

        default:
            return state;
    }
}
