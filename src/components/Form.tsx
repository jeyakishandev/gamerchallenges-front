import { ChangeEvent, FormEvent, useState } from "react";

interface INewUserProps {
  addUser: (pseudo: string, email: string, password: string, confirmPasword: string, avatar: File | null) => Promise<void>;
}

interface ILogUserProps {
  logUser: (pseudo: string, password: string) => Promise<void>;
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
    <label htmlFor={label}></label>
    <input 
        type="file" 
        id={name} 
        name={name} 
        onChange={handleFileChange}
        accept={accept || "image/*"} 
    />
    </>
  )
}


function FormSubscribe ({addUser}: INewUserProps) {
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

      <div className="align-button">
        <button className="default-button form-button" type="submit">Confirmer</button>
        <button className="default-button form-button" type="button">Retour</button>
      </div>
    </form>
  </>
}

function FormLogin ({logUser}: ILogUserProps) {
  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

    try {
    await logUser(pseudo, password)
    setPseudo("");
    setPassword("");
    } catch (error) {
      setError("Echec de la connexion. Vérifiez vos identifiants.")
      console.error("Erreur de connexion:", error);
    }
  };


  return <>
    <form onSubmit={handleSubmit}>
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
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Mot de passe"
        type="password" 
        label="Mot de passe"
      />

      <div className="align-button">
        <button className="default-button form-button" type="submit">Confirmer</button>
        <button className="default-button form-button" type="button">Retour</button>
      </div>
    </form>
  </>
}

export { FormSubscribe, FormLogin}
