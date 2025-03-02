import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-neutral-200 bg-white py-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">StriveSync</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Join challenges, track progress, and achieve your goals with friends and teammates.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/features" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 md:flex-row">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {currentYear} StriveSync. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-primary dark:text-neutral-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-primary dark:text-neutral-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-primary dark:text-neutral-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}