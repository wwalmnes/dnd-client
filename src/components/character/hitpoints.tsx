import * as React from 'react';

export default class HitPoints extends React.Component<any, any> {

      constructor (props) {
          super(props);
          this.state = {};
      }

      componentDidMount () {
      }

      render () {
          const character = this.props.character,
                conModifier = Math.floor((character.abilityScores[2].value-10)/2),
                baseHitPoints = character.hitpoints,
                totalHitPoints = baseHitPoints + (conModifier * character.level),
                current = totalHitPoints - 34; // just temporary
                
          let hitpointsModifier = current > totalHitPoints ? ' positive' : ' negative';
          
          return (
              <div className="stats-container">
                
                <div className="stats-text">
                    <span className="stats-label"></span>
                    <span className="title-small text-center">HP</span>
                    <span className="title-full-name text-uppercase text-center">Hitpoints</span>
                </div>
                <div className="stats-value">
                    <span className="stats-label">Total</span>
                    <span className="">{totalHitPoints}</span>
                </div>
                <div className="stats-value">
                    <span className="stats-label">Current</span>
                    <span className={hitpointsModifier}>{current}</span>
                </div>
            </div>
          );
      }

      _onChange () {
        //   this.setState(getSpells());
      }
};