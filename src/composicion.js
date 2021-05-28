/**
 * @param {*} props 
 * 
 * props.children permite pasar elementos hijos a un nuevo elemento.
 * Esto permite que otros componentes les pasen hijos arbitrarios anidando el JSX.
 * 
 * @returns 
 */
const Contenido = (props) => <div>{props.children}</div>;

const App = () => (
    <div>
        <Contenido>
            <h1>Hola Mundo</h1>
            <p>Lorem Ipsum</p>
        </Contenido>
    </div>)
    ;

ReactDOM.render(<App />, document.getElementById("root"));