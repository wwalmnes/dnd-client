import * as SA from '../actions/skills-actions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    skills: [],
    skill: {},
    skillCount: 0,
	query: '',
	skip: 0,
	take: 20
};

export default function Skills(state = initialState, action): any {
    switch (action.type) {
        case SA.RECEIVE_SKILLS:
            return Object.assign([], state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.lastUpdated, 
                skills: action.skills,
                skillsCount: action.skillsCount
            });

        case SA.REQUEST_SKILLS:
            return Object.assign([], state, {
                isFetching: true,
                didInvalidate: false
            });
         case SA.RECEIVE_SKILL:
            return Object.assign([], state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.lastUpdated, 
                skill: action.skill
            });

        case SA.REQUEST_SKILL:
            return Object.assign([], state, {
                isFetching: true,
                didInvalidate: false
            });
        default:
            return state;
    }
}
