import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ClubPageHeaderProps {
  /** The club name for the breadcrumb */
  clubName: string;
  /** The club slug for the breadcrumb link */
  clubSlug: string;
  /** The current page name for the breadcrumb (legacy, use breadcrumbs instead) */
  pageName?: string;
  /** Array of breadcrumb items for multi-level navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** The main heading for the page (can be string or ReactNode for custom content) */
  title: ReactNode;
  /** Optional subtitle/description text */
  description?: string;
  /** Optional action button to display on the right */
  action?: ReactNode;
  /** Whether to show breadcrumbs (default: true) */
  showBreadcrumbs?: boolean;
}

/**
 * A standardized page header component for club pages with breadcrumbs,
 * title, description, and optional action button.
 */
export function ClubPageHeader({
  clubName,
  clubSlug,
  pageName,
  breadcrumbs,
  title,
  description,
  action,
  showBreadcrumbs = true,
}: ClubPageHeaderProps) {
  // Support both old pageName and new breadcrumbs array
  const crumbs: BreadcrumbItem[] = breadcrumbs
    ? [{ label: clubName, href: `/clubs/${clubSlug}` }, ...breadcrumbs]
    : pageName
      ? [{ label: clubName, href: `/clubs/${clubSlug}` }, { label: pageName }]
      : [];

  const shouldShowBreadcrumbs = showBreadcrumbs && crumbs.length > 0;

  return (
    <div className="mb-8">
      {shouldShowBreadcrumbs && (
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            {crumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2" aria-hidden="true">
                    /
                  </span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-gray-700"
                    aria-current={
                      index === crumbs.length - 1 ? "page" : undefined
                    }
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          shouldShowBreadcrumbs && "mt-2",
        )}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
