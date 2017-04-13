import * as React from 'react';


export interface IPSelect {
    labelName: string,
    options: Array<any>,
    onChange(event)
};

export default class Select extends React.Component<IPSelect, any> {

    constructor (props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange (event) {
        this.setState({
            value: event.target.value
        });
        this.props.onChange(event);
    }

    render () {
        const { labelName, options } = this.props;
        // Generate unique id.
        const id = `${labelName.replace(' ', '')}-${(Math.random().toString(36).substring(7))}`;
        const optionsEl = options.map((option, i) => {
            return <option key={`${option}-${i}`} value={option}>{option}</option>;
        });

        return (
            <div>
                <label htmlFor={id}>{labelName}</label>
                <select value={this.state.value} onChange={this.handleChange}>
                    {optionsEl}
                </select>
            </div>
        );
    }
};