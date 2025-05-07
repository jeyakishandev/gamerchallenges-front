/**
 * Extrait l'id d'une vidéo à partir de l'URL Youtube.
 * Gère les formats: youtu.be, youtube.com/watch?v=, youtube.com/embed/.
 * 
 * @param url - l'URL d'une vidéo Youtube saisie ou soumise par un utilisateur (enregistrée en base de données).
 * @returns L'identifiant unique de la vidéo ou "null" si l'URL est invalide.
 */

export function extractYoutubeVideoId(url: string): string | null {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.slice(1);
        }

        if (
            parsedUrl.hostname.includes("youtube.com") &&
            parsedUrl.pathname === "/watch"
        ) {
            return parsedUrl.searchParams.get("v");
        }

        return null;
    } catch {
        return null;
    }
}

export function getYoutubeEmbedUrl(url: string): string {
    
    // Si l'URL est déjà un embed, on la convertit en version nocookie.
    if (url.includes("/embed/")) {
        return url.replace("youtube.com", "youtube-nocookie.com");
    }

    // Sinon, on extrait l'id et on construit l'URL embed avec youtube-nocookie.
    const videoId = extractYoutubeVideoId(url);
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
}