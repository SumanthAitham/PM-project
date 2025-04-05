"use client";
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  Home,
  Search,
  Settings,
  User,
  Users,
  LockIcon,
  LucideIcon,
  X,
  ChevronUp,
  ChevronDown,
  ShieldAlert,
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const {data: projects} = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 ${isDarkMode ? 'bg-black' : 'bg-white'} overflow-y-auto
     ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className={`z-50 flex min-h-[56px] w-64 items-center justify-between px-6 pt-3 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
          <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Edlist
          </div>
          {isSidebarCollapsed ? null : (
            <button className='py-3' 
            onClick={() => {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
            }}>
              <X className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-gray-500`} />
            </button>
          )}
        </div>
        {/* Team */}
        <div className={`flex items-center gap-5 border-y-[1.5px] px-8 py-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div>
            <h3 className={`text-md font-bold tracking-wide ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              EveryDay Task
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className={`mt-[0.1rem] h-3 w-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Private</p>
            </div>
          </div>
        </div>
        {/* NavBar */}
        <div className={`z-10 w-full ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          <nav className={`z-10 w-full ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <SidebarLink icon={Home} label="Home" href="/" isDarkMode={isDarkMode} />
            <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" isDarkMode={isDarkMode} />
            <SidebarLink icon={Search} label="Search" href="/search" isDarkMode={isDarkMode} />
            <SidebarLink icon={Settings} label="Settings" href="/settings" isDarkMode={isDarkMode} />
            <SidebarLink icon={User} label="Users" href="/users" isDarkMode={isDarkMode} />
            <SidebarLink icon={Users} label="Teams" href="/teams" isDarkMode={isDarkMode} />
          </nav>
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Projects</span>
            {showProjects ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {/* PROJECTS LIST */}
        {showProjects && projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
              isDarkMode={isDarkMode}
            />
          ))}

          
          {/* PRIORITIES LINKS */}
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Priority</span>
            {showPriority ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {showPriority && (
            <>
              <SidebarLink
                icon={AlertCircle}
                label="Urgent"
                href="/priority/urgent"
                isDarkMode={isDarkMode}
              />
              <SidebarLink
                icon={ShieldAlert}
                label="High"
                href="/priority/high"
                isDarkMode={isDarkMode}
              />
              <SidebarLink
                icon={AlertTriangle}
                label="Medium"
                href="/priority/medium"
                isDarkMode={isDarkMode}
              />
              <SidebarLink
                icon={AlertOctagon}
                label="Low"
                href="/priority/low"
                isDarkMode={isDarkMode}
              />
              <SidebarLink
                icon={Layers3}
                label="Backlog"
                href="/priority/backlog"
                isDarkMode={isDarkMode}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isDarkMode: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isDarkMode }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors ${isActive ? 'bg-gray-100 text-white' : ''} justify-start px-8 py-3 ${isDarkMode ? 'bg-black hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} ${isActive ? 'bg-gray-600' : ''}`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`} />
        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;