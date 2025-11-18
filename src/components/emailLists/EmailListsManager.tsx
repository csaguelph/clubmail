"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Edit, ListPlus, Mail, Trash2, Users } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";

interface EmailListsManagerProps {
  clubId: string;
}

export default function EmailListsManager({ clubId }: EmailListsManagerProps) {
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

  if (!emailLists) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading email lists...
      </div>
    );
  }

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
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          size="sm"
        >
          <ListPlus className="h-4 w-4" />
          Create List
        </Button>
      </div>

      {/* Lists Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emailLists.map((list) => (
          <div
            key={list.id}
            className={cn(
              "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-gray-900">
                    {list.name}
                  </h3>
                  {list.isDefault && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      Default
                    </span>
                  )}
                </div>
                {list.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                    {list.description}
                  </p>
                )}
              </div>
              {!list.isDefault && (
                <div className="ml-2 flex items-center gap-1">
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
                    aria-label={`Edit ${list.name}`}
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
                    aria-label={`Delete ${list.name}`}
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
                This is your default list. New subscribers are added here
                automatically.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Create List Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Email List"
        size="md"
      >
        <form onSubmit={handleCreateList}>
          <DialogContent>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                List Name *
              </label>
              <Input
                type="text"
                id="name"
                required
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="e.g., Newsletter Subscribers"
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (optional)
              </label>
              <Textarea
                id="description"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                rows={3}
                className="mt-1"
                placeholder="Describe the purpose of this list..."
              />
            </div>

            {createList.error && (
              <div
                className="rounded-md bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                {createList.error.message}
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createList.isPending}
              variant="primary"
            >
              {createList.isPending ? "Creating..." : "Create List"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Edit List Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Email List"
        size="md"
      >
        <form onSubmit={handleUpdateList}>
          <DialogContent>
            <div>
              <label
                htmlFor="edit-name"
                className="block text-sm font-medium text-gray-700"
              >
                List Name *
              </label>
              <Input
                type="text"
                id="edit-name"
                required
                value={editingList?.name ?? ""}
                onChange={(e) =>
                  setEditingList(
                    editingList
                      ? { ...editingList, name: e.target.value }
                      : null,
                  )
                }
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="edit-description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (optional)
              </label>
              <Textarea
                id="edit-description"
                value={editingList?.description ?? ""}
                onChange={(e) =>
                  setEditingList(
                    editingList
                      ? { ...editingList, description: e.target.value }
                      : null,
                  )
                }
                rows={3}
                className="mt-1"
              />
            </div>

            {updateList.error && (
              <div
                className="rounded-md bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                {updateList.error.message}
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateList.isPending}
              variant="primary"
            >
              {updateList.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Delete List Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Email List"
        size="md"
      >
        <DialogContent>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete the list{" "}
            <span className="font-semibold">{deletingList?.name}</span>? This
            action cannot be undone.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Note: Subscribers will not be deleted, only the list itself.
          </p>

          {deleteList.error && (
            <div
              className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800"
              role="alert"
            >
              {deleteList.error.message}
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteList}
            disabled={deleteList.isPending}
            variant="danger"
          >
            {deleteList.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
