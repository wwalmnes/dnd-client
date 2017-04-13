import * as React from 'react';


export default class Weapon extends React.Component<any, any> {

	constructor (props) {
		super(props);
	}

	render () {
		const { name, damage, hands, rangeIncrement, baseAttackBonus, criticalThreat, criticalMultiplier, strModifier, dexModifier } = this.props;
		const extraAttacks = 1 + Math.floor(baseAttackBonus/6);
		let modifiedDamage = `${damage}`;
		let attackBonus = '+' + (baseAttackBonus + strModifier);
		if (rangeIncrement) {
			// if use strength / composite
			modifiedDamage = `${damage}`;
			attackBonus = `+ ${baseAttackBonus + dexModifier}`;
			for (let i = 1; i < extraAttacks; i++) {
				attackBonus += '/+' + (baseAttackBonus + dexModifier - 5*i);
			}
		} else {
			if (hands === 1) {
				modifiedDamage = `${damage} + ${strModifier}`;
			} else if (hands === 2) {
				modifiedDamage = `${damage} + ${strModifier * 2}`;
			} else {
				// case for more than 2 hands/arms?
			}
			for (let i = 1; i < extraAttacks; i++) {
				attackBonus += '/+' + (baseAttackBonus + strModifier - 5*i);
			}
		}

		return (
			<div className="weapon-container">
				<div className="weapon-stats-container">
					<div className="weapon-vertical-container">
						<div className="weapon-empty weapon-label"></div>
						<div className="weapon-stats weapon-name">{name}</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">Attack bonus</div>
						<div className="weapon-stats weapon-focus">
							<span>{attackBonus}</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">Damage</div>
						<div className="weapon-stats weapon-focus">
							<span>{modifiedDamage}</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">Threat</div>
						<div className="weapon-stats weapon-focus">
							<span>{criticalThreat}</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">Threat</div>
						<div className="weapon-stats weapon-focus">
							<span>x{criticalMultiplier}</span>
						</div>
					</div>
					{rangeIncrement ? 
						<div className="weapon-vertical-container">
							<div className="weapon-label">Range</div>
							<div className="weapon-stats weapon-focus">
								<span>{rangeIncrement}ft.</span>
							</div>
						</div>
					: null}
				</div>

				
			</div>
		);
	}

}

/**<div className="weapon-name">{name}</div>
				<div className="weapon-stats-container">
					<div className="weapon-vertical-container">
						<div className="weapon-label weapon-main">
							<span>Attack<br />bonus</span>
						</div>
						<div className="weapon-label weapon-main">
							<span>Damage</span>
						</div>
						<div className="weapon-label weapon-main">
							<span>Critical<br />threat</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-group">
							<div className="weapon-stats weapon-focus">
								<span>{attackBonus}</span>
							</div>
							<div className="weapon-label">
								<span>BAB</span>
							</div>
							<div className="weapon-stats">
								<span>+{baseAttackBonus}</span>
							</div>
						</div>
						<div className="weapon-stats weapon-damage weapon-focus">
							<span>{damage}</span>
						</div>
						<div className="weapon-stats weapon-damage weapon-focus">
							<span>19-20</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">
							<span>STR<br />modifier</span>
						</div>
						<div className="weapon-label">
							<span>STR<br />modifier</span>
						</div>
						<div className="weapon-label">
							<span>Critical<br />multiplier</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-stats">
							<span>+{strModifier}</span>
						</div>
						<div className="weapon-stats">
							<span>+{strModifier}</span>
						</div>
						<div className="weapon-stats">
							<span>x2</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">
							<span>Magic<br />modifier</span>
						</div>
						<div className="weapon-label">
							<span>Magic<br />modifier</span>
						</div>
						<div className="weapon-label">
							<span>Range</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>5 ft.</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">
							<span>Comp.<br />bonus</span>
						</div>
						<div className="weapon-label">
							<span>Comp.<br />bonus</span>
						</div>
						<div className="weapon-label">
							<span>Type</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>S</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">
							<span>Morale<br />bonus</span>
						</div>
						<div className="weapon-label">
							<span>Morale<br />bonus</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>+1</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-label">
							<span>Misc.<br />bonus</span>
						</div>
						<div className="weapon-label">
							<span>Misc.<br />bonus</span>
						</div>
					</div>
					<div className="weapon-vertical-container">
						<div className="weapon-stats">
							<span>+1</span>
						</div>
						<div className="weapon-stats">
							<span>+1</span>
						</div>
					</div>
				</div>
				 */