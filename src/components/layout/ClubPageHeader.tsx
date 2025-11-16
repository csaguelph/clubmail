import Link from "next/link";
import type { ReactNode } from "react";

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
  /** The main heading for the page */
  title: string;
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
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {crumbs.map((crumb, index) => (
            <>
              {index > 0 && <span>/</span>}
              {crumb.href ? (
                <Link
                  key={index}
                  href={crumb.href}
                  className="hover:text-gray-700"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span key={index} className="text-gray-900">
                  {crumb.label}
                </span>
              )}
            </>
          ))}
        </div>
      )}
      <div
        className={`flex items-center justify-between ${
          shouldShowBreadcrumbs ? "mt-2" : ""
        }`}
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
