import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSpellIfNeeded } from '../../actions/spells-actions';
import { Link } from 'react-router';
import { ISpell, IPSpell } from './ispells';
import Tabs from '../tabs/tabs';
import Pagination from '../pagination/pagination';
import Button from '../button/button';

require('./_spells.scss');


class Spell extends React.Component<IPSpell, any> {
	
	constructor (props) {
		super(props);
	}
	

	componentDidMount () {
		this.props.fetchSpellIfNeeded(this.props.params.id);
    }
	
	render () {
		const { spell, isFetching, isAuthenticated } = this.props;

		return (
			 <section className="page-container">
				<header style={{backgroundImage: 'url(/public/images/landscapes/landscape1.png)'}}>
					<h2>Spell: { spell.name ? spell.name: null }</h2>
					<div className="page-header-filter"></div>
				</header>
				
				
				{ spell && spell.name ? 
					<div className="spell-container">
						<article className="box-white">
							{ isAuthenticated ?
								<Button
									title="Add to spellbook"
									classNames="btn btn-primary"
									textClassNames="btn-text"
									isDisabled={false}
									buttonTrigger={() => {console.log('TODO');}}
								/>
							: null }
							<header>
								<h3>{spell.name}</h3>
								<h4>{spell.type}</h4>
								<div>
									<span className="bold">Level: </span>
									<span>{spell.levels[0]}</span>
								</div>
								{
									spell.components ? 
									<div>
										<span className="bold">Components: </span>
										<span>{spell.components}</span>
									</div> : null
								}
								{
									spell.castingTime ?
									<div>
										<span className="bold">Casting time: </span>
										<span>{spell.castingTime}</span>
									</div> : null
								}
								{
									spell.range ?
									<div>
										<span className="bold">Range: </span>
										<span>{spell.range}</span>
									</div> : null
								}
								{
									spell.effect ? 
									<div>
										<span className="bold">Effect: </span>
										<span>{spell.effect}</span>
									</div> : null
								}
								{
									spell.duration ?
									<div>
										<span className="bold">Duration: </span>
										<span>{spell.duration}</span>
									</div> : null
								}
								{
									spell.savingThrow ?
									<div>
										<span className="bold">Saving throw: </span>
										<span>{spell.savingThrow}</span>
									</div> : null
								}
								{
									spell.spellResistance ?
									<div>
										<span className="bold">Spell Resistance: </span>
										<span>{spell.spellResistance ? 'Yes' : 'No'}</span>
									</div> : null
								}
								
							</header>
							<div className="description">{spell.description}</div>
						</article>
					</div> : null
				}
				
				
			</section>
		);
	}
};

const mapStateToProps = (state) => {
	const spells = state !== undefined ? state.spells : undefined;
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

export default connect(mapStateToProps, { fetchSpellIfNeeded })(Spell);