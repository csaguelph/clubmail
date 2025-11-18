"use client";

import { api } from "@/trpc/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  Download,
  Edit,
  Info,
  Trash2,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";

interface SubscribersListProps {
  clubId: string;
  slug: string;
  emailLists: Array<{
    id: string;
    name: string;
    isDefault: boolean;
    _count: {
      memberships: number;
      campaigns: number;
    };
  }>;
}

export default function SubscribersList({
  clubId,
  slug,
  emailLists,
}: SubscribersListProps) {
  const [selectedListId, setSelectedListId] = useState(
    emailLists.find((l) => l.isDefault)?.id ?? emailLists[0]?.id ?? "",
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isGryphLifeImportModalOpen, setIsGryphLifeImportModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [csvContent, setCsvContent] = useState("");
  const [gryphLifeParseError, setGryphLifeParseError] = useState<string | null>(
    null,
  );
  const [gryphLifeParsedData, setGryphLifeParsedData] = useState<
    Array<{ email: string; name: string }>
  >([]);
  const [editingSubscriber, setEditingSubscriber] = useState<{
    id: string;
    email: string;
    name: string | null;
    status: "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED" | "BLOCKED";
  } | null>(null);
  const [deletingSubscriber, setDeletingSubscriber] = useState<{
    id: string;
    email: string;
  } | null>(null);
  const [changingStatusSubscriber, setChangingStatusSubscriber] = useState<{
    id: string;
    email: string;
    currentStatus: string;
  } | null>(null);
  const [newStatus, setNewStatus] = useState<
    "SUBSCRIBED" | "UNSUBSCRIBED" | "BOUNCED" | "BLOCKED"
  >("SUBSCRIBED");

  const utils = api.useUtils();

  const { data: subscribers, isLoading } =
    api.subscribers.listSubscribers.useQuery(
      {
        clubId,
        listId: selectedListId ?? undefined,
        limit: 100,
      },
      {
        enabled: !!selectedListId,
      },
    );

  const addSubscriber = api.subscribers.createSubscriber.useMutation({
    onSuccess: () => {
      void utils.subscribers.listSubscribers.invalidate();
      setIsAddModalOpen(false);
      setNewEmail("");
      setNewName("");
    },
  });

  const bulkImport = api.subscribers.bulkImport.useMutation({
    onSuccess: () => {
      void utils.subscribers.listSubscribers.invalidate();
      setIsImportModalOpen(false);
      setCsvContent("");
    },
  });

  const updateSubscriber = api.subscribers.updateSubscriber.useMutation({
    onSuccess: () => {
      void utils.subscribers.listSubscribers.invalidate();
      setIsEditModalOpen(false);
      setEditingSubscriber(null);
    },
  });

  const changeStatus = api.subscribers.updateSubscriber.useMutation({
    onSuccess: () => {
      void utils.subscribers.listSubscribers.invalidate();
      setChangingStatusSubscriber(null);
    },
  });

  const deleteSubscriber = api.subscribers.deleteSubscriber.useMutation({
    onSuccess: () => {
      void utils.subscribers.listSubscribers.invalidate();
      setIsDeleteModalOpen(false);
      setDeletingSubscriber(null);
    },
  });

  const { refetch: triggerExport } = api.subscribers.exportSubscribers.useQuery(
    {
      clubId,
      listId: selectedListId ?? undefined,
    },
    {
      enabled: false, // Don't run on mount, only when explicitly triggered
    },
  );

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListId) return;

    addSubscriber.mutate({
      clubId,
      email: newEmail,
      name: newName || undefined,
      listIds: [selectedListId],
    });
  };

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListId) return;

    // Parse CSV content
    const lines = csvContent.trim().split("\n");
    if (lines.length < 2) {
      return; // Need at least header + 1 row
    }

    // Skip header row and parse data
    const subscribersData = lines
      .slice(1)
      .map((line) => {
        const [email, name] = line.split(",").map((s) => s.trim());
        return { email: email ?? "", name };
      })
      .filter((s) => s.email); // Filter out empty emails

    bulkImport.mutate({
      clubId,
      listId: selectedListId,
      subscribers: subscribersData,
    });
  };

  const handleGryphLifeFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGryphLifeParseError(null);
    setGryphLifeParsedData([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const lines = text.trim().split("\n");

        // Headers are on row 4 (index 3)
        if (lines.length < 5) {
          throw new Error("Invalid GryphLife CSV format. File too short.");
        }

        const headerLine = lines[3];
        if (!headerLine) {
          throw new Error("Could not find header row (row 4).");
        }

        // Parse header to find column indices
        const headers = headerLine.split(",").map((h) => h.trim());
        const firstNameIdx = headers.findIndex(
          (h) => h.toLowerCase() === "first name",
        );
        const lastNameIdx = headers.findIndex(
          (h) => h.toLowerCase() === "last name",
        );
        const emailIdx = headers.findIndex(
          (h) => h.toLowerCase() === "campus email",
        );

        if (firstNameIdx === -1 || lastNameIdx === -1 || emailIdx === -1) {
          throw new Error(
            'Could not find required columns: "First Name", "Last Name", "Campus Email"',
          );
        }

        // Parse data rows (starting from row 5, index 4)
        const parsedData: Array<{ email: string; name: string }> = [];
        const emailSet = new Set<string>();

        for (let i = 4; i < lines.length; i++) {
          const line = lines[i]?.trim();
          if (!line) continue;

          const values = line.split(",");
          const firstName = values[firstNameIdx]?.trim() ?? "";
          const lastName = values[lastNameIdx]?.trim() ?? "";
          const email = values[emailIdx]?.trim()?.toLowerCase() ?? "";

          if (email && !emailSet.has(email)) {
            emailSet.add(email);
            const name = [firstName, lastName].filter(Boolean).join(" ");
            parsedData.push({ email, name: name || email });
          }
        }

        if (parsedData.length === 0) {
          throw new Error("No valid subscribers found in CSV.");
        }

        setGryphLifeParsedData(parsedData);
      } catch (error) {
        setGryphLifeParseError(
          error instanceof Error ? error.message : "Failed to parse CSV",
        );
      }
    };
    reader.readAsText(file);
  };

  const handleGryphLifeImport = () => {
    if (!selectedListId || gryphLifeParsedData.length === 0) return;

    bulkImport.mutate(
      {
        clubId,
        listId: selectedListId,
        subscribers: gryphLifeParsedData,
      },
      {
        onSuccess: () => {
          setIsGryphLifeImportModalOpen(false);
          setGryphLifeParsedData([]);
          setGryphLifeParseError(null);
        },
      },
    );
  };

  const handleEditSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubscriber) return;

    updateSubscriber.mutate({
      clubId,
      subscriberId: editingSubscriber.id,
      name: editingSubscriber.name,
      status: editingSubscriber.status,
    });
  };

  const handleDeleteSubscriber = () => {
    if (!deletingSubscriber) return;

    deleteSubscriber.mutate({
      clubId,
      subscriberId: deletingSubscriber.id,
    });
  };

  const handleChangeStatus = () => {
    if (!changingStatusSubscriber) return;

    changeStatus.mutate({
      clubId,
      subscriberId: changingStatusSubscriber.id,
      status: newStatus,
    });
  };

  const handleExportCSV = async () => {
    const result = await triggerExport();
    if (result.data?.csv) {
      // Create a blob and download
      const blob = new Blob([result.data.csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subscribers-${selectedListId}-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email List Selector and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label
            htmlFor="emailList"
            className="text-sm font-medium text-gray-700"
          >
            Email List:
          </label>
          <select
            id="emailList"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
          >
            {emailLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
                {list.isDefault && " (Default)"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            disabled={!subscribers || subscribers.subscribers.length === 0}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={() => setIsGryphLifeImportModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import from GryphLife
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030]"
          >
            <UserPlus className="h-4 w-4" />
            Add Subscriber
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Subscribers ({subscribers?.subscribers.length ?? 0})
          </h2>
        </div>

        {isLoading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Loading subscribers...
          </div>
        ) : !subscribers || subscribers.subscribers.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">No subscribers yet.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 text-sm font-medium text-[#b1d135] hover:text-[#a0c030]"
            >
              Add your first subscriber
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {subscribers.subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                      {subscriber.name ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (subscriber.status !== "BLOCKED") {
                            setChangingStatusSubscriber({
                              id: subscriber.id,
                              email: subscriber.email,
                              currentStatus: subscriber.status,
                            });
                            setNewStatus(
                              subscriber.status === "BOUNCED"
                                ? "SUBSCRIBED"
                                : subscriber.status,
                            );
                          }
                        }}
                        disabled={subscriber.status === "BLOCKED"}
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          subscriber.status === "SUBSCRIBED"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : subscriber.status === "UNSUBSCRIBED"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              : subscriber.status === "BOUNCED"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "cursor-not-allowed bg-red-100 text-red-800"
                        } ${subscriber.status !== "BLOCKED" ? "cursor-pointer" : ""}`}
                        title={
                          subscriber.status === "BLOCKED"
                            ? "Blocked subscribers cannot have their status changed"
                            : "Click to change status"
                        }
                      >
                        {subscriber.status === "SUBSCRIBED"
                          ? "Active"
                          : subscriber.status === "UNSUBSCRIBED"
                            ? "Unsubscribed"
                            : subscriber.status === "BOUNCED"
                              ? "Bounced"
                              : "Blocked"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingSubscriber({
                              id: subscriber.id,
                              email: subscriber.email,
                              name: subscriber.name,
                              status: subscriber.status,
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="text-[#b1d135] hover:text-[#a0c030]"
                          title="Edit subscriber"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingSubscriber({
                              id: subscriber.id,
                              email: subscriber.email,
                            });
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-700"
                          title="Delete subscriber"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Subscriber Modal */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Add Subscriber
              </DialogTitle>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubscriber} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  placeholder="subscriber@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              {addSubscriber.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {addSubscriber.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addSubscriber.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {addSubscriber.isPending ? "Adding..." : "Add Subscriber"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Import CSV Modal */}
      <Dialog
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Import Subscribers from CSV
              </DialogTitle>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleBulkImport} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="csv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CSV Content
                </label>
                <textarea
                  id="csv"
                  required
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  rows={10}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  placeholder="email,name&#10;john@example.com,John Doe&#10;jane@example.com,Jane Smith"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: email,name (one subscriber per line, first line is
                  header)
                </p>
              </div>

              {bulkImport.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {bulkImport.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bulkImport.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bulkImport.isPending ? "Importing..." : "Import"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Edit Subscriber Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Edit Subscriber
              </DialogTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubscriber} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="edit-email"
                  disabled
                  value={editingSubscriber?.email ?? ""}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editingSubscriber?.name ?? ""}
                  onChange={(e) =>
                    setEditingSubscriber(
                      editingSubscriber
                        ? { ...editingSubscriber, name: e.target.value }
                        : null,
                    )
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="edit-status"
                  value={editingSubscriber?.status ?? "SUBSCRIBED"}
                  onChange={(e) =>
                    setEditingSubscriber(
                      editingSubscriber
                        ? {
                            ...editingSubscriber,
                            status: e.target.value as
                              | "SUBSCRIBED"
                              | "UNSUBSCRIBED"
                              | "BOUNCED"
                              | "BLOCKED",
                          }
                        : null,
                    )
                  }
                  disabled={editingSubscriber?.status === "BLOCKED"}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="SUBSCRIBED">Active</option>
                  <option value="UNSUBSCRIBED">Unsubscribed</option>
                  {editingSubscriber?.status === "BLOCKED" && (
                    <option value="BLOCKED">Blocked</option>
                  )}
                </select>
                {editingSubscriber?.status === "BLOCKED" && (
                  <p className="mt-1 text-xs text-red-600">
                    Blocked subscribers cannot have their status changed
                  </p>
                )}
              </div>

              {updateSubscriber.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {updateSubscriber.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateSubscriber.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateSubscriber.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* GryphLife Import Modal */}
      <Dialog
        open={isGryphLifeImportModalOpen}
        onClose={() => setIsGryphLifeImportModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Import Subscribers from GryphLife
              </DialogTitle>
              <button
                onClick={() => setIsGryphLifeImportModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400" />
                <div className="ml-3 text-sm text-blue-700">
                  <p className="font-medium">How to download your roster:</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5">
                    <li>
                      Go to{" "}
                      <a
                        href={`https://gryphlife.uoguelph.ca/actioncenter/organization/${slug}/roster`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-800 underline hover:text-blue-900"
                      >
                        GryphLife Roster
                      </a>
                    </li>
                    <li>Click &quot;Export Roster&quot;</li>
                    <li>Upload the downloaded CSV file below</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="gryphlife-file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload GryphLife CSV
                </label>
                <input
                  type="file"
                  id="gryphlife-file"
                  accept=".csv"
                  onChange={handleGryphLifeFileUpload}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#b1d135] file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-900 hover:file:bg-[#a0c030]"
                />
              </div>

              {/* Parse Error */}
              {gryphLifeParseError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {gryphLifeParseError}
                </div>
              )}

              {/* Parsed Data Preview */}
              {gryphLifeParsedData.length > 0 && (
                <div className="rounded-md border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      Found {gryphLifeParsedData.length} subscriber(s)
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="sticky top-0 bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Email
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                            Name
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {gryphLifeParsedData.slice(0, 10).map((sub, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {sub.email}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {sub.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {gryphLifeParsedData.length > 10 && (
                      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
                        ... and {gryphLifeParsedData.length - 10} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bulk Import Error */}
              {bulkImport.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {bulkImport.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsGryphLifeImportModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGryphLifeImport}
                  disabled={
                    bulkImport.isPending || gryphLifeParsedData.length === 0
                  }
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {bulkImport.isPending
                    ? "Importing..."
                    : `Import ${gryphLifeParsedData.length} Subscriber(s)`}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Change Status Modal */}
      <Dialog
        open={!!changingStatusSubscriber}
        onClose={() => setChangingStatusSubscriber(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Change Subscriber Status
              </DialogTitle>
              <button
                onClick={() => setChangingStatusSubscriber(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600">
                  Change status for{" "}
                  <span className="font-semibold">
                    {changingStatusSubscriber?.email}
                  </span>
                </p>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  New Status
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) =>
                    setNewStatus(
                      e.target.value as
                        | "SUBSCRIBED"
                        | "UNSUBSCRIBED"
                        | "BOUNCED"
                        | "BLOCKED",
                    )
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                >
                  <option value="SUBSCRIBED">Active</option>
                  <option value="UNSUBSCRIBED">Unsubscribed</option>
                </select>
              </div>

              {changeStatus.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {changeStatus.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setChangingStatusSubscriber(null)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangeStatus}
                  disabled={changeStatus.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {changeStatus.isPending ? "Updating..." : "Update Status"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Delete Subscriber Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Delete Subscriber
              </DialogTitle>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete the subscriber{" "}
                <span className="font-semibold">
                  {deletingSubscriber?.email}
                </span>
                ? This action cannot be undone.
              </p>

              {deleteSubscriber.error && (
                <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {deleteSubscriber.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubscriber}
                  disabled={deleteSubscriber.isPending}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteSubscriber.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
