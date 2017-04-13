import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../components/form/input';
import TextArea from '../components/form/textarea';
import Select from '../components/form/select';
import { fetchSpellEditIfNeeded, setSpellEditValue, saveSpellEdit } from '../actions/spells-actions';

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

class SpellEdit extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            inputs: {}
        };
    }

    componentDidMount () {
        this.props.fetchSpellEditIfNeeded(this.props.params.id);
    }

    handleInputChange (e) {
        if (e) {
            this.props.setSpellEditValue(e.target.name, e.target.value);
        }
    }

    submitForm () {
        this.props.saveSpellEdit()
    }


    render () {
        const { spell, isFetching, isAuthenticated } = this.props;

        console.log('spell: ', spell);
        return (
            <section className="page-container">
                <div className="spell-creation-container">
                    <div className="box-white">
                        <header>
                            <h1>Spell edit: <span>{spell.name}</span></h1>
                        </header>
                        <Input labelName="Spell name:"
                            type="text"
                            name="name"
                            value={spell.name}
                            onChange={this.handleInputChange} />
                        <Input labelName="Spell type:"
                            type="text"
                            name="type"
                            value={spell.type}
                            onChange={this.handleInputChange} />
                        <Input labelName="Spell range:"
                            type="text"
                            name="range"
                            value={spell.range}
                            onChange={this.handleInputChange} />
                        <Input labelName="Spell effect:"
                            type="text"
                            name="effect"
                            value={spell.effect}
                            onChange={this.handleInputChange} />
                        <TextArea labelName="Spell description:"
                            name="description"
                            value={spell.description}
                            onChange={this.handleInputChange} />
                        <Select labelName="Spell school:" options={SpellSchool} onChange={this.handleInputChange} />
                        <Select labelName="Casting time:" options={CastingTime} onChange={this.handleInputChange} />

                        <button onClick={this.submitForm}>Edit spell</button>
                    </div>
                </div>
            </section>
            
        );
    }

}

const mapStateToProps = (state) => {
	const spells = state !== undefined ? state.spellEdit : undefined;
	const isAuthenticated = state.auth.isAuthenticated;
	const {
		isFetching,
		didInvalidate
	} = {
		isFetching: state !== undefined ? state.isFetching : false,
		didInvalidate: state !== undefined ? state.isFetching : false
	};
	// if (state !== undefined) { spells = state.spells; }
	return {
		isAuthenticated,
		isFetching,
		didInvalidate,
		spell: spells.spell
	};
};

export default connect(mapStateToProps, { fetchSpellEditIfNeeded, setSpellEditValue, saveSpellEdit })(SpellEdit);