import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectVideo,
  LikeVideo,
  DislikeVideo,
  AddComment,
} from "./reducers/PlaylistActions";
import Swal from "sweetalert2";

export default function Container({ isSidebarCollapsed }) {
  const dispatch = useDispatch();
  const { playlists, selectedPlaylist, selectedVideo } = useSelector(
    (state) => state
  );
  const [newComment, setNewComment] = useState(""); // État pour le nouveau commentaire

  // Fonction pour sélectionner une vidéo
  const handleVideoSelect = (idVideo) => {
    dispatch(SelectVideo(idVideo));
  };

  // Fonction pour ajouter un like
  const handleLike = (idVideo) => {
    dispatch(LikeVideo(idVideo));
  };

  // Fonction pour ajouter un dislike
  const handleDislike = (idVideo) => {
    dispatch(DislikeVideo(idVideo));
  };

  // Fonction pour ajouter un commentaire
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(AddComment(selectedVideo, newComment));
      setNewComment(""); // Réinitialiser le champ de commentaire
    } else {
      // Afficher un message d'alerte si le commentaire est vide
      Swal.fire({
        title: "Le commentaire est vide",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2500,
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-button",
        },
      });
    }
  };

  // Filtrer les vidéos par playlist sélectionnée
  const currentPlaylist = playlists.find((pl) => pl.idPlaylist === selectedPlaylist);
  const videos = currentPlaylist ? currentPlaylist.videos : [];
  const selectedVideoData = videos.find((video) => video.id === selectedVideo);

  return (
    <main
      className={`flex-1 p-6 overflow-auto transition-all duration-200 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Vidéo principale */}
        <div className="flex-1">
          {selectedVideoData && (
            <div className="bg-white/10 rounded-lg shadow-lg overflow-hidden">
              {/* Lecteur de vidéo */}
              <div className="w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${new URL(selectedVideoData.lien).searchParams.get("v")}`}
                  title={selectedVideoData.titre}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>

              {/* Titre et informations de la vidéo */}
              <div className="p-4">
                <h2 className="text-xl font-bold">{selectedVideoData.titre}</h2>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {selectedVideoData.likes} likes
                    </span>
                    <span className="text-sm text-gray-400">
                      {selectedVideoData.dislikes} dislikes
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => handleLike(selectedVideoData.id)}
                    >
                      <span>👍 Like</span>
                    </button>
                    <button
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => handleDislike(selectedVideoData.id)}
                    >
                      <span>👎 Dislike</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedVideoData.description}
                </p>
              </div>

              {/* Section des commentaires */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Commentaires</h3>

                {/* Formulaire pour ajouter un commentaire */}
                <form onSubmit={handleAddComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-gray-400 outline-none"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition"
                  >
                    Publier
                  </button>
                </form>

                {/* Liste des commentaires */}
                <div className="space-y-4">
                  {selectedVideoData.commentaires.map((comment, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <img
                        src={selectedVideoData.auteur.photo}
                        alt="Auteur"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white">{comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {selectedVideoData.auteur.nom}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste de toutes les vidéos de la playlist */}
        <div className="w-full lg:w-96">
          <h2 className="text-lg font-semibold mb-4">Vidéos de la playlist</h2>
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`flex gap-4 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all ${
                  video.id === selectedVideo ? "bg-white/10" : ""
                }`}
                onClick={() => handleVideoSelect(video.id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${new URL(video.lien).searchParams.get("v")}/hqdefault.jpg`}
                  alt={video.titre}
                  className="w-40 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{video.titre}</h3>
                  <p className="text-xs text-gray-400">{video.auteur.nom}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{video.likes} likes</span>
                    <span>•</span>
                    <span>{video.duree}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
