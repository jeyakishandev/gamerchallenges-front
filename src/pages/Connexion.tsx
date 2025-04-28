function Connection () {
    return (
        <>
            <div className="form-container">
                <section className="login-form">
                    <p className="paragraph-center">Connexion</p>
                    <form action="login" method="post">
                        <label htmlFor="user"></label>
                        <input 
                        type="text" 
                        id="user" 
                        name="user" 
                        // value={}
                        // onChange={}
                        required 
                        minLength={2} 
                        maxLength={50} 
                        placeholder="Pseudo/Email"
                        />
                        
                        <label htmlFor="loginPassword"></label>
                        <input 
                        type="password" 
                        id="loginPassword" 
                        name="password" 
                        // value={}
                        // onChange={}
                        required 
                        minLength={12} 
                        placeholder="Mot de passe"
                        />
                        <div className="align-button">
                            <button className="default-button form-button login-button" type="submit">Se connecter</button>
                            <button className="default-button form-button" type="button">S'inscrire</button>
                        </div>
                    </form>
                </section>
                <section className="signup-form">
                    <p className="paragraph-center">Inscription</p>
                    <form>
                        <label htmlFor="pseudo"></label>
                        <input 
                            type="text" 
                            id="pseudo" 
                            name="pseudo" 
                            // value={}
                            // onChange={}
                            required 
                            minLength={2} 
                            maxLength={50} 
                            placeholder="Pseudo"
                        />
                        
                        <label htmlFor="email"></label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            // value={}
                            // onChange={}
                            required 
                            placeholder="Email"
                        />
                        
                        <label htmlFor="password"></label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            // value={}
                            // onChange={}
                            required 
                            minLength={12} 
                            placeholder="Mot de passe"
                        />
                        
                        <label htmlFor="confirm"></label>
                        <input 
                            type="password" 
                            id="confirm" 
                            name="confirm" 
                            // value={}
                            // onChange={}
                            required 
                            minLength={12} 
                            placeholder="Confirmer le mot de passe"
                        />
                        
                        <label htmlFor="avatar"></label>
                        <input 
                            type="file" 
                            id="avatar" 
                            name="avatar" 
                            // onChange={}
                            accept="image/*" 
                        />
                        <div className="align-button">
                            <button className="default-button form-button" type="submit">Confirmer</button>
                            <button className="default-button form-button" type="button">Retour</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export { Connection };