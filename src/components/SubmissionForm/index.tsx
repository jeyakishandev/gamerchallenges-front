import "./style.css"

interface SubmissionFormProps {
    close: () => void;
}

export default function SubmissionForm({ close }: SubmissionFormProps){
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
                    <button 
                        className="default-button"
                        onClick={close}
                        >
                            Fermer
                    </button>
                </div>
                
                
            </form>
        </div>
    )
}