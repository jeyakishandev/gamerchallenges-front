/**
 * Extrait l'id d'une vidéo à partir de l'URL Youtube.
 * Gère les formats: youtu.be, youtube.com/watch?v=, youtubebe.com/shorts, youtube.com/live, youtube.com/embed/.
 * 
 * @param url - l'URL d'une vidéo Youtube saisie ou soumise par un utilisateur (enregistrée en base de données).
 * @returns L'identifiant unique de la vidéo ou "null" si l'URL est invalide.
 */

export function extractYoutubeVideoId(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        if (hostname === "youtu.be") {
            return path.slice(1);
        }

        if (hostname.includes("youtube.com") && path === "/watch") {
            return parsedUrl.searchParams.get("v");
        }

        // On utilise match pour extraire l'id des URL Youtube "/shorts/" ou "/live/",
        // en cherchant un id de 11 caractères après ces segments.
        const match = path.match(/^\/(shorts|live)\/([a-zA-Z0-9_-]{11})/);
        if (match) {
            return match[2];
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

export function getYoutubeThumbnailUrl(url: string): string {
    const videoId = extractYoutubeVideoId(url);
    if (!videoId) return "";

    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}