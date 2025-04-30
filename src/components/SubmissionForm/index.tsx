import "./style.css"

export default function SubmissionForm(){
    return (
        <div className="form-container signup-form">
            <form action="">
                <p>Test</p>
                <input 
                    type="text"
                    className="form-input"
                    name=""
                    placeholder="URL de la vidéo"
                />
                
                <div className="align-button">
                    <button type="submit" className="default-button form-button">Soummettre</button>
                    <button className="default-button">Fermer</button>
                </div>
                
                
            </form>
        </div>
    )
}