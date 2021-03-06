import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSkillsIfNeeded } from '../../actions/skills-actions';
import { Link } from 'react-router';
import { ISkill, IPSkills } from './iskills';
import Pagination from '../pagination/pagination';

require('./_spells.scss');

const getSearchFilteredSpells = (packages, searchText) => {
	return packages.filter((volumePackage, i) => {
		if (searchText === undefined || searchText.length === 0) {
			return true;
		} else if (volumePackage.name.indexOf(searchText) !== -1) {
			return true;
		}
		return false;
	});
};

class Skills extends React.Component<any, any> {
	
	constructor (props) {
		super(props);
		this.state = { spells: null, currentPage: 0, searchQuery: '' };
		this.handleTabs = this.handleTabs.bind(this);
		this.handlePagination = this.handlePagination.bind(this);
		this.handleSearch = this.handleSearch.bind(this)
		this.searchSpells = this.searchSpells.bind(this)
	}
	
	componentDidMount () {
		this.props.fetchSpellsIfNeeded('', 0, 20);
	}

	handleSearch (event) {
		let query = event.target.value,
			take = 20;
		this.setState({ searchQuery: query });
		//this.props.fetchSpellsIfNeeded(query, this.state.currentPage * take, take);
	}

	searchSpells (event) {
		let take = 20;
		this.props.fetchSpellsIfNeeded(this.state.searchQuery, this.state.currentPage * take, take);
	}
	
	handleTabs (tab) {
		this.setState({ currentTab: tab });
	}

	handlePagination (currentPage) {
		let take = 20;
		console.log('HandlePagination: ', currentPage);
		this.setState({ currentPage: 0 });
		this.props.fetchSpellsIfNeeded('', currentPage * take, take);
	}
	
	render () {
		const { isFetching, lastUpdated, spellsCount } = this.props;
		const take = 20;
		const spellPages = Math.floor(spellsCount / 20);
		let spells = [];
		if (this.props.spells) {
			spells = this.props.spells.map((spell, i) => {
				return (
					<tr key={i}>
						<td>
							<Link className="" to={"/spell/" + spell._id}>
                                {spell.name}
                            </Link>
						</td>
						<td>{spell.levels[0]}</td>
						<td>{spell.type}</td>
					</tr>
				);
			});
		}
		
		return (
			 <section className="page-container">
				<header style={{backgroundImage: 'url(/public/images/landscapes/landscape1.png)'}}>
					<h2>Spells</h2>
					<div className="page-header-filter"></div>
				</header>
				
				
				
				<div className="spells-container">
					<Pagination
						pages={spellPages}
						nextCallback={this.handlePagination}
						previousCallback={this.handlePagination}
						handleChangeCallback={this.handlePagination}
					/>
					<input type="text" value={this.state.searchQuery} onChange={this.handleSearch}/>
					<button onClick={this.searchSpells}>Search</button>

					{spells.length > 0 ? 
						<div className="box-white">
						<table className="test">
							<thead>
								<tr>
									<th>Name</th>
									<th>Level</th>
									<th>Type</th>
								</tr>
							</thead>
							<tbody>
								{spells}
							</tbody>
						</table>
						</div>
					: null}
					{isFetching &&
					<h2>Loading...</h2>
					}
				</div>
				
			</section>
		);
	}
};

const mapStateToProps = (state) => {
	const skills = state !== undefined ? state.skills : [];
	const skillsCount = state !== undefined ? state.skillsCount : 0;
	const {
		isFetching,
		didInvalidate,
		lastUpdated
	} = {
		isFetching: state !== undefined ? state.isFetching : false,
		didInvalidate: state !== undefined ? state.isFetching : false,
		lastUpdated: new Date()
	};
	// if (state !== undefined) { skills = state.skills; }
	return {
		isFetching,
		didInvalidate,
		// lastUpdated,
		skillsCount: skills.skillsCount,
		skills: skills.skills
	};
};

export default connect(mapStateToProps, { fetchSkillsIfNeeded })(Skills);