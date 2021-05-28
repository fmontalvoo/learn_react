// Componente que renderiza el formulario.
const Form = ({ show = false }) => {

    // Variables para manejar el estado del formulario.
    const [form, setState] = React.useState({ title: '', body: '' })

    const inputTitle = React.useRef(); // Guarda referencia a un elemento del DOM.

    React.useEffect(
        () => {
            // Envia el foco del cursor hacia el primer input del formulario.
            inputTitle.current.focus();
        },
        [show] // Escucha unicamente los cambios de la variable show.
    );

    // Esta funciop es llamada al enviar el formulario.
    const submitForm = (evt) => {
        evt.preventDefault() // Evita que se refresque la pantalla.

        // Peticion Post a un API Rest con los datos obtenidos del formulario.
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: form.title,
                body: form.body,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setState({ title: '', body: '' });
                console.log(json);
            });

    }

    // Maneja las entradas de texto del formulario.
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let auxForm = {};

        if (name === 'title') {
            auxForm['title'] = value;
            auxForm['body'] = form.body;
        }
        if (name === 'body') {
            auxForm['body'] = value;
            auxForm['title'] = form.title;
        }
        setState(auxForm);
    }

    return (
        <form onSubmit={submitForm}>
            <div>
                <label htmlFor="title">Titulo: </label>
                <input id="title" name="title" type="text" value={form.title} ref={inputTitle}
                    onChange={handleInputChange} />
            </div>
            <br />
            <div>
                <label htmlFor="body">Contenido: </label>
                <textarea id="body" name="body" type="text" value={form.body}
                    onChange={handleInputChange} />
            </div>
            <br />
            <input type="submit" value="Enviar" />
        </form>
    );
}

const ShowForm = () => {

    const [showForm, setState] = React.useState(false);

    return (
        <div>
            <button onClick={() => setState(true)} >Mostrar formulario</button>
            <br />
            <br />
            <br />
            {showForm && <Form show={showForm} />}
        </div>
    );
}

const App = () => <div><ShowForm /></div>;

ReactDOM.render(<App />, document.getElementById("root"));