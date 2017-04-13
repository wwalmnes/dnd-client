import { IAbilityScore } from './abilityscore';

export interface ICharacter {
    _id: string,
    name: string,
    race: string,
    alignment: string,

    baseAttackBonus: number,
    
    // Level and class
    level: number,
    levelList: Array<number>,
    dndClassList: Array<string>,
    // Saves
    fortitudeBase: number,
    reflexBase: number,
    willBase: number,

    hitpoints: number,
    armorClass: number,
    abilityScores: Array<IAbilityScore>,
    
    // Saving throws
    savingThrows: Array<any>,
    
    // Spells (the strings are _ids of the spells),
    spellsKnown: Array<string>,
    spellsPrepared: Array<string>,
    
    equipments: Array<any>
};

export interface ISCharacter {
    character?: ICharacter,
    currentTab?: number
};

export interface IPCharacter {
    isFetching: boolean,
    didInvalidate: boolean,
    params: any,
    character: ICharacter,
    fetchCharacterIfNeeded(id: number): any 
    
};