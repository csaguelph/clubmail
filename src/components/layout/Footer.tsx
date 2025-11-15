"use client";

import { GitCommit } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const gitCommit = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA;

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center text-sm text-gray-600 sm:text-left">
            <p>© {new Date().getFullYear()} Central Student Association</p>
            <p className="text-xs text-gray-500">
              Streamlined club communications and email campaigns
            </p>
            {gitCommit && (
              <a
                href={`https://github.com/csaguelph/clubs-mail/commit/${gitCommit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-gray-400 hover:text-gray-600 hover:underline"
              >
                <GitCommit className="h-3 w-3" />
                {gitCommit.slice(0, 7)}
              </a>
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/csaguelph/clubs-mail"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              GitHub
            </a>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
