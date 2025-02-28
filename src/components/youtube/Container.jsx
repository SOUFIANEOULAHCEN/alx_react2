import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectVideo,
  LikeVideo,
  DislikeVideo,
  AddComment,
  DeleteComment, // Import de l'action de suppression
} from "./reducers/PlaylistActions";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
export default function Container({ isSidebarCollapsed }) {
  const dispatch = useDispatch();
  const { playlists, selectedPlaylist, selectedVideo } = useSelector(
    (state) => state
  );
  const [newComment, setNewComment] = useState("");
  const commentRefs = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  // Fonction pour vérifier la visibilité des commentaires
  const checkVisibility = () => {
    commentRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setVisibleIndex((prev) => (index > prev ? index : prev));
        }
      }
    });
  };

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
      setNewComment("");
    } else {
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

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = (idVideo, commentIndex) => {
    dispatch(DeleteComment(idVideo, commentIndex));
  };

  // Filtrer les vidéos par playlist sélectionnée
  const currentPlaylist = playlists.find(
    (pl) => pl.idPlaylist === selectedPlaylist
  );
  const videos = currentPlaylist ? currentPlaylist.videos : [];
  const selectedVideoData = videos.find((video) => video.id === selectedVideo);

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  return (
    <motion.main
      className={`flex-1 p-6 overflow-auto transition-all duration-200 ${
        isSidebarCollapsed ? "ml-16" : "ml-64"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Vidéo principale */}
        <div className="flex-1">
          {selectedVideoData && (
            <motion.div
              className="bg-white/10 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Lecteur de vidéo */}
              <div className="w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${new URL(
                    selectedVideoData.lien
                  ).searchParams.get("v")}`}
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
                    <motion.button
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => handleLike(selectedVideoData.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span>👍 Like</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                      onClick={() => handleDislike(selectedVideoData.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span>👎 Dislike</span>
                    </motion.button>
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
                <motion.form
                  onSubmit={handleAddComment}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full p-2 bg-white/10 rounded-lg text-white placeholder-gray-400 outline-none"
                    rows="3"
                  />
                  <motion.button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Publier
                  </motion.button>
                </motion.form>

                {/* Liste des commentaires */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {selectedVideoData.commentaires.map((comment, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        ref={(el) => (commentRefs.current[index] = el)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          visibleIndex >= index ? { opacity: 1, y: 0 } : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
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
                        {/* Bouton de suppression */}
                        <button
                          onClick={() =>
                            handleDeleteComment(selectedVideoData.id, index)
                          }
                          className="text-white hover:text-primary transition hover:scale-[1.6] duration-300"
                        >
                          <FaTrash />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Liste de toutes les vidéos de la playlist */}
        <div className="w-full lg:w-96">
          <h2 className="text-lg font-semibold mb-4">Vidéos de la playlist</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className={`flex gap-4 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all ${
                    video.id === selectedVideo ? "bg-white/10" : ""
                  }`}
                  onClick={() => handleVideoSelect(video.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${new URL(
                      video.lien
                    ).searchParams.get("v")}/hqdefault.jpg`}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}