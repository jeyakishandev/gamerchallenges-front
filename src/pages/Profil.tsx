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
                        <button className="arrow left">❮</button>
                        <h3 className="current-chall-title">Mes challenges en cours</h3>

                        <section className="current-chall-box">

                            <section className="video">
                                <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </section>

                            <section className="current-chall-info">
                                <p className="current-chall-name">Nom du challenge</p>
                                <p className="current-chall-tag">Catégorie</p>
                                <p className="current-chall-diff">Difficulté</p>
                                <p className="current-chall-submission">Nombre de participants</p>
                            </section>

                            <a href="#" className="default-button card-details">Détails</a>

                        </section>

                        {/* <section className="current-chall-box">

                            <section className="video">
                                <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </section>

                            <section className="current-chall-info">
                                <p className="current-chall-name">Nom du challenge</p>
                                <p className="current-chall-tag">Catégorie</p>
                                <p className="current-chall-diff">Difficulté</p>
                                <p className="current-chall-submission">Nombre de participants</p>
                            </section>

                            <a href="#" className="default-button card-details">Détails</a>

                        </section> */}

                        <button className="arrow right">❯</button>
                    </article>


                    <article className="completed-chall">
                        <button className="arrow left">❮</button>
                        <h3 className="completed-chall-title">Mes challenges réalisés</h3>

                        <section className="completed-chall-box">

                            <section className="video">
                                <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </section>

                            <section className="completed-chall-info">
                                <p className="completed-chall-name">Nom du challenge</p>
                                <p className="completed-chall-tag">Catégorie</p>
                                <p className="completed-chall-diff">Difficulté</p>
                                <p className="completed-chall-submission">Nombre de participants</p>
                            </section>

                            <a href="#" className="default-button card-details">Détails</a>


                        </section>

                        <button className="arrow right">❯</button>
                    </article>


                    <article className="created-chall">
                        <button className="arrow left">❮</button>
                        <h3 className="created-chall-title">Mes challenges crées</h3>

                        <section className="created-chall-box">

                            <section className="video">
                                <iframe className="card-video" src="https://www.youtube.com/embed/SCi_kDUe7yU?si=lAvofjbMcTbQbI2w" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </section>

                            <section className="created-chall-info">
                                <p className="created-chall-name">Nom du challenge</p>
                                <p className="created-chall-tag">Catégorie</p>
                                <p className="created-chall-diff">Difficulté</p>
                                <p className="created-chall-submission">Nombre de participants</p>
                            </section>

                            <a href="#" className="default-button card-details">Détails</a>

                        </section>

                        <button className="arrow right">❯</button>
                    </article>

                </div>

            </main>
        </>
    )
}