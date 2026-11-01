import "@styles/Activities.scss"
import Card from '@components/Card.jsx';
import {activities, diasSemana} from '../data/activities.js'
const Activities = () => {
        
    const isLoggedIn = localStorage.getItem["isLogedIn"] === "true";

    const handleInscription = (nombreActividad) => {
        alert(`Inscripto en ${nombreActividad}`);
    }

    return (
        <div className="activities-container">
            {activities.map((activity, index) => (
                <Card key={index} title={activity.nombre} subtitle={activity.descripcion}>
                    <ul>
                        {activity.horarios.map((horario, i) => (
                            <li key={i}>
                                Dia: {diasSemana[horario.dia]} - Hora de inicio: {horario["hora-inicio"]} - Hora de fin: {horario["hora-fin"]}
                            </li>
                        ))}
                    </ul>
                    {
                        isLoggedIn && (
                         <button onClick={() => handleInscription(activity.nombre)}> Inscribir </button>
                        )
                    }
                    <button onClick={() => handleInscription(activity.nombre)}> Inscribir </button>
                </Card>
            ))}
        </div>
    )

}

export default Activities;