import "../App.css"
import { Link } from "react-router-dom"

export default function NotFound() {

    return (
        <>
        <div className="main-404">
            <p className="default-text main-sentence-404">Ce n'est pas par ici que tu trouveras de nouveaux challenges à réaliser !</p>
            <img className="dino-car-404" src="../../public/img/dino-4575130_640.png"/>
            <p className="default-text home-link-404"> <Link to={`/`} > Clique ici </Link> pour retourner à l'acceuil !</p>
        </div>
        </>
    )
}