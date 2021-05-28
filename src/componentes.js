// Componente de clase.
class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() }
    }

    componentDidMount() {
        console.log("Crea el intervalo");
        this.time = setInterval(
            () => this.updateTime(),
            1000
        );
    }

    componentWillUnmount() {
        console.log('Elimina el intervalo');
        clearInterval(this.time);
    }

    updateTime() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Reloj</h1>
                <h2>
                    <span>{this.state.date.toLocaleTimeString()}</span>
                </h2>
            </div>
        );
    }
}

const App = () => {
    const [showButton, setState] = React.useState(true);
    return (
        <div>
            <button onClick={() => setState(!showButton)} >{showButton ? 'Ocultar' : 'Mostrar'} reloj</button>
            <div>
                {showButton && <Clock />}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));



/***************************************************************************************************/



// Componente funcional.
function Clock() {

    const [date, setState] = React.useState(new Date());

    const updateTime = () => setState(new Date());

    React.useEffect(() => {
        console.log("Crea el intervalo");
        setInterval(updateTime, 1000);
    }, []);

    React.useEffect(() => {
        return () => {
            console.log('Elimina el intervalo');
            clearInterval(updateTime);
        }
    }, []);

    return (
        <div>
            <h1>Reloj</h1>
            <h2>
                <span>{date.toLocaleTimeString()}</span>
            </h2>
        </div>
    );
}

const App = () => {
    const [showButton, setState] = React.useState(true);
    return (
        <div>
            <button onClick={() => setState(!showButton)} >{showButton ? 'Ocultar' : 'Mostrar'} reloj</button>
            <div>
                {showButton && <Clock />}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));