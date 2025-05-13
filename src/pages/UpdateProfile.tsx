import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { FormUpdateProfile } from "../components/FormConnection";
import { getUserById, updateUserIntoApi } from "../api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";

function UpdateProfile () {

  const navigate = useNavigate();
  const { user, token } = useAuthStore();
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
        console.log(pseudo, email, avatar);
        const updatedUser = await updateUserIntoApi(
          user.id,
          token,
          avatar,
          pseudo,
          email,
        );
        console.log(updatedUser);
        if (updatedUser) {
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
      <section className="default-form-container default-form default-box-design">
        <h3 className="low-title">Modifier le profile</h3>
        <FormUpdateProfile initialUser={currentUser} onUpdate={handleUpdateProfile} />
      </section>
    </>
  )
}

export { UpdateProfile }