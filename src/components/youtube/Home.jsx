import React, { useState } from "react";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "./store/store";
import ContainerHome from "./ComtainerHome";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { IoDownloadSharp } from "react-icons/io5";
import HeaderHome from "./HeaderHome";

const Sidebar = ({ isVisible, isCollapsed, closeSidebar }) => {
  return (
    <div
      className={`bg-primary/70 backdrop-blur-lg shadow-lg fixed left-0 top-14 bottom-0 overflow-y-auto p-4 transition-all duration-200 ${
        isVisible ? (isCollapsed ? "w-20" : "w-64") : "w-0"
      }`}
    >
      {/* Liste des éléments */}
      <ul className="space-y-4">
        <li className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-900">
          <FaHome className="text-xl text-white" />
          {!isCollapsed && <span>Home</span>}
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
    </div>
  );
};

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (!isSidebarVisible) {
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-secondary text-white flex flex-col">
        {/* Header */}
        <HeaderHome toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 pt-14">
          {/* Sidebar */}
          <Sidebar
            isVisible={isSidebarVisible}
            isCollapsed={isSidebarCollapsed}
            closeSidebar={closeSidebar}
          />

          {/* Contenu principal */}
          <ContainerHome isSidebarCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </Provider>
  );
}

