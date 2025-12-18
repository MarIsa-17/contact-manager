import { Link } from "react-router-dom";

export default function TestPage() {
    function handleSubmit(event){
        event.preventDefault();
        console.log('Formulario NO hizo request')
    }

    return (
    <main>
        <h1>Formulario controlado</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre..." className="h-12 bg-white"/>
            <input type="text" name="apellido" id="apellido" placeholder="Apellido..."/>
            <button type="submit"> Enviar</button>
        </div>
        </form>
    </main>
);}