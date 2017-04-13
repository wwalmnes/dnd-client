import * as React from 'react';
import { Link } from 'react-router';

require('./header.scss');

export default class Header extends React.Component<any, any> {

    render() {
        return (
            <nav className="navigation">
                <header>
                    <h1>My DnD</h1>
                </header>
                <ul className="navigation-menu">
                    <li className="">
                        <Link to="/characters" activeClassName="is-active">
                            <span className="item-icon icon-user"></span>
                            <span className="item-text">Characters</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/spells" activeClassName="is-active">
                            <span className="item-icon icon-magic-wand"></span>
                            <span className="item-text">Spells</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/login" activeClassName="is-active">
                            <span className="item-icon icon-enter"></span>
                            <span className="item-text">Login</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }

};