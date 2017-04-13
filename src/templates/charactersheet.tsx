import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCharacterIfNeeded } from '../actions/characters-actions';
import { ICharacter, IPCharacter, ISCharacter } from '../components/character/icharacter';
import Tabs from '../components/tabs/tabs';
import AbilityScores from '../components/character/abilityscores';
import HitPoints from '../components/character/hitpoints';
import ArmorClass from '../components/character/armorclass';
import Initiative from '../components/character/initiative';
import Weapon from '../components/character/weapon';
import * as d3 from 'd3';
let rd3:any = require('rd3');
const PieChart = rd3.PieChart;

//require('../components/character/_character.scss');

class CharacterSheet extends React.Component<IPCharacter, ISCharacter> {
    
    constructor (props) {
        super(props);
        this.state = { character: null, currentTab: 0 };
        this.handleTabs = this.handleTabs.bind(this);
    }
    
    componentDidMount () {
		this.props.fetchCharacterIfNeeded(this.props.params.id);
    }
    
    handleTabs (tab) {
        this.setState({ currentTab: tab });
    }
    
    render () {
        const { isFetching, didInvalidate, character } = this.props;
		let characterName,
        characterLevel, 
        abilityScores = [],
		hitPoints,
		armorClass,
		initiative,
		spellsKnown,
		spellsPrepared,
		pageTitle = '';
		let pieData = [
			{label: "Damage taken", value: 37.0},
			{label: "Remaining HP", value: 68.0 }
		];
		let colors = d3.scale.ordinal().range(['#ed5565', '#1ab394']);
		
        
        let tabs = [
            { id: 0, title: 'Attacks', url: '#' },
            // { id: 1, title: 'Ranged attacks', url: '#' },
            { id: 2, title: 'Spells', url: '#' }  
        ];
        let meleeWeapons = [];
		let content;
        
		if (Object.keys(character).length === 0) {
            return <div></div>;
        }
        if (character) {
			// let conModifier = Math.floor((character.abilityScores[2].value-10)/2),
            //     baseHitPoints = character.hitpoints,
            //     totalHitPoints = baseHitPoints + (conModifier * character.level);
                
			pageTitle = character.name;
            characterName = <h2>{character.name} level {character.level}<span className="icon-power"></span></h2>;
            // characterLevel = character.level;
            let strModifier, dexModifier;
 			abilityScores = character.abilityScores.map((abilityScore, i) => {
                if (abilityScore.type === 'strength') { strModifier = Math.floor((abilityScore.value-10)/2)}
                if (abilityScore.type === 'dexterity') { dexModifier = Math.floor((abilityScore.value-10)/2)}
			});
			hitPoints = <HitPoints character={character} />;
			armorClass = <ArmorClass character={character} />;
			initiative = <Initiative character={character} />;
			// spellsKnown = <SpellList key={1} spells={character.spellsKnown} character={character} actions={[castSpellBtn]}/>
			// spellsPrepared = <SpellList key={2} spells={character.spellsPrepared} character={character} actions={[prepareSpellBtn]}/>
			// spellsKnown = <SpellList key={1} spells={character.spellsKnown} character={character} actions={['prepare']}/>
			// spellsPrepared = <SpellList key={2} spells={character.spellsPrepared} character={character} actions={['cast']}/>
            meleeWeapons = character.equipments.map((equipment, i) => {
                return <Weapon
                    key={equipment.name + i}
                    name={equipment.name}
                    damage={equipment.dmgM}
                    hands={equipment.hands}
                    rangeIncrement={equipment.rangeIncrement}
                    criticalThreat={equipment.criticalThreat}
                    criticalMultiplier={equipment.criticalMultiplier}
                    baseAttackBonus={character.baseAttackBonus}
                    strModifier={strModifier}
                    dexModifier={dexModifier}
                />
            });

			content = (
				<div className="character-container">
                    <AbilityScores abilityScores={character.abilityScores} />

                    <div className="box-white general-stats">
						<div className="hitpoints-container">
							<div className="hitpoints-visualization">
								<PieChart
									data={pieData}
									width={150}
									height={150} 
									radius={70}
									innerRadius={40}
									colors={colors}
									showOuterLabels={false}
									sectorBorderColor="white"
									valueTextFormatter={(val) => {
										return val;
									}}
									title="" />
									<div className="stats-container">
										<div className="stats-text">
											<span className="stats-label"></span>
											<span className="title-small text-center">HP</span>
											<span className="title-full-name text-uppercase text-center">Hitpoints</span>
										</div>
									</div>
							</div>
							{/*<div className="hitpoints">
								{hitPoints}
							</div>*/}
								{armorClass}
							
						</div>
					
                        
                        <div className="initiative-container">
                            {initiative}
                        </div>
                        
                        <div style={{ display: 'none'}}>
                            <div className="stats-container">
                                <div className="stats-text">
                                    <span className="stats-label"></span>
                                    <span className="title-small text-center">MS</span>
                                    <span className="title-full-name text-uppercase text-center">Movement speed</span>
                                </div>
                                <div className="stats-value">
                                    <span className="stats-label">Total</span>
                                    <span className="">20</span>
                                </div>
                                 <div className="stats-text">
                                    <span className="stats-label"></span>
                                    <span className="title-small text-center">DR</span>
                                    <span className="title-full-name text-uppercase text-center">Damage Reduction</span>
                                </div>
                                <div className="stats-value">
                                    <span className="stats-label">Total</span>
                                    <span className="">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="attack-container">
                        <Tabs tabs={tabs} changeTab={this.handleTabs}/>
                        
                        <div className="box-white">
                            { this.state.currentTab === 0 ? (
                                <div>
                                {meleeWeapons}
                                </div>
                            ) : null }
                            { this.state.currentTab === 1 ? (
                                <h2>Ranged weapons</h2>
                            ) : null }
                            { this.state.currentTab === 2 ? (
                                <h2>Spells</h2>
                            ) : null }
                        </div>
                    </div>
                </div>
			);
		} else {
			content = (
				<div className="character-container">
					<h2>Loading...</h2>
				</div>
			)
		}
        
        return (
             <section className="page-container">
                <header style={{backgroundImage: 'url(/public/images/landscapes/landscape3.png)'}}>
                    {pageTitle}
                    <div className="page-header-filter"></div>
                </header>

                {content}
			</section>
        );
    }
    
};

const mapStateToProps = (state) => {
	const character = state !== undefined ? state.characters : undefined;
	const {
		isFetching,
		didInvalidate
	} = {
		isFetching: character !== undefined ? character.isFetching : false,
		didInvalidate: character !== undefined ? character.didInvalidate : false,
	};

	return {
		isFetching,
		didInvalidate,
		character: character.character
	};
};
// <any, any, IPCharacter>
export default connect(mapStateToProps, { fetchCharacterIfNeeded })(CharacterSheet);