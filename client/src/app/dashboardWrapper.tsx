"use client"; 

import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  console.log("DashboardLayout rendered - Sidebar Collapsed:", isSidebarCollapsed);
  console.log("DashboardLayout rendered - Dark Mode:", isDarkMode);

  useEffect(() => {
    console.log("useEffect triggered - Dark Mode:", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);  // Dependency array added to avoid unnecessary re-renders

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboarWrapper = ({ children }: { children: React.ReactNode }) => {
  console.log("DashboarWrapper rendered");

  return (
    <StoreProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StoreProvider>
  );
};

export default DashboarWrapper;
export { DashboardLayout };
export { default as StoreProvider } from './redux';
export { default as useAppSelector } from './redux';
export { default as useAppDispatch } from './redux';
export { default as useAppState } from './redux';
export { default as useAppActions } from './redux';