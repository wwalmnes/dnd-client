import * as React from 'react';

export default class ArmorClass extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        const character = this.props.character,
            dexModifier = Math.floor((character.abilityScores[1].value - 10) / 2);

        const totalAC = 10 + character.armorClass + dexModifier,
            touchAC = 10 + dexModifier,
            ffAC = 10 + character.armorClass;

        return (
            <div className="ac-container">
                <div className="stats-container">
                    <div className="stats-text">
                        <span className="stats-label"></span>
                        <span className="title-small text-center">AC</span>
                        <span className="title-full-name text-uppercase text-center">Armor class </span>
                    </div>
                    <div className="stats-value">
                        <span className="stats-label">Total</span>
                        <span className="">{totalAC}</span>
                    </div>

                </div>
                <div className="stats-container">
                    <div className="stats-value stats-secondary no-padding">
                        <span className="stats-label no-padding">Touch</span>
                        <span className="">{touchAC}</span>
                    </div>
                    <div className="stats-value stats-secondary align-right">
                        <span className="stats-label">Flat-footed</span>
                        <span className="">{ffAC}</span>
                    </div>
                </div>
            </div>
        );
    }

    _onChange() {
        //   this.setState(getSpells());
    }
};