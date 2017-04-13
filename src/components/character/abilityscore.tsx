import * as React from 'react';
import * as classNames from 'classnames';

export interface IAbilityScore {
    type: string,
    value: number
};

const AbilityScore = ({type, value}:IAbilityScore) => {
    let abilityScoreAbbreviation = type.substring(0, 3).toUpperCase();
    let modifier = Math.floor((value-10)/2);
    let modifierText = modifier > 0 ? '+' + modifier : modifier;
          
    let modifierClasses = classNames({
        'ability-score': true,
        'positive': modifier > 0,
        'negative': modifier < 0
    });

    return (
        <div className="ability-score-container">
            <div className="ability-score">
                <p className="ability-abbreviated text-center">{abilityScoreAbbreviation}</p>
                <p className="ability-name text-uppercase text-center">{type}</p>
            </div>
            <div className="ability-value">
                <p className="">{value}</p>
            </div>
            <div className="ability-modifier">
                <p className={modifierClasses}>{modifierText}</p>
            </div>
        </div>
    );
};

export default AbilityScore;