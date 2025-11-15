"use client";

import { api } from "@/trpc/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Upload, UserPlus, X } from "lucide-react";
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
  emailLists,
}: SubscribersListProps) {
  const [selectedListId, setSelectedListId] = useState(
    emailLists.find((l) => l.isDefault)?.id || emailLists[0]?.id || ""
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [csvContent, setCsvContent] = useState("");

  const utils = api.useUtils();

  const { data: subscribers, isLoading } = api.subscribers.listSubscribers.useQuery(
    {
      clubId,
      listId: selectedListId || undefined,
      limit: 100,
    },
    {
      enabled: !!selectedListId,
    }
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
    const subscribersData = lines.slice(1).map((line) => {
      const [email, name] = line.split(",").map((s) => s.trim());
      return { email: email || "", name };
    }).filter((s) => s.email); // Filter out empty emails

    bulkImport.mutate({
      clubId,
      listId: selectedListId,
      subscribers: subscribersData,
    });
  };

  return (
    <div className="space-y-6">
      {/* Email List Selector and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label htmlFor="emailList" className="text-sm font-medium text-gray-700">
            Email List:
          </label>
          <select
            id="emailList"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
            Subscribers ({subscribers?.subscribers.length || 0})
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Subscribed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {subscribers.subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {subscriber.name || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          subscriber.status === "SUBSCRIBED"
                            ? "bg-green-100 text-green-800"
                            : subscriber.status === "UNSUBSCRIBED"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subscriber.status === "SUBSCRIBED"
                          ? "Active"
                          : subscriber.status === "UNSUBSCRIBED"
                            ? "Unsubscribed"
                            : "Bounced"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                  placeholder="email,name&#10;john@example.com,John Doe&#10;jane@example.com,Jane Smith"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: email,name (one subscriber per line, first line is header)
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
    </div>
  );
}
