import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Container from "./Container";
import { Provider } from "react-redux";
import store from "./store/store";

export default function TemplateYoutube() {
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
        <Header toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 pt-14">
          {/* Sidebar */}
          <Sidebar
            isVisible={isSidebarVisible}
            isCollapsed={isSidebarCollapsed}
            closeSidebar={closeSidebar}
          />

          {/* Contenu principal */}
          <Container isSidebarCollapsed={isSidebarCollapsed} />
        </div>
      </div>
    </Provider>
  );
}