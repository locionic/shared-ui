"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AnimatedHeroProps {
  greeting?: string;
  title: string;
  description: string;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export function AnimatedHero({
  greeting = "Hello 👋",
  title,
  description,
  primaryActionText = "Read latest posts",
  primaryActionHref = "#latest-posts",
  secondaryActionText,
  secondaryActionHref,
}: AnimatedHeroProps) {
  return (
    <div className="relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-24 lg:pt-32">
      {/* Decorative gradients */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div 
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:opacity-40"
          style={{ 
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' 
          }}
        ></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl mb-6">
          <span className="block">{greeting}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500 mt-2 pb-2">
            {title}
          </span>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
        >
          {description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          {primaryActionText && primaryActionHref && (
            <a href={primaryActionHref} className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25">
              {primaryActionText}
            </a>
          )}
          {secondaryActionText && secondaryActionHref && (
            <a href={secondaryActionHref} className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary-500 transition-colors">
              {secondaryActionText} <span aria-hidden="true">→</span>
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
