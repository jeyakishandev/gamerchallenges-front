import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { addUserIntoApi, getUsers } from "../api";
import { FormLogin, FormSubscribe } from "../components/FormConnection";
import { useNavigate } from "react-router-dom";

function Connection () {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    const addUser = async(pseudo: string, email: string, password: string, confirmPassword: string,  avatar: File | null): Promise<void> => {
        const newUser = await addUserIntoApi(pseudo, email, password, confirmPassword, avatar)
        if (newUser) {
            const newUsers = [...users, newUser]
            setUsers(newUsers)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const newUsers = await getUsers();
            setUsers(newUsers);
        };
        loadData();
    }, []);

    return (
        <>
            <div className="form-container connection-form">
            <div className="update-profile-button">
                <button className="default-button" onClick={() => navigate(`/`)}>Retour</button>
            </div>
                <section className="default-form default-box-design login-form">
                    <h3 className="low-title">Connexion</h3>
                    <FormLogin/>
                </section>
                <section className="default-form default-box-design signup-form">
                    <h3 className="low-title">Inscription</h3>
                    <FormSubscribe addUser={addUser} />
                </section>
            </div>
        </>
    )
}

export { Connection };