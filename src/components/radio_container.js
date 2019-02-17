import React from "react";
import RadioButton from './radio_button'

class RadioContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selectedOption };
    }

    componentDidUpdate(prevProps){
        if (prevProps.selectedOption !== this.props.selectedOption) {
            this.setState({
                selected: this.props.selectedOption
            });
        }
    }

    onChange(selected) {
        this.setState({ selected });
        this.props.onCatFilterChange(selected, this.props.filterCriteria)
    }

    render() {
        const selectedKey = this.state.selected;
        return <>
            <div><label for="radio-group">Filter by {this.props.filterName}</label></div>
            <div>{this.props.radios.map(({val, ...radioProps}) => (
                    <RadioButton
                        {...radioProps} selected={selectedKey === val}
                        onChange={evt => this.onChange(val, evt)}
                        name='radio-group' />
                ))}</div>
        </>
    }
}

export default RadioContainer;