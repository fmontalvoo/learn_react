// Componente de clase.
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // Este enlace es necesario para hacer que `this` funcione en el callback    
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    }

    render() {
        // return (
        //     <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}
        //     </button>
        // );
        return (
            <button onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

const App = () => (<div><Toggle /></div>);

ReactDOM.render(<App />, document.getElementById("root"));



/***************************************************************************************************/



// Componente funcional.
const Toggle = () => {

    const [isToggleOn, setState] = React.useState(true);

    const handleClick = () => {
        setState(!isToggleOn);
    }

    // return (
    //     <button onClick={() => handleClick()}>{isToggleOn ? 'ON' : 'OFF'}
    //     </button>
    // );

    return (
        <button onClick={handleClick}>{isToggleOn ? 'ON' : 'OFF'}
        </button>
    );

}

const App = () => (<div><Toggle /></div>);

ReactDOM.render(<App />, document.getElementById("root"));
