export interface ISpell {
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

export interface IPSpell {
    isAuthenticated: boolean,
    isFetching: boolean,
    didInvalidate: boolean,
    lastUpdated?: any,
    params: {
        id: number
    },
    spell: ISpell,
    fetchSpellIfNeeded (id: number)   
}

export interface IPSpells {
    isFetching: boolean,
    didInvalidate: boolean,
    lastUpdated?: any,
    spells: Array<ISpell>,
    spellsCount: number,
    fetchSpellsIfNeeded (query: string, skip: number, take: number): any
};
