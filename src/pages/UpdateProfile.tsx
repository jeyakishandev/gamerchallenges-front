import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { FormUpdateProfile, FormUpdatePasswordProfile } from "../components/FormConnection";
import { getUserById, updateUserIntoApi, updateUserPasswordIntoApi } from "../api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";

function UpdateProfile () {

  const navigate = useNavigate();
  const { user, token, login } = useAuthStore();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchProfile = async () => {
        if (!user?.id || !token) {
          setError("Vous devez être connecté pour modifier votre profil.");
          setLoading(false);
          return;
        }
        try {
          const userData = await getUserById(user.id, token);
          setCurrentUser(userData);
          setLoading(false);
        } catch (err) {
          setError("Erreur lors du chargement de votre profil.");
          console.error(err);
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [user?.id, token]);

    const handleUpdateProfile = async (
      avatar: File | null,
      pseudo: string,
      email: string,
    ) => {
      if (!user?.id || !token) {
        setError("Vous devez être connecté pour modifier votre profil.");
        return;
      }
      try {
        const updatedUser = await updateUserIntoApi(
          user.id,
          token,
          avatar,
          pseudo,
          email,
        );
        
        if (updatedUser) {
          login(updatedUser, token);
          navigate(`/profile/${user.id}`);
        } else {
          setError("La mise à jour du profil a échoué.");
        }
      } catch (err) {
        setError("Erreur lors de la mise à jour de votre profil.");
        console.error(err);
      }
    };

    const handleUpdatePassword = async (
      password: string,
      newPassword: string,
      confirmNewPassword: string,
    ) => {
      if (!user?.id || !token) {
        setError("Vous devez être connecté pour modifier votre mot de passe.");
        return;
      }
      try {
        const updatedUserPassword = await updateUserPasswordIntoApi (
          user.id,
          token,
          password,
          newPassword,
          confirmNewPassword
        );
        
        if (updatedUserPassword) {
          login(user, token);
          navigate(`/profile/${user.id}`);
        } else {
          setError("La mise à jour du profil a échoué.");
        }
      } catch (err) {
        setError("Erreur lors de la mise à jour de votre profil.");
        console.error(err);
      }
    };
  
    if (loading) return <p>Chargement de votre profil...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!currentUser) return <p>Profil non trouvé.</p>;
  

  return (
    <>
      <div className="update-profile-button">
        <button className="default-button" onClick={() => navigate(`/profile/${user?.id}`)}>Retour</button>
      </div>
      <section className="default-form-container default-form default-box-design">
        <h3 className="low-title">Modifier le profile</h3>
        <FormUpdateProfile initialUser={currentUser} onUpdate={handleUpdateProfile} />
      </section>
      <section className="password-form default-form-container default-form default-box-design">
        <h3 className="low-title">Modifier le mot de passe</h3>
        <FormUpdatePasswordProfile initialUser={currentUser} onUpdatePassword={handleUpdatePassword} />
      </section>
    </>
  )
}

export { UpdateProfile }