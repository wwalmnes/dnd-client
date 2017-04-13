export interface ISkill {
    _id: string,
    name: string,
    race: string,
    alignment: string,
    type: string,
    

    components: Array<string>,
    castingTime: string,
    range: string,
    effect: string,
    duration: string,
    savingThrow: string,
    spellResistance: boolean,
    description: string,
    
    // Level and class
    levels: Array<string>
    
};

export interface IPSkill {
    isFetching: boolean,
    didInvalidate: boolean,
    lastUpdated?: any,
    params: {
        id: number
    },
    spell: ISkill,
    fetchSpellIfNeeded (id: number)   
}

export interface IPSkills {
    isFetching: boolean,
    didInvalidate: boolean,
    lastUpdated?: any,
    spells: Array<ISkill>,
    spellsCount: number,
    fetchSpellsIfNeeded (query: string, skip: number, take: number): any
};
