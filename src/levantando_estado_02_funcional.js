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

const TemperatureInput = (props) => {


    const handleChange = evt => {
        props.onTemperatureChange(evt.target.value);
    }

    return (
        <fieldset>
            <legend>Introduzca la temperatura en {scaleNames[props.scale]}:</legend>
            <input
                value={props.temperature}
                onChange={handleChange} />
        </fieldset>
    );

}

const Calculator = () => {

    const [state, setState] = React.useState({ temperature: '', scale: 'c' });

    const handleCelciusChange = temperature => {
        setState({ temperature, scale: 'c' });
    }

    const handleFarenheitChange = temperature => {
        setState({ temperature, scale: 'f' });
    }

    const scale = state.scale;
    const temperature = state.temperature;
    const celcius = scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
    const farenheit = scale === 'c' ? tryConvert(temperature, toFarenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celcius}
                onTemperatureChange={handleCelciusChange} />
            <TemperatureInput scale="f"
                temperature={farenheit}
                onTemperatureChange={handleFarenheitChange} />
            <BoilingVerdict celcius={parseFloat(temperature)} />
        </div>
    );


}

const App = () => (<div><Calculator /></div>);

ReactDOM.render(<App />, document.getElementById("root"));