import { ISpell, IPSpells } from '../components/spells/ispells';
import { CALL_API } from '../middleware/api';

export const SPELLS_REQUEST = 'SPELLS_REQUEST';
export const SPELLS_SUCCESS = 'SPELLS_SUCCESS';
export const SPELLS_FAILURE = 'SPELLS_FAILURE';

export const SPELL_REQUEST = 'SPELL_REQUEST';
export const SPELL_SUCCESS = 'SPELL_SUCCESS';
export const SPELL_FAILURE = 'SPELL_FAILURE';

export const SPELL_EDIT_REQUEST = 'SPELL_EDIT_REQUEST';
export const SPELL_EDIT_SUCCESS = 'SPELL_EDIT_SUCCESS';
export const SPELL_EDIT_FAILURE = 'SPELL_EDIT_FAILURE';
export const SET_SPELL_EDIT_VALUE = 'SET_SPELL_EDIT_VALUE';

const BASE_URL = 'http://localhost:3000/api/';
export function fetchSpells(query, skip, take) {
	return {
		[CALL_API]: {
			endpoint: `spells?query=${query}&skip=${skip}&limit=${take}`,
			authenticated: true,
			types: [SPELLS_REQUEST, SPELLS_SUCCESS, SPELLS_FAILURE]
		}
	};
};

function shouldFetchSpells(state, query) {
	const spells = state !== undefined ? state.spells : undefined;
	if (!spells) {
		return true;
	} else if (spells.isFetching) {
		return false;
	} else {
		return spells.didInvalidate;
	}
}


export function fetchSpellsIfNeeded(query, skip, take) {
	return (dispatch, getState) => {
		// if (shouldFetchSpells(getState(), query)) {
		return dispatch(fetchSpells(query, skip, take));
		// }
	};
}

function fetchSpell(id) {
	return {
		[CALL_API]: {
			endpoint: `spells/${id}`,
			authenticated: true,
			types: [SPELL_REQUEST, SPELL_SUCCESS, SPELL_FAILURE]
		}
	};
}

function shouldFetchSpell(state, id) {
	const spell = state !== undefined ? state.spell : undefined;
	if (!spell || spell._id !== id) {
		return true;
	} else {
		return false;
	}
}

export function fetchSpellIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldFetchSpell(getState(), id)) {
			return dispatch(fetchSpell(id));
		}
	};
}

function fetchSpellEdit(id) {
	return {
		[CALL_API]: {
			endpoint: `spells/${id}`,
			authenticated: true,
			types: [SPELL_EDIT_REQUEST, SPELL_EDIT_SUCCESS, SPELL_EDIT_FAILURE]
		}
	};
}

function shouldFetchSpellEdit(state, id) {
	const spell = state !== undefined ? state.spellEdit : undefined;
	if (!spell || spell._id !== id) {
		return true;
	} else {
		return false;
	}
}

export function fetchSpellEditIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldFetchSpellEdit(getState(), id)) {
			return dispatch(fetchSpellEdit(id));
		}
	};
}

export function setSpellEditValue (key, value) {
	return {
		type: SET_SPELL_EDIT_VALUE,
		key,
		value
	};
}

export function saveSpellEdit () {
	return (dispatch, getState) => {
		let spell = getState().spellEdit.spell;
		fetch(`${BASE_URL}spells/${spell._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('id_token') || null
			},
			body: JSON.stringify(spell)
		}).then(response => {
			console.log('Save spell success: ', response);
		}).catch(error => {
			console.log('Save spell error: ', error);
		})
	};
}