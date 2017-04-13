import * as React from 'react';
import Input from '../components/form/input';
import TextArea from '../components/form/textarea';
import Select from '../components/form/select';

export const SpellSchool = [
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutaion',
    'Other'
];

export enum ESpellSchool {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Illusion,
    Necromancy,
    Transmutaion,
    Other
}


export const CastingTime = [
    'Standard action',
    'Move action',
    'Full-round action',
    'Free action',
    'Swift action',
    'Immediate action',
    'Not an action'
];


export enum ECastingTime {
    StandardAction,
    MoveAction,
    FullRoundAction,
    FreeAction,
    SwiftAction,
    ImmediateAction,
    NotAnAction
};

export enum EActionTypes {
    Round,
    Minute,

}

class SpellCreation extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            inputs: {}
        };
    }

    handleInputChange (type, value) {
        let tmpState = this.state.inputs;
        tmpState[type] = value;
        this.setState({
            inputs: tmpState
        });
    }

    submitForm () {
        console.log('Will submit: ', this.state);
    }


    render () {

        return (
            <section className="page-container">
                <div className="spell-creation-container">
                    <div className="box-white">
                        <header>
                            <h1>Spell creation</h1>
                        </header>
                        <Input labelName="Spell name:"
                            type="text"
                            name=""
                            value=""
                             onChange={(event) => { this.handleInputChange('name', event.target.value); }} />
                        <TextArea labelName="Spell description:"
                            name="description"
                            value=""
                            onChange={(event) => { this.handleInputChange('description', event.target.value); }} />
                        <Select labelName="Spell school:" options={SpellSchool} onChange={(event) => { this.handleInputChange('spellschool', event.target.value); }} />
                        <Select labelName="Casting time:" options={CastingTime} onChange={(event) => { this.handleInputChange('castingtime', event.target.value); }} />

                        <button onClick={this.submitForm}>Submit spell</button>
                    </div>
                </div>
            </section>
            
        );
    }

}

export default SpellCreation;