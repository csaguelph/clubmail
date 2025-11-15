"use client";

import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewClubPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [primaryContactEmails, setPrimaryContactEmails] = useState("");

  const createClub = api.admin.createClub.useMutation({
    onSuccess: (data) => {
      router.push(`/clubs/${data.slug}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emails = primaryContactEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    createClub.mutate({
      name,
      slug,
      primaryContactEmails: emails,
    });
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    // Auto-generate slug from name if slug hasn't been manually edited
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(newName));
    }
  };

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href="/admin" className="hover:text-gray-700">
            Admin
          </a>
          <span>/</span>
          <span className="text-gray-900">New Club</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Create New Club
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Set up a new club with default settings and primary contacts
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Club Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
              placeholder="e.g., Computer Science Club"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug *
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                /clubs/
              </span>
              <input
                type="text"
                id="slug"
                required
                pattern="[a-z0-9-]+"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                placeholder="computer-science-club"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Lowercase letters, numbers, and hyphens only
            </p>
          </div>

          <div>
            <label
              htmlFor="primaryContacts"
              className="block text-sm font-medium text-gray-700"
            >
              Primary Contact Emails *
            </label>
            <textarea
              id="primaryContacts"
              required
              value={primaryContactEmails}
              onChange={(e) => setPrimaryContactEmails(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
              placeholder="email1@example.com, email2@example.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Comma-separated email addresses. These users will be created as
              stub users if they don&apos;t exist and will be given CLUB_OWNER
              role.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createClub.isPending}
              className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createClub.isPending ? "Creating..." : "Create Club"}
            </button>
          </div>

          {createClub.error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
              {createClub.error.message}
            </div>
          )}
        </form>
      </div>
    </PageContainer>
  );
}
