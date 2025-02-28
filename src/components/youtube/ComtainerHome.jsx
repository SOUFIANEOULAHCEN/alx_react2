import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { videos, playlists } from "../../assets/videos";
import VideoPlayer from "./VideoPlayer";

export default function ContainerHome({ isSidebarCollapsed }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]); // Sélectionnez la première vidéo par défaut
  const [marginLeft, setMarginLeft] = useState(isSidebarCollapsed ? "ml-16" : "ml-64");

  // Mettre à jour la marge gauche lorsque la sidebar change
  useEffect(() => {
    setMarginLeft(isSidebarCollapsed ? "ml-16" : "ml-64");
  }, [isSidebarCollapsed]);

  // Gérer la sélection d'une playlist
  const handlePlaylistSelect = (playlistId) => {
    if (playlistId) {
      const playlist = playlists.find((pl) => pl.id === playlistId);
      if (playlist) {
        setFilteredVideos(playlist.videos); // Filtrer les vidéos par playlist
        setSelectedVideo(playlist.videos[0]); // Sélectionner la première vidéo de la playlist
      }
    } else {
      setFilteredVideos(videos); // Afficher toutes les vidéos si aucune playlist n'est sélectionnée
      setSelectedVideo(videos[0]); // Sélectionner la première vidéo de la liste complète
    }
    setSelectedPlaylist(playlistId);
  };

  return (
    <motion.main
      className={`flex-1 p-6 overflow-auto transition-all duration-200 ${marginLeft}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Filtres de playlist */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <button
          onClick={() => handlePlaylistSelect(null)}
          className={`px-4 py-2 rounded-lg ${
            selectedPlaylist === null
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-400"
          }`}
        >
          All
        </button>
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => handlePlaylistSelect(playlist.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedPlaylist === playlist.id
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-400"
            }`}
          >
            {playlist.name}
          </button>
        ))}
      </div>

      {/* Affichez le lecteur de vidéo et la liste des vidéos */}
      <VideoPlayer
        selectedVideo={selectedVideo}
        onVideoSelect={(video) => setSelectedVideo(video)}
        videos={filteredVideos} // Passer les vidéos filtrées
      />
    </motion.main>
  );
}