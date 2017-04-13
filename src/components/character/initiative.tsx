import * as React from 'react';
import { IPCharacter } from './icharacter';

export default class Initiative extends React.Component<any, any> {

      constructor (props) {
          super(props);
          this.state = {};
      }

      componentDidMount () {
      }

      render () {
          const character = this.props.character,
                dexModifier = Math.floor((character.abilityScores[1].value-10)/2),
                miscModifier = -1, // Just temporary
                dexModifierClasses = dexModifier > 0 ? ' positive' : ' negative',
                miscModifierClasses = miscModifier > 0 ? ' positive' : ' negative';
                
          return (
            <div className="stats-container">
                
                <div className="stats-text">
                    <span className="stats-label"></span>
                    <span className="title-small text-center">INIT</span>
                    <span className="title-full-name text-uppercase text-center">Initiative</span>
                </div>
                <div className="stats-value">
                    <span className="stats-label">Total</span>
                    <span className="">{dexModifier + miscModifier}</span>
                </div>
                <div className="stats-value">
                    <span className="stats-label">Dex mod.</span>
                    <span className={dexModifierClasses}>{dexModifier}</span>
                </div>
                <div className="stats-value">
                    <span className="stats-label">Misc. mod.</span>
                    <span className={miscModifierClasses}>{miscModifier}</span>
                </div>
            </div>
          );
      }

      _onChange () {
        //   this.setState(getSpells());
      }
};