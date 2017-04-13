import * as React from 'react';
import { Link } from 'react-router';
import { IPTab, ISTab, IPTabs, ISTabs } from './itabs';
// require('./tabs.scss');

class Tab extends React.Component<IPTab, ISTab> {
    
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick (e) {
        e.preventDefault();
        this.props.handleClick(this.props.id);
    }
    
    render () {
        return (
            <li className={this.props.isCurrent ? 'tab is-current' : 'tab'}>
                <a onClick={this.handleClick} href={this.props.url}>
                    {this.props.title}
                </a>
            </li>  
        );
    }
};

export default class Tabs extends React.Component<IPTabs, ISTabs> {
    
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            currentTab: 0
        };
    }
    
    handleClick (tab) {
        this.setState({ currentTab: tab});
        this.props.changeTab(tab);
    }
    
    render () {
        let tabs = [];
        
        tabs = this.props.tabs.map((tab, i) => {
             return (
                 <Tab key={i}
                      id={tab.id}
                      handleClick={this.handleClick}
                      url={tab.url}
                      title={tab.title}
                      isCurrent={(this.state.currentTab === i)}
                 />
             ) ;
        });
        
        return (
            <ul className="tabs">
                {tabs}
            </ul>
        );
    }
    
};