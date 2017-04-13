import * as React from 'react';
import AbilityScore from './abilityscore';

const AbilityScores = ({abilityScores}) => (
    <div className="box-white ability-scores">
        {abilityScores.map((abilityScore, i) => {
            return <AbilityScore key={i} 
                type={abilityScore.type}
                value={abilityScore.value} />;
        })}
    </div>
);

export default AbilityScores;