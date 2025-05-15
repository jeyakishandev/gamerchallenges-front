
    return (
        <li className={className}>{medal && <span style={{marginRight: "8px"}}>{medal}</span>}
            {index + 1}- <Link className={className}to={`/profile/${players.id}`}> <img
                        className="avatar"
                        src={`http://localhost:3000/uploads/${players?.avatar_url}`}
                        alt={`Avatar de ${players?.pseudo || "l'utilisateur"}`}
                        style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                    /> {players.pseudo} : {players.challenges.length} challenges</Link> </li>
    )
}