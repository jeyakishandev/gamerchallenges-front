import { ForgotPasswordForm } from "../components/FormConnection";

function ForgotPassword () {
  return (
    <section className="password-form default-form-container default-form default-box-design">
        <h3 className="low-title">Réinitialiser le mot de passe</h3>
        <ForgotPasswordForm />
    </section>
  )
}

export { ForgotPassword };