import * as React from 'react';


export interface IPTextArea {
    labelName: string,
    name: string,
    value: string,
    rows?: number,
    cols?: number,
    onChange(event)
};

export default class TextArea extends React.Component<IPTextArea, any> {

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
        const { labelName, name, value } = this.props;
        const cols = this.props.cols ? this.props.cols : 75;
        const rows = this.props.rows ? this.props.rows : 10;
        // Generate unique id.
        const id = `${labelName.replace(' ', '')}-${(Math.random().toString(36).substring(7))}`;

        return (
            <div>
                <label htmlFor={id}>{labelName}</label>
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    cols={cols}
                    rows={rows}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
};