import * as React from 'react';


export interface IPInput {
    labelName: string,
    type: string,
    name: string,
    value: string,
    onChange(event)
};

export default class Input extends React.Component<IPInput, any> {

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
        const { labelName, type, name, value } = this.props;
        // Generate unique id.
        const id = `${labelName.replace(' ', '')}-${(Math.random().toString(36).substring(7))}`;

        return (
            <div>
                <label htmlFor={id}>{labelName}</label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};