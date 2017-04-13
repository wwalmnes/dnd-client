export const REQUEST_SKILL = 'REQUEST_SKILL';
export const RECEIVE_SKILL = 'RECEIVE_SKILL';
export const REQUEST_SKILLS = 'REQUEST_SKILLS';
export const RECEIVE_SKILLS = 'RECEIVE_SKILLS';

export function requestSkills (query, skip, take) {
	return {
		type: REQUEST_SKILL,
		query,
		skip,
		take
	};
}

export function receiveSkills (skills, skillsCount) {
	return {
		type: RECEIVE_SKILLS,
		skills,
		skillsCount
	};
}

export function fetchSkills (query, skip, take) {
	return (dispatch) => {
		dispatch(requestSkills(query, skip, take));
		return fetch(`http://localhost:3000/api/skills?query=${query}&skip=${skip}&limit=${take}`).then((response) => {
			return response.json();
		}).then((skillsData: any) => {
			dispatch(receiveSkills(skillsData.skills, skillsData.skillsCount));
		}).catch((error) => {
			console.error('Error in action fetchSkills - ', error);
		});;
	};
}

export function shouldFetchSkills (state, query, skip, take) {
	const skill = state !== undefined ? state.skill : undefined;
	if (skill.query !== query ||
		skill.skip !== skip ||
		skill.take !== take ||
		skill.skills.length === 0 ) {
		return true;
	} else {
		return false;
	}
}

export function fetchSkillsIfNeeded (query, skip, take) {
	return (dispatch, getState) => {
		if (shouldFetchSkills(getState(), query, skip, take)) {
			return dispatch(fetchSkills(query, skip, take));
		}
	};
}