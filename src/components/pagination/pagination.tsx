import * as React from 'react';
require('./_pagination.scss');

export interface IPPagination {
    pages: number,
	handleChangeCallback(currentPage: number),
    nextCallback(currentPage: number),
    previousCallback(currentPage: number),

	btnPreviousClassName?: string,
	btnNextClassName?: string,
	paginationInputClassName?: string,
};

export interface ISPagination {
	currentPage: number
};

export default class Pagination extends React.Component<IPPagination, ISPagination> {
    
    constructor (props) {
        super(props);
        this.state = {
            currentPage: 0
        };
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange (event) {
		let newPage = event.target.value;
		if (newPage > this.props.pages ||
			newPage < 0) { return; }
		this.setState({
			currentPage: newPage
		});
		if (!isNaN(parseInt(newPage, 10))) {
			this.props.handleChangeCallback(newPage);
		}
	}



	nextPage () {
		if (this.state.currentPage === this.props.pages) { return ; }
		this.setState({
			currentPage: this.state.currentPage + 1
		});
		// Need to do + 1 because state has not yet changed.
		this.props.nextCallback(this.state.currentPage + 1);
	}

	previousPage () {
		if (this.state.currentPage === 0) { return ; }
		this.setState({
			currentPage: this.state.currentPage - 1
		});
		// Need to do + 1 because state has not yet changed.
		this.props.previousCallback(this.state.currentPage - 1);
	}

    
    render () {
        const { pages } = this.props;
        
        return (
            <div className="pagination">
                <button className="btn btn-secondary" onClick={this.previousPage} disabled={this.state.currentPage <= 0}>Previous</button>
				<div className="pagination-input-container">
					<input type="number" min={0} max={pages} value={this.state.currentPage+1} onChange={this.handleChange}/>
					<span>of {pages+1}</span>
				</div>
				
				<button className="btn btn-secondary" onClick={this.nextPage} disabled={this.state.currentPage >= pages}>Next</button>
            </div>
        );
    }
    
};