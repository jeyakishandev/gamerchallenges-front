import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuthStore from "../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserById, loginUser } from "../api";
import { IUser } from "../@types";


interface IUserProps {
  addUser: (pseudo: string, email: string, password: string, confirmPasword: string, avatar: File | null) => Promise<void>;
}

interface FormUpdateProfileProps {
  initialUser: IUser;
  onUpdate: (
    avatar: File | null,
    pseudo: string,
    email: string,
  ) => Promise<void>;
}

interface UpdateProfilePasswordProps {
  initialUser: IUser;
  onUpdatePassword: (
    password: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => Promise<void>;
}

interface IInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name: string;
  type: string;
  label?: string;
}

interface IFileInputProps {
  setFile: (file: File | null) => void;
  name: string;
  label?: string;
  accept?: string;
}

function Input ({value, setValue, name, type, placeholder, label}: IInputProps) {
  return (
    <>
      <label htmlFor={label}></label> 
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

function Fileinput({setFile, name, label, accept}: IFileInputProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <>
    <label className="default-text label" htmlFor={label}>Télécharger un avatar</label>
    <input 
        className="form-input"
        type="file" 
        id={name} 
        name={name} 
        onChange={handleFileChange}
        accept={accept || "image/*"} 
    />
    </>
  )
}

function FormSubscribe ({addUser}: IUserProps) {

  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

    try {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }

      if (avatar && !(avatar instanceof File)) {
        setError("Format d'avatar invalide. Veuillez sélectionner une image.");
        return;
      }

      await addUser(pseudo, email, password, confirmPassword, avatar)
      setPseudo("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAvatar(null);

      //Réinitialiser le champ de fichier manuellement
      const fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      setError("Une erreur s'est produite lors de l'inscription");
      console.error("Erreur d'inscription:", error);
    }
  };

  return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={pseudo}
        setValue={setPseudo}
        name="pseudo"
        placeholder="Pseudo"
        type="text" 
        label="Pseudo"
      />

      <Input 
        value={email}
        setValue={setEmail}
        name="email"
        placeholder="Email"
        type="email" 
        label="Email"
      />

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Password"
        type="password"
        label="Password"
      />

      <Input 
        value={confirmPassword}
        setValue={setConfirmPassword}
        name="confirm"
        placeholder="Confirmez votre mot de passe"
        type="password" 
        label="Confirmation"
      />

      <Fileinput
        setFile={setAvatar}
        name="avatar"
        label="Avatar (JPG, JPEG, PNG, GIF uniquement)"
        accept="image/jpeg, image/jpg, image/png, image/gif"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
        <button className="default-button" type="button">Retour</button>
      </div>
    </form>
  </>
}

function FormLogin () {

  const { login } = useAuthStore()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pseudoOrEmail, setPseudoOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);
    
    try {
      const { token, userId } = await loginUser(pseudoOrEmail, password);
      const user = await getUserById(userId, token);

      login(user, token);
     
      //  Redirection dynamique
      const redirect = searchParams.get("redirect");
      navigate(redirect || `/profile/${user.id}`);

    } catch (error) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      console.error("Erreur de connexion:", error);
    }
  };
  return <>
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={pseudoOrEmail}
        setValue={setPseudoOrEmail}
        name="pseudoOrEmail"
        placeholder="Pseudo ou Email"
        type="text"
        label="Identifiant"
      />

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Mot de passe"
        type="password" 
        label="Mot de passe"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
        <button className="default-button" type="button">Retour</button>
      </div>
    </form>
  </>
}

function FormUpdateProfile ({initialUser, onUpdate}: FormUpdateProfileProps) {

  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialUser) {
      setPseudo(initialUser.pseudo || "");
      setEmail(initialUser.email || "");
      
    }
  }, [initialUser]);

  //* Handle user info form
  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

      await onUpdate(avatar, pseudo, email)
      setPseudo("");
      setEmail("");
      setAvatar(null);

  };

  return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={pseudo}
        setValue={setPseudo}
        name="pseudo"
        placeholder="Pseudo"
        type="text" 
        label="Pseudo"
      />

      <Input 
        value={email}
        setValue={setEmail}
        name="email"
        placeholder="Email"
        type="email" 
        label="Email"
      />

      <Fileinput
        setFile={setAvatar}
        name="avatar"
        label="Avatar (JPG, JPEG, PNG, GIF uniquement)"
        accept="image/jpeg, image/jpg, image/png, image/gif"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
      </div>
    </form>
  </>
}

function FormUpdatePasswordProfile ({initialUser, onUpdatePassword}: UpdateProfilePasswordProps) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

    try {
        if (newPassword !== confirmNewPassword) {
          setError("Les mots de passe ne correspondent pas");
          return;
        }

        
        await onUpdatePassword(password, newPassword, confirmNewPassword)
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        
        //  Redirection dynamique
        const redirect = searchParams.get("redirect");
        navigate(redirect || `/profile/${initialUser.id}`);
        
    } catch (error) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      console.error("Erreur de connexion:", error);
    }
  };

  return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Mot de passe"
        type="password" 
        label="Mot de passe"
      />

      <Input 
        value={newPassword}
        setValue={setNewPassword}
        name="password"
        placeholder="Nouveau mot de passe"
        type="password" 
        label="Nouveau mot de passe"
      />

      <Input 
        value={confirmNewPassword}
        setValue={setConfirmNewPassword}
        name="confirmNewpassword"
        placeholder="Confimer le nouveau Password"
        type="password" 
        label="Confirmer le nouveau mot de passe"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
      </div>
    </form>
  </>
}

export { FormSubscribe, FormLogin, FormUpdateProfile, FormUpdatePasswordProfile, Input}
