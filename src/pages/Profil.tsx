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
                    
                <article className="chall">
                    <h3 className="chall-title">Mes challenges en cours</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            <div className="chall-box">

                                <div className="chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="chall-info">
                                        <p className="chall-name">Nom du challenge</p>
                                        <p className="chall-tag">Catégorie</p>
                                        <p className="chall-diff">Difficulté</p>
                                        <p className="chall-submission">Nombre de participants</p>
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

                <article className="chall">
                    <h3 className="chall-title">Mes challenges réalisés</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            <div className="chall-box">

                                <div className="chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="chall-info">
                                        <p className="chall-name">Nom du challenge</p>
                                        <p className="chall-tag">Catégorie</p>
                                        <p className="chall-diff">Difficulté</p>
                                        <p className="chall-submission">Nombre de participants</p>
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


                <article className="chall">
                    <h3 className="chall-title">Mes challenges crées</h3>

                    <div className="chall-flex">
                        <button className="arrow left">❮</button>

                        <div className="chall-list">

                            <div className="chall-box">

                                <div className="chall-pres">

                                    <section className="video">
                                        <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                    </section>

                                    <section className="chall-info">
                                        <p className="chall-name">Nom du challenge</p>
                                        <p className="chall-tag">Catégorie</p>
                                        <p className="chall-diff">Difficulté</p>
                                        <p className="chall-submission">Nombre de participants</p>
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