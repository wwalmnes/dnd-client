import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCharactersIfNeeded } from '../actions/characters-actions';

interface ICharacter {
    _id: string,
    name: string,
    race: string,
    alignment: string,
    level: number,
    hitpoints: number
}

interface ISCharacters {
    characters?: Array<ICharacter>
}

class Characters extends React.Component<any, ISCharacters> {
    
    constructor (props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount () {
		this.props.fetchCharactersIfNeeded('', 0, 20);
    }
    
    render () {
		const { isFetching, didInvalidate, characters, charactersCount } = this.props;
        let charactersEl = [];
        
        if (characters) {
            charactersEl = characters.map((character, i) => {
                return (
                    <div key={i} className="box-white character-box">
                        <div className="character-visual">
                            <Link className="no-border" to={"/character/" + character._id}>
                                <img src="/public/images/portraits/dwarf-wizard.png" />
                            </Link>
                        </div>
                        <div className="character-information">
                            <h3 className="character-name"><Link to={"/character/" + character._id}>{character.name}</Link></h3>
                            <h4>Classes:</h4>
                            <p>Wizard 7</p>
                            <p>Effigy master 12</p>
                        </div>
                    </div>
                ); 
            });
        }
        
        return (
            <section className="page-container">
                <header style={{backgroundImage: 'url(/public/images/landscapes/landscape3.png)'}}>
                    <h2>Characters</h2>
                    <div className="page-header-filter"></div>
                </header>

                <div className="characters-container">
                    {charactersEl.length > 0 ? charactersEl : null}
                   
                </div>
            </section>
        );
    }
    
};

const mapStateToProps = (state) => {
	const characters = state !== undefined ? state.characters : undefined;
	const {
		isFetching,
		didInvalidate
	} = {
		isFetching: characters !== undefined ? characters.isFetching : false,
		didInvalidate: characters !== undefined ? characters.didInvalidate : false 
	};

	return {
		isFetching,
		didInvalidate,
		charactersCount: characters.charactersCount,
		characters: characters.characters
	};
};

export default connect(mapStateToProps, {fetchCharactersIfNeeded})(Characters);