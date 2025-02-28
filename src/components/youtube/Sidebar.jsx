import React from "react";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { IoDownloadSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { SelectPlaylist } from "./reducers/PlaylistActions";
import { Link } from "react-router-dom";

export default function Sidebar({ isVisible, isCollapsed, closeSidebar }) {
  const dispatch = useDispatch();
  const { playlists, selectedPlaylist } = useSelector((state) => state);

  const handlePlaylistSelect = (idPlaylist) => {
    dispatch(SelectPlaylist(idPlaylist));
  };

  return (
    <div
      className={`bg-primary/70 backdrop-blur-lg shadow-lg fixed left-0 top-14 bottom-0 overflow-y-auto p-4 transition-all duration-200 ${
        isVisible ? (isCollapsed ? "w-20" : "w-64") : "w-0"
      }`}
    >
      {/* Liste des éléments */}
      <ul className="space-y-4">
        <li className="cursor-pointer flex items-center gap-4  rounded-md hover:bg-blue-900">
          <Link to={"/"}  className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900">
            {" "}
            <FaHome className="text-xl text-white" />
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>
        <li className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900">
          <SiYoutubeshorts className="text-xl text-white" />
          {!isCollapsed && <span>Shorts</span>}
        </li>
        <li className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900">
          <MdSubscriptions className="text-xl text-white" />
          {!isCollapsed && <span>Subscriptions</span>}
        </li>
        <li className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900">
          <IoDownloadSharp className="text-xl text-white" />
          {!isCollapsed && <span>Downloads</span>}
        </li>
      </ul>

      {/* Liste des playlists, ne s'affiche que si isCollapsed est false */}
      {!isCollapsed && (
        <>
          <h2 className="mt-6 mb-2 text-lg font-semibold">Playlists</h2>
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li
                key={playlist.idPlaylist}
                className={`cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900 ${
                  selectedPlaylist === playlist.idPlaylist ? "bg-blue-900" : ""
                }`}
                onClick={() => handlePlaylistSelect(playlist.idPlaylist)}
              >
                <span>{playlist.titre}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
