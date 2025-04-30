import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { addUserIntoApi, getUsers } from "../api";
import { FormSubscribe } from "../components/Form";

function Connection () {
    const [users, setUsers] = useState<IUser[]>([]);

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
            <div className="form-container">
          <section className="login-form">
              <p className="paragraph-center">Connexion</p>
              <form action="login" method="post">
                  <label htmlFor="user"></label>
                  <input type="text" name="user" id="user" required minLength={2} placeholder="Pseudo/Email" />
                  
                  <label htmlFor="loginPassword"></label>
                  <input type="password" name="password" id="loginPassword" required minLength={12} placeholder="Mot de passe" />
                  <div className="align-button">
                      <button className="default-button form-button login-button" type="submit">Se connecter</button>
                  </div>
              </form>
          </section>
          <section className="signup-form">
              <p className="paragraph-center">Inscription</p>
              <FormSubscribe addUser={addUser} />
          </section>
        </div>
        </>
    )
}

export { Connection };