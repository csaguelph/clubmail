"use client";

import { api } from "@/trpc/react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Edit, ListPlus, Mail, Trash2, Users, X } from "lucide-react";
import { useState } from "react";

interface EmailListsManagerProps {
  clubId: string;
}

export default function EmailListsManager({
  clubId,
}: EmailListsManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [editingList, setEditingList] = useState<{
    id: string;
    name: string;
    description: string | null;
  } | null>(null);
  const [deletingList, setDeletingList] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const utils = api.useUtils();

  const { data: emailLists } = api.emailLists.listLists.useQuery({ clubId });

  if (!emailLists) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading email lists...
      </div>
    );
  }

  const createList = api.emailLists.createList.useMutation({
    onSuccess: () => {
      void utils.emailLists.listLists.invalidate();
      setIsCreateModalOpen(false);
      setNewListName("");
      setNewListDescription("");
    },
  });

  const updateList = api.emailLists.updateList.useMutation({
    onSuccess: () => {
      void utils.emailLists.listLists.invalidate();
      setIsEditModalOpen(false);
      setEditingList(null);
    },
  });

  const deleteList = api.emailLists.deleteList.useMutation({
    onSuccess: () => {
      void utils.emailLists.listLists.invalidate();
      setIsDeleteModalOpen(false);
      setDeletingList(null);
    },
  });

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    createList.mutate({
      clubId,
      name: newListName,
      description: newListDescription || null,
    });
  };

  const handleUpdateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingList) return;

    updateList.mutate({
      clubId,
      listId: editingList.id,
      name: editingList.name,
      description: editingList.description,
    });
  };

  const handleDeleteList = () => {
    if (!deletingList) return;

    deleteList.mutate({
      clubId,
      listId: deletingList.id,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {emailLists.length} {emailLists.length === 1 ? "list" : "lists"}
        </p>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030]"
        >
          <ListPlus className="h-4 w-4" />
          Create List
        </button>
      </div>

      {/* Lists Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emailLists.map((list) => (
          <div
            key={list.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {list.name}
                  </h3>
                  {list.isDefault && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      Default
                    </span>
                  )}
                </div>
                {list.description && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {list.description}
                  </p>
                )}
              </div>
              {!list.isDefault && (
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => {
                      setEditingList({
                        id: list.id,
                        name: list.name,
                        description: list.description,
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-[#b1d135]"
                    title="Edit list"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingList({
                        id: list.id,
                        name: list.name,
                      });
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete list"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{list._count.memberships} subscribers</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{list._count.campaigns} campaigns</span>
              </div>
            </div>

            {list.isDefault && (
              <p className="mt-3 text-xs text-gray-500">
                This is your default list. New subscribers are added here automatically.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Create List Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Create Email List
              </DialogTitle>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateList} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  List Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                  placeholder="e.g., Newsletter Subscribers"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                  placeholder="Describe the purpose of this list..."
                />
              </div>

              {createList.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {createList.error.message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createList.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {createList.isPending ? "Creating..." : "Create List"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Edit List Modal */}
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
                Edit Email List
              </DialogTitle>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateList} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  List Name *
                </label>
                <input
                  type="text"
                  id="edit-name"
                  required
                  value={editingList?.name ?? ""}
                  onChange={(e) =>
                    setEditingList(
                      editingList
                        ? { ...editingList, name: e.target.value }
                        : null
                    )
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (optional)
                </label>
                <textarea
                  id="edit-description"
                  value={editingList?.description ?? ""}
                  onChange={(e) =>
                    setEditingList(
                      editingList
                        ? { ...editingList, description: e.target.value }
                        : null
                    )
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                />
              </div>

              {updateList.error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {updateList.error.message}
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
                  disabled={updateList.isPending}
                  className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateList.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Delete List Modal */}
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
                Delete Email List
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
                Are you sure you want to delete the list{" "}
                <span className="font-semibold">{deletingList?.name}</span>?
                This action cannot be undone.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Note: Subscribers will not be deleted, only the list itself.
              </p>

              {deleteList.error && (
                <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                  {deleteList.error.message}
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
                  onClick={handleDeleteList}
                  disabled={deleteList.isPending}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteList.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
