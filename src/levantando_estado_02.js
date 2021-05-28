// https://es.reactjs.org/docs/lifting-state-up.html

const scaleNames = {
    c: 'Celcius',
    f: 'Farenheit'
}

function toCelcius(farenheit) {
    return (farenheit - 32) * 5 / 9
}

function toFarenheit(celcius) {
    return (celcius * 9 / 5) + 32
}

function tryConvert(temperature, convertFunction) {
    const input = parseFloat(temperature);
    if (isNaN(input))
        return '';
    const output = convertFunction(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}


/*****************************************************************************************************/


function BoilingVerdict({ celcius }) {
    if (celcius >= 100)
        return <p>El agua va a hervir</p>

    return <p>El agua no va a hervir</p>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.props.onTemperatureChange(evt.target.value);
    }

    render() {
        const scale = this.props.scale;
        const temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>Introduzca la temperatura en {scaleNames[scale]}:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelciusChange = this.handleCelciusChange.bind(this);
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }

    handleCelciusChange(temperature) {
        this.setState({ temperature, scale: 'c' });
    }

    handleFarenheitChange(temperature) {
        this.setState({ temperature, scale: 'f' });
    }

    render() {

        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celcius = scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
        const farenheit = scale === 'c' ? tryConvert(temperature, toFarenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celcius}
                    onTemperatureChange={this.handleCelciusChange} />
                <TemperatureInput scale="f"
                    temperature={farenheit}
                    onTemperatureChange={this.handleFarenheitChange} />
                <BoilingVerdict celcius={parseFloat(temperature)} />
            </div>
        );
    }

}

const App = () => (<div><Calculator /></div>);

ReactDOM.render(<App />, document.getElementById("root"));