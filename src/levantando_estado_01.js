function BoilingVerdict({ celcius }) {
    if (celcius >= 100)
        return <p>El agua va a hervir</p>

    return <p>El agua no va a hervir</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = { temperature: '' };
    }

    handleChange(evt) {
        this.setState({ temperature: evt.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Introduzca la temperatura en Celsius:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
                <BoilingVerdict celcius={parseFloat(temperature)} />
            </fieldset>
        );
    }

}

const App = () => (<div><Calculator /></div>);

ReactDOM.render(<App />, document.getElementById("root"));