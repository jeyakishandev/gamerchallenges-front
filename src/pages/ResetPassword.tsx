import { Link } from "react-router-dom";
import { ResetPasswordForm } from "../components/FormConnection";

function ResetPassword () {
  return (
    <section className="password-form default-form-container default-form default-box-design">
      <h3 className="low-title">Réinitialiser le mot de passe</h3>
      <p>Choisissez votre nouveau mot de passe.</p>
      <ResetPasswordForm />
      <div className="form-links">
        <Link to="/connexion">Retour à la connexion</Link>
      </div>
    </section>
  );
}

export { ResetPassword }