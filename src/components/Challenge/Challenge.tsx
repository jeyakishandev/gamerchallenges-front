import "./style.css";

function Challenge() {
  return (
    <>
    <h2 className="challenge-title">Titre du challenge</h2>
    <section className="challenge-content">
      <div className="challenge-container">
        <section className="video-container">
        <iframe 
              width="100%" 
              height="315"
              src={`https://www.youtube.com/embed/l4NaMSbirPE?origin=${window.location.origin}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </section>
        <section className="challenge-info">
          <div className="challenge-cat-and-diff">
            <span className="category-color">category</span>
            <span className="difficulty-color">difficulty</span>
          </div>
          <article className="challenge-description">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quos nam impedit. Nam ea eligendi, sit aliquam natus, quo facilis molestias cum assumenda alias aspernatur necessitatibus. Temporibus, facere? Quo, dolores?
            </p>
          </article>
        </section>
      </div>
      <div className="align-button">
        <button className="default-button">Participer</button>
      </div>
    </section>
    <h2 className="challenge-title">Les participations</h2>
    <section className="challenge-participations">
      <article className="challenge-participation-container">
        <div className="participation-info">
          <span>Pseudo</span>
          <span>Date</span>
        </div>
        <div>
        <iframe 
              width="100%" 
              height="315"
              src={`https://www.youtube.com/embed/l4NaMSbirPE?origin=${window.location.origin}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </div>
      </article>
      <article className="challenge-participation-container">
        <div className="participation-info">
          <span>Pseudo</span>
          <span>Date</span>
        </div>
        <div>
        <iframe 
              width="100%" 
              height="315"
              src={`https://www.youtube.com/embed/l4NaMSbirPE?origin=${window.location.origin}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </div>
      </article>
      <article className="challenge-participation-container">
        <div className="participation-info">
          <span>Pseudo</span>
          <span>Date</span>
        </div>
        <div>
        <iframe 
              width="100%" 
              height="315"
              src={`https://www.youtube.com/embed/l4NaMSbirPE?origin=${window.location.origin}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </div>
      </article>
      <article className="challenge-participation-container">
        <div className="participation-info">
          <span>Pseudo</span>
          <span>Date</span>
        </div>
        <div>
        <iframe 
              width="100%" 
              height="315"
              src={`https://www.youtube.com/embed/l4NaMSbirPE?origin=${window.location.origin}`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
        </div>
      </article>
    </section>
    
    </>
  )
}

export { Challenge };