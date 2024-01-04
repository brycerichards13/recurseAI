'use client';
import React, { useState } from 'react';
import ChatBox from 'components/ChatBox';
import styles from 'app/chat/page.module.css';
import NavBar from 'components/ChatPageNavbar';
import navBarCSS from 'components/ChatPageNavbar/index.module.css';

export default function Chat({ params, children }) {
  const id = params.id;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [files, setFiles] = useState([]);

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };
  return (
    <main className={styles.main}>
      <div className={`${navBarCSS.sidebar} ${!isSidebarOpen ? navBarCSS.sidebarclosed : ''}`}>
        <NavBar files={files} setFiles={handleFilesChange}/>
      </div>
      <ChatBox toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} files={files} setFiles={setFiles}>{children}</ChatBox>
    </main>
  );
}