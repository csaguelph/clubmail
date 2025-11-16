"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AlertCircle, CheckCircle, Info, Upload, X } from "lucide-react";
import { useState } from "react";

import { api } from "@/trpc/react";

interface ParsedClub {
  name: string;
  slug: string;
  gryphlifeId?: string;
  organizationEmail?: string;
  primaryContactEmails: string[];
  isActive: boolean;
}

interface CSVImportResult {
  created: string[];
  updated: string[];
  errors: { slug: string; error: string }[];
}

export default function ClubCSVImport() {
  const [isOpen, setIsOpen] = useState(false);
  const [csvData, setCsvData] = useState<ParsedClub[]>([]);
  const [replaceStaff, setReplaceStaff] = useState(true);
  const [importResult, setImportResult] = useState<CSVImportResult | null>(
    null,
  );
  const [parseError, setParseError] = useState<string | null>(null);

  const importMutation = api.admin.importClubsFromCSV.useMutation({
    onSuccess: (result) => {
      setImportResult(result);
      setCsvData([]);
    },
    onError: (error) => {
      setParseError(error.message);
    },
  });

  const utils = api.useUtils();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParseError(null);
    setImportResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const parsed = parseCSV(text);
        setCsvData(parsed);
      } catch (error) {
        setParseError(
          error instanceof Error ? error.message : "Failed to parse CSV",
        );
      }
    };
    reader.readAsText(file);
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  };

  const parseCSV = (text: string): ParsedClub[] => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row");
    }

    // Detect if this is a GryphLife CSV (header on row 3)
    let headerLine: string;
    let dataStartRow: number;

    // Check if row 3 exists and contains GryphLife-specific columns
    if (lines.length >= 3) {
      const potentialHeader = parseCSVLine(lines[2] ?? "").map((h) =>
        h.toLowerCase().trim(),
      );
      const isGryphLife =
        potentialHeader.includes("organization id") ||
        potentialHeader.includes("website key") ||
        potentialHeader.includes("primary contact campus email");

      if (isGryphLife) {
        headerLine = lines[2] ?? "";
        dataStartRow = 3;
      } else {
        headerLine = lines[0] ?? "";
        dataStartRow = 1;
      }
    } else {
      headerLine = lines[0] ?? "";
      dataStartRow = 1;
    }

    if (!headerLine) {
      throw new Error("Invalid CSV header");
    }

    const header = parseCSVLine(headerLine).map((h) => h.toLowerCase().trim());

    // Standard format column names
    const nameIdx = header.indexOf("name");
    const slugIdx = header.indexOf("slug");
    const gryphlifeIdIdx = header.indexOf("gryphlife_id");
    const gryphlifeIdx = header.indexOf("gryphlife");
    const orgEmailIdx = header.indexOf("organization_email");
    const orgEmailAltIdx = header.indexOf("org_email");
    const emailsIdx = header.indexOf("emails");
    const contactsIdx = header.indexOf("contacts");
    const primaryContactsIdx = header.indexOf("primary_contacts");
    const isActiveIdx = header.indexOf("is_active");
    const activeIdx = header.indexOf("active");

    // GryphLife format column names
    const glOrgNameIdx = header.indexOf("organization name");
    const glOrgIdIdx = header.indexOf("organization id");
    const glWebsiteKeyIdx = header.indexOf("website key");
    const glOrgEmailIdx = header.indexOf("organization email");
    const glPrimaryContactIdx = header.indexOf("primary contact campus email");

    // Determine which columns to use based on format
    const finalNameIdx = nameIdx !== -1 ? nameIdx : glOrgNameIdx;
    const finalSlugIdx = slugIdx !== -1 ? slugIdx : glWebsiteKeyIdx;
    const finalGryphlifeIdIdx =
      gryphlifeIdIdx !== -1
        ? gryphlifeIdIdx
        : gryphlifeIdx !== -1
          ? gryphlifeIdx
          : glOrgIdIdx;
    const finalOrgEmailIdx =
      orgEmailIdx !== -1
        ? orgEmailIdx
        : orgEmailAltIdx !== -1
          ? orgEmailAltIdx
          : glOrgEmailIdx;
    const finalEmailsIdx =
      emailsIdx !== -1
        ? emailsIdx
        : contactsIdx !== -1
          ? contactsIdx
          : primaryContactsIdx !== -1
            ? primaryContactsIdx
            : glPrimaryContactIdx;

    if (finalNameIdx === -1 || finalSlugIdx === -1) {
      throw new Error(
        'CSV must have "name" and "slug" columns (or GryphLife equivalent)',
      );
    }

    if (finalEmailsIdx === -1) {
      throw new Error(
        'CSV must have "emails", "contacts", or "primary_contacts" column (or GryphLife equivalent)',
      );
    }

    // Use is_active or active column (GryphLife doesn't have this)
    const activeColumnIdx = isActiveIdx !== -1 ? isActiveIdx : activeIdx;

    const clubs: ParsedClub[] = [];

    for (let i = dataStartRow; i < lines.length; i++) {
      const line = lines[i]?.trim();
      if (!line) continue;

      const values = parseCSVLine(line);

      const name = values[finalNameIdx];
      let slug = values[finalSlugIdx];
      const gryphlifeId =
        finalGryphlifeIdIdx !== -1
          ? (values[finalGryphlifeIdIdx]?.trim() ?? undefined)
          : undefined;
      const organizationEmail =
        finalOrgEmailIdx !== -1
          ? (values[finalOrgEmailIdx]?.trim() ?? undefined)
          : undefined;
      const emailsRaw = values[finalEmailsIdx];

      if (!name || !slug || !emailsRaw) {
        throw new Error(`Row ${i + 1}: Missing required fields`);
      }

      // Convert slug to lowercase to match regex requirement
      slug = slug.toLowerCase();

      // Parse emails (can be separated by semicolons or pipes)
      const emails = emailsRaw
        .split(/[;|]/)
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      if (emails.length === 0) {
        throw new Error(`Row ${i + 1}: No valid email addresses found`);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      for (const email of emails) {
        if (!emailRegex.test(email)) {
          throw new Error(`Row ${i + 1}: Invalid email address "${email}"`);
        }
      }

      // Validate organizationEmail if provided
      if (organizationEmail && !emailRegex.test(organizationEmail)) {
        throw new Error(
          `Row ${i + 1}: Invalid organization email "${organizationEmail}"`,
        );
      }

      // Parse isActive (default to true if not specified or invalid)
      let isActive = true;
      if (activeColumnIdx !== -1) {
        const activeValue = values[activeColumnIdx]?.toLowerCase();
        if (
          activeValue === "false" ||
          activeValue === "0" ||
          activeValue === "no"
        ) {
          isActive = false;
        }
      }

      clubs.push({
        name,
        slug,
        gryphlifeId: gryphlifeId ?? undefined,
        organizationEmail: organizationEmail ?? undefined,
        primaryContactEmails: emails,
        isActive,
      });
    }

    return clubs;
  };

  const handleImport = async () => {
    if (csvData.length === 0) return;

    await importMutation.mutateAsync({
      clubs: csvData.map((club) => ({
        ...club,
        replaceStaff,
      })),
    });

    // Refresh the clubs list
    await utils.admin.listClubs.invalidate();
  };

  const handleClose = () => {
    setIsOpen(false);
    setCsvData([]);
    setParseError(null);
    setImportResult(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
      >
        <Upload className="mr-2 inline h-4 w-4" />
        Import CSV
      </button>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Import Clubs from CSV
              </DialogTitle>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Instructions */}
            {!csvData.length && !importResult && (
              <div className="mb-6 rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-400" />
                  <div className="ml-3 text-sm text-blue-700">
                    <p className="font-medium">CSV Format Instructions:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        <strong>Standard format:</strong> Required columns:{" "}
                        <code>name</code>, <code>slug</code>, and one of{" "}
                        <code>emails</code>, <code>contacts</code>, or{" "}
                        <code>primary_contacts</code>
                      </li>
                      <li>
                        <strong>GryphLife export format:</strong> Automatically
                        detected (headers on row 3)
                      </li>
                      <li>
                        Optional columns: <code>gryphlife_id</code> (or{" "}
                        <code>gryphlife</code>), <code>organization_email</code>{" "}
                        (or <code>org_email</code>), <code>is_active</code> or{" "}
                        <code>active</code> (true/false, defaults to true)
                      </li>
                      <li>
                        Slugs will be automatically converted to lowercase
                      </li>
                      <li>
                        Fields containing commas should be wrapped in double
                        quotes (e.g., &quot;Club Name, Inc.&quot;)
                      </li>
                      <li>
                        Multiple emails can be separated by semicolons (;) or
                        pipes (|)
                      </li>
                      <li>
                        If a club with the same slug exists, it will be updated
                      </li>
                    </ul>
                    <p className="mt-2">
                      <strong>Example:</strong>
                      <br />
                      <code className="text-xs">
                        name,slug,gryphlife_id,organization_email,emails,is_active
                        <br />
                        &quot;Chess Club,
                        Official&quot;,chess-club,12345,chess@uoguelph.ca,president@example.com;vp@example.com,true
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload */}
            {!csvData.length && !importResult && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Upload CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-[#b1d135] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-900 hover:file:bg-[#9fbc2f]"
                />
              </div>
            )}

            {/* Parse Error */}
            {parseError && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error parsing CSV
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {parseError}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview */}
            {csvData.length > 0 && !importResult && (
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Preview ({csvData.length} clubs)
                  </h3>
                  <div className="mt-2 max-h-96 overflow-y-auto rounded-md border border-gray-300">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Name
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Slug
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Gryphlife ID
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Org Email
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Primary Contacts
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                            Active
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {csvData.map((club, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-900">
                              {club.name}
                            </td>
                            <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                              {club.slug}
                            </td>
                            <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                              {club.gryphlifeId ?? "-"}
                            </td>
                            <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                              {club.organizationEmail ?? "-"}
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {club.primaryContactEmails.join(", ")}
                            </td>
                            <td className="px-3 py-2 text-sm whitespace-nowrap text-gray-500">
                              {club.isActive ? "Yes" : "No"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={replaceStaff}
                      onChange={(e) => setReplaceStaff(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Replace existing staff/primary contacts for clubs being
                      updated
                    </span>
                  </label>
                  <p className="mt-1 ml-6 text-xs text-gray-500">
                    When checked, all existing CLUB_OWNER members will be
                    removed and replaced with the contacts from the CSV. When
                    unchecked, existing staff will be preserved.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={importMutation.isPending}
                    className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f] disabled:opacity-50"
                  >
                    {importMutation.isPending
                      ? "Importing..."
                      : `Import ${csvData.length} Club${csvData.length !== 1 ? "s" : ""}`}
                  </button>
                </div>
              </>
            )}

            {/* Import Result */}
            {importResult && (
              <div className="space-y-4">
                {importResult.created.length > 0 && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Successfully created {importResult.created.length}{" "}
                          club
                          {importResult.created.length !== 1 ? "s" : ""}
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <ul className="list-disc space-y-1 pl-5">
                            {importResult.created.map((slug) => (
                              <li key={slug}>{slug}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {importResult.updated.length > 0 && (
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Successfully updated {importResult.updated.length}{" "}
                          club
                          {importResult.updated.length !== 1 ? "s" : ""}
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc space-y-1 pl-5">
                            {importResult.updated.map((slug) => (
                              <li key={slug}>{slug}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {importResult.errors.length > 0 && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Failed to import {importResult.errors.length} club
                          {importResult.errors.length !== 1 ? "s" : ""}
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <ul className="list-disc space-y-1 pl-5">
                            {importResult.errors.map((error) => (
                              <li key={error.slug}>
                                <strong>{error.slug}:</strong> {error.error}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleClose}
                    className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
