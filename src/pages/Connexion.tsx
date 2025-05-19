import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { addUserIntoApi, getUsers } from "../api";
import { FormLogin, FormSubscribe } from "../components/FormConnection";
import { useNavigate } from "react-router-dom";
import loginImage from '../../public/img/dino-login.png';
import signupImage from '../../public/img/dino-signup.png';

function Connection () {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    const addUser = async(pseudo: string, email: string, password: string, confirmPassword: string,  avatar: File | null): Promise<void> => {
        const newUser = await addUserIntoApi(pseudo, email, password, confirmPassword, avatar);
        if (newUser) {
            const newUsers = [...users, newUser];
            setUsers(newUsers);
            setShowLogin(true);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const newUsers = await getUsers();
            setUsers(newUsers);
        };
        loadData();
    }, []);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <div className="form-container connection-form">
                <div className="update-profile-button">
                    <button className="default-button" onClick={() => navigate(`/`)}>Retour</button>
                </div>
                <div className="default-box-design">
                    {showLogin ? (
                        <div className="form-with-image login-section">
                            <div className="image-container">
                                <img src={loginImage} alt="Connexion" />
                            </div>
                            <div className="form-container-column">
                                <FormLogin />
                                <p className="toggle-text">
                                    Pas de compte ? <button type="button" className="toggle-button" onClick={toggleForm}>S'inscrire</button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="form-with-image signup-section">
                            <div className="form-container-column">
                                <FormSubscribe addUser={addUser} />
                                <p className="toggle-text">
                                    Déjà un compte ? <button type="button" className="toggle-button" onClick={toggleForm}>Se connecter</button>
                                </p>
                            </div>
                            <div className="image-container">
                                <img src={signupImage} alt="Inscription" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export { Connection };