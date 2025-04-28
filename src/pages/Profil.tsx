import "./Profil.css"

export default function Profil() {
    return (
        <>
            <main className="profile">

                <div className="perso-info">
                    <h2 className="main-title">Retrouvez ici blabla</h2>
                    <section className="button-container">
                        <a href="#" className="default-button">Modifier le profile</a>
                    </section>
                    <p className="avatar">Avatar</p>
                    <p className="pseudo">Pseudo : igordu13</p>
                </div>


                <div className="perso-chall">
                    
                <article className="current-chall">
                    <h3 className="current-chall-title">Mes challenges en cours</h3>

                    <div className="current-chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="current-chall-list">

                            <div className="current-chall-box">

                                <div className="current-chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="current-chall-info">
                                        <p className="current-chall-name">Nom du challenge</p>
                                        <p className="current-chall-tag">Catégorie</p>
                                        <p className="current-chall-diff">Difficulté</p>
                                        <p className="current-chall-submission">Nombre de participants</p>
                                    </section>

                                </div>

                                <div className="button-container">
                                    <a href="#" className="default-button">Détails</a>
                                </div>

                            </div>

                        </div>

                        <button className="arrow right">❯</button>

                    </div>

                </article>

                <article className="completed-chall">
                    <h3 className="completed-chall-title">Mes challenges en cours</h3>

                    <div className="completed-chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="completed-chall-list">

                            <div className="completed-chall-box">

                                <div className="completed-chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="completed-chall-info">
                                        <p className="completed-chall-name">Nom du challenge</p>
                                        <p className="completed-chall-tag">Catégorie</p>
                                        <p className="completed-chall-diff">Difficulté</p>
                                        <p className="completed-chall-submission">Nombre de participants</p>
                                    </section>

                                </div>

                                <div className="button-container">
                                    <a href="#" className="default-button">Détails</a>
                                </div>

                            </div>

                        </div>
                        
                        <button className="arrow right">❯</button>

                    </div>

                </article>


                <article className="created-chall">
                    <h3 className="created-chall-title">Mes challenges en cours</h3>

                    <div className="created-chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="created-chall-list">

                            <div className="created-chall-box">

                                <div className="created-chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="created-chall-info">
                                        <p className="created-chall-name">Nom du challenge</p>
                                        <p className="created-chall-tag">Catégorie</p>
                                        <p className="created-chall-diff">Difficulté</p>
                                        <p className="created-chall-submission">Nombre de participants</p>
                                    </section>

                                </div>

                                <div className="button-container">
                                    <a href="#" className="default-button">Détails</a>
                                </div>

                            </div>

                        </div>

                        <button className="arrow right">❯</button>

                    </div>

                </article>
                </div>

            </main>
        </>
    )
}