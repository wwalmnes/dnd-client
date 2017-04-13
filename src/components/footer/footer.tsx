import * as React from 'react';
import { Link } from 'react-router';
require('./footer.scss');

export default class Footer extends React.Component<any, any> {
    
    render () {
        return (
            <div className="Footer">
                <div className="Footer-container">
                    <span className="Footer-text">© Your Company</span>
                    <span className="Footer-spacer">·</span>
                    
                    <span className="Footer-spacer">·</span>
                    
                    <span className="Footer-spacer">·</span>
                    
                    <span className="Footer-spacer"> | </span>
                    <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport:</span>
                </div>
            </div>
        );
    }
    
};