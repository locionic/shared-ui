import React from 'react';
import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

export interface SocialLinks {
  email?: string;
  github?: string;
  linkedin?: string;
}

export interface SharedFooterProps {
  authorName: string;
  siteName: string;
  socials?: SocialLinks;
}

export function SharedFooter({ authorName, siteName, socials }: SharedFooterProps) {
  return (
    <footer className="w-full py-8 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Social Links */}
          {socials && (
            <div className="flex space-x-6 mb-4">
              {socials.email && (
                <a href={`mailto:${socials.email}`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6" />
                </a>
              )}
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          )}
          
          {/* Copyright & Links */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{authorName}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {siteName}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
