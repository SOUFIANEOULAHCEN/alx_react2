import React from "react";
import gahi from "../../assets/img/gahi.jpg";
export default function VideoPlayer({ selectedVideo, onVideoSelect, videos }) {
  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1); // Retirer le "/" au début
      }
      // Gérer les URL au format "https://www.youtube.com/watch?v={id}"
      return urlObj.searchParams.get("v");
    } catch (error) {
      console.error("Invalid video URL:", url);
      return null;
    }
  };

  // ID de la vidéo sélectionnée
  const videoId = extractVideoId(selectedVideo.videoUrl);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Fonction pour obtenir l'URL de l'avatar
  const getAvatarUrl = (avatar) => {
    if (typeof avatar === "string") {
      return isValidUrl(avatar) ? avatar : defaultProfileImage;
    } else {
      return avatar; // Si c'est une image importée, retournez-la directement
    }
  };

  // URL de l'image de profil par défaut
  const defaultProfileImage = "https://via.placeholder.com/150";

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Lecteur de vidéo principal */}
      <div className="flex-1">
        <div className="bg-black rounded-lg overflow-hidden aspect-video">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-800 text-white">
              Invalid video URL
            </div>
          )}
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{selectedVideo.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={getAvatarUrl(selectedVideo.channelAvatar)}
              alt={selectedVideo.channel}
              className="w-8 h-8 rounded-full"
            />
            <p className="text-gray-400">{selectedVideo.channel}</p>
          </div>
          <p className="text-gray-400 mt-2">{selectedVideo.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-400">
              {selectedVideo.views}
            </span>
            <span className="text-sm text-gray-400">
              {selectedVideo.timestamp}
            </span>
          </div>
        </div>

        {/* Section des commentaires */}
        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Commentaires</h3>
          <div className="space-y-4">
            {selectedVideo.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4">
                <img
                  src={getAvatarUrl(comment.avatar)}
                  alt={comment.user}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm text-white">{comment.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{comment.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Liste des autres vidéos */}
      <div className="w-full lg:w-1/3 space-y-4">
        {videos
          .filter((video) => video.id !== selectedVideo.id)
          .map((video) => (
            <div
              key={video.id}
              className="flex gap-4 cursor-pointer hover:bg-white/10 p-2 rounded-lg"
              onClick={() => onVideoSelect(video)}
            >
              <img
                src={getAvatarUrl(video.channelAvatar)}
                alt={video.channel}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.channel}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}