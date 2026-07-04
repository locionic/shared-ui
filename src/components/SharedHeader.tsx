"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface SharedHeaderProps {
  logo: React.ReactNode;
  navItems: NavItem[];
  activeItem?: string;
  onNavClick?: (item: NavItem) => void;
  rightActions?: React.ReactNode; // e.g. language selector, search
  showThemeToggle?: boolean;
}

import Link from 'next/link';

export function SharedHeader({
  logo,
  navItems,
  activeItem,
  onNavClick,
  rightActions,
  showThemeToggle = true,
}: SharedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ThemeToggle = () => (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {mounted && resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            {logo}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <div key={item.id} className="relative group">
                  {item.href ? (
                    item.external ? (
                      <a
                        href={item.href}
                        onClick={() => onNavClick?.(item)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors relative z-10 ${
                          isActive
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          if (onNavClick) {
                            onNavClick(item);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors relative z-10 ${
                          isActive
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  ) : (
                    <button
                      onClick={() => onNavClick?.(item)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors relative z-10 flex items-center gap-1 ${
                        isActive || (item.children && item.children.some(c => activeItem === c.id))
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  )}
                  {(isActive || (item.children && item.children.some(c => activeItem === c.id))) && (
                    <motion.div
                      layoutId="desktopNavIndicator"
                      className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Dropdown Menu */}
                  {item.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 min-w-[150px] overflow-hidden">
                        {item.children.map(child => {
                          const isChildActive = activeItem === child.id;
                          const childClasses = `block px-4 py-2 text-sm font-medium transition-colors ${
                            isChildActive 
                              ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                          }`;
                          
                          if (child.external) {
                            return <a key={child.id} href={child.href} className={childClasses}>{child.label}</a>;
                          }
                          return <Link key={child.id} href={child.href || '#'} className={childClasses}>{child.label}</Link>;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {rightActions}
            {showThemeToggle && <ThemeToggle />}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeItem === item.id;
                return (
                  <React.Fragment key={item.id}>
                    {item.href ? (
                      item.external ? (
                        <a
                          href={item.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onNavClick?.(item);
                          }}
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onNavClick?.(item);
                          }}
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    ) : (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            if (!item.children) {
                              setMobileMenuOpen(false);
                              onNavClick?.(item);
                            }
                          }}
                          className={`block text-left w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive || (item.children && item.children.some(c => activeItem === c.id))
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {item.label}
                        </button>
                        {item.children && (
                          <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-100 dark:border-gray-800 ml-4 mt-1">
                            {item.children.map(child => {
                              const isChildActive = activeItem === child.id;
                              const childClasses = `block px-4 py-2 rounded-lg font-medium transition-colors ${
                                isChildActive
                                  ? 'text-primary-700 dark:text-primary-300'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`;
                              if (child.external) {
                                return (
                                  <a
                                    key={child.id}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={childClasses}
                                  >
                                    {child.label}
                                  </a>
                                );
                              }
                              return (
                                <Link
                                  key={child.id}
                                  href={child.href || '#'}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={childClasses}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
