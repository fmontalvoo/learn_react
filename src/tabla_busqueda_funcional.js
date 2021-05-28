const PRODUCTS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

/**
 * Componente "controlado" 
 * @param {*} param0 
 * @returns 
 */
const SearchBar = ({ query, check, onQueryChange, onCheckChange }) => {

    const handleOnQueryChange = (evt) => onQueryChange(evt.target.value);

    const handleOnCheckChange = (evt) => onCheckChange(evt.target.checked);

    return (
        <form>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={handleOnQueryChange} />
            <p>
                <input type="checkbox"
                    value={check}
                    onChange={handleOnCheckChange} />
                Solo muestra productos en stock.
            </p>
        </form>
    );
}

const ProductCategory = ({ categoria }) => {
    return (
        <tr>
            <th colSpan="2">
                {categoria}
            </th>
        </tr>
    );
}

const ProductRow = ({ producto }) => {
    return (
        <tr>
            <td>
                {
                    !producto.stocked
                        ? <span style={{ color: 'red' }}>{producto.name}</span>
                        : producto.name
                }
            </td>
            <td>{producto.price}</td>
        </tr>
    );
}

const ProductTable = ({ productos, query, check }) => {
    const rows = [];
    let lastCategory = '';
    productos.forEach(producto => {
        // Salta a la siguiente iteracion del bucle.
        if (producto.name.indexOf(query) === -1) return;

        // Salta a la siguiente iteracion del bucle.
        if (check && !producto.stocked) return;

        if (producto.category !== lastCategory)
            rows.push(
                <ProductCategory key={producto.category} categoria={producto.category} />
            );

        rows.push(
            <ProductRow key={producto.name} producto={producto} />
        );

        lastCategory = producto.category;

    });
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function FilterableProductTable(props) {

    const productos = props.productos;

    const [productFilter, setState] = React.useState({ query: '', check: false });

    const handleQueryChange = (query) => setState({ query: query, check: productFilter.check });

    const handleCheckChange = (check) => setState({ query: productFilter.query, check: check });

    console.log(productFilter);

    return (
        <div>
            <SearchBar
                query={productFilter.query}
                check={productFilter.check}
                onQueryChange={handleQueryChange}
                onCheckChange={handleCheckChange} />
            <ProductTable
                productos={productos}
                query={productFilter.query}
                check={productFilter.check} />
        </div>
    );
}

ReactDOM.render(
    <FilterableProductTable productos={PRODUCTS} />,
    document.getElementById('root')
);