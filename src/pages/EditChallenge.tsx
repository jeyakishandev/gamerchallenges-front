import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IChallenge } from "../@types";
import { getChallengeById } from "../api";
import FormulaireChallenge from "../components/FormulaireChallenge";

export default function EditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      const challengeData = await getChallengeById(Number(id));
      if (!challengeData) return navigate("/"); // Redirection si pas trouvé
      setChallenge(challengeData);
      setLoading(false);
    };
    fetchChallenge();
  }, [id, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (!challenge) return <p>Challenge introuvable.</p>;

  return (
    <FormulaireChallenge
      challengeId={challenge.id}
      defaultValues={{
        name: challenge.name,
        description: challenge.description,
        video_url: challenge.video_url,
        category_id: challenge.category.id,
        difficulty_id: challenge.difficulty.id,
      }}
    />
  );
}
