"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select } from "@/components/ui";
import {
  Crown,
  Edit,
  Edit3,
  Eye,
  Shield,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ClubStaffManagerProps {
  clubId: string;
  currentUserId: string;
}

type ClubRole = "CLUB_OWNER" | "CLUB_EDITOR" | "CLUB_VIEWER";

const ROLE_INFO: Record<
  ClubRole,
  { label: string; icon: React.ReactNode; color: string; description: string }
> = {
  CLUB_OWNER: {
    label: "Owner",
    icon: <Crown className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    description:
      "Full access - can manage staff, settings, campaigns, and subscribers",
  },
  CLUB_EDITOR: {
    label: "Editor",
    icon: <Edit3 className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Can create campaigns, manage subscribers, and edit settings",
  },
  CLUB_VIEWER: {
    label: "Viewer",
    icon: <Eye className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    description: "Read-only access to view campaigns and subscribers",
  },
};

export default function ClubStaffManager({
  clubId,
  currentUserId,
}: ClubStaffManagerProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<ClubRole>("CLUB_EDITOR");
  const [editingStaff, setEditingStaff] = useState<{
    userId: string;
    name: string;
    email: string;
    currentRole: ClubRole;
    newRole: ClubRole;
  } | null>(null);
  const [removingStaff, setRemovingStaff] = useState<{
    userId: string;
    name: string;
    email: string;
    role: ClubRole;
  } | null>(null);

  const utils = api.useUtils();

  const { data: staffMembers, isLoading } =
    api.clubMembers.listMembers.useQuery({ clubId });

  const addStaff = api.clubMembers.addMember.useMutation({
    onSuccess: () => {
      void utils.clubMembers.listMembers.invalidate();
      setIsAddModalOpen(false);
      setNewEmail("");
      setNewRole("CLUB_EDITOR");
    },
  });

  const updateRole = api.clubMembers.updateMemberRole.useMutation({
    onSuccess: () => {
      void utils.clubMembers.listMembers.invalidate();
      setIsEditModalOpen(false);
      setEditingStaff(null);
    },
  });

  const removeStaff = api.clubMembers.removeMember.useMutation({
    onSuccess: () => {
      void utils.clubMembers.listMembers.invalidate();
      setIsRemoveModalOpen(false);
      setRemovingStaff(null);
    },
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff.mutate({
      clubId,
      userEmail: newEmail,
      role: newRole,
    });
  };

  const handleUpdateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    updateRole.mutate({
      clubId,
      userId: editingStaff.userId,
      role: editingStaff.newRole,
    });
  };

  const handleRemoveStaff = () => {
    if (!removingStaff) return;

    removeStaff.mutate({
      clubId,
      userId: removingStaff.userId,
    });
  };

  const ownerCount =
    staffMembers?.filter((m) => m.role === "CLUB_OWNER").length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {staffMembers?.length ?? 0} staff{" "}
          {staffMembers?.length === 1 ? "member" : "members"}
        </p>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="sm"
        >
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Role Legend */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Shield className="h-4 w-4" />
          Role Permissions
        </h3>
        <div className="grid gap-2 md:grid-cols-3">
          {Object.entries(ROLE_INFO).map(([role, info]) => (
            <div key={role} className="flex items-start gap-2">
              <div className={cn("mt-0.5 rounded-md border p-1.5", info.color)}>
                {info.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {info.label}
                </div>
                <div className="text-xs text-gray-600">{info.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Staff Members</h2>
        </div>

        {isLoading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Loading staff members...
          </div>
        ) : !staffMembers || staffMembers.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">No staff members yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Staff Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {staffMembers.map((member) => {
                  const roleInfo = ROLE_INFO[member.role as ClubRole];
                  const isCurrentUser = member.userId === currentUserId;
                  const isLastOwner =
                    member.role === "CLUB_OWNER" && ownerCount <= 1;

                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b1d135] text-sm font-semibold text-gray-900">
                            {member.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {member.user.name}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-gray-500">
                                  (You)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                        {member.user.email}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold",
                            roleInfo.color,
                          )}
                        >
                          {roleInfo.icon}
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingStaff({
                                userId: member.userId,
                                name: member.user.name,
                                email: member.user.email,
                                currentRole: member.role as ClubRole,
                                newRole: member.role as ClubRole,
                              });
                              setIsEditModalOpen(true);
                            }}
                            disabled={isCurrentUser}
                            className={cn(
                              "text-[#b1d135] hover:text-[#a0c030]",
                              "disabled:cursor-not-allowed disabled:opacity-50",
                            )}
                            title={
                              isCurrentUser
                                ? "Cannot change your own role"
                                : "Change role"
                            }
                            aria-label={`Change role for ${member.user.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setRemovingStaff({
                                userId: member.userId,
                                name: member.user.name,
                                email: member.user.email,
                                role: member.role as ClubRole,
                              });
                              setIsRemoveModalOpen(true);
                            }}
                            disabled={isCurrentUser || isLastOwner}
                            className={cn(
                              "text-red-600 hover:text-red-700",
                              "disabled:cursor-not-allowed disabled:opacity-50",
                            )}
                            title={
                              isCurrentUser
                                ? "Cannot remove yourself"
                                : isLastOwner
                                  ? "Cannot remove the last owner"
                                  : "Remove staff member"
                            }
                            aria-label={`Remove ${member.user.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Staff Member"
        size="md"
      >
        <form onSubmit={handleAddStaff}>
          <DialogContent>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="staff@example.com"
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">
                If the user doesn&apos;t have an account, they&apos;ll be
                invited to sign up.
              </p>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role *
              </label>
              <Select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as ClubRole)}
                className="mt-1"
              >
                {Object.entries(ROLE_INFO).map(([role, info]) => (
                  <option key={role} value={role}>
                    {info.label} - {info.description}
                  </option>
                ))}
              </Select>
            </div>

            {addStaff.error && (
              <div
                className="rounded-md bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                {addStaff.error.message}
              </div>
            )}
          </DialogContent>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addStaff.isPending}
              variant="primary"
            >
              {addStaff.isPending ? "Adding..." : "Add Staff Member"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Change Staff Role"
        size="md"
      >
        <form onSubmit={handleUpdateRole}>
          <DialogContent>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Staff Member
              </label>
              <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                <div className="text-sm font-medium text-gray-900">
                  {editingStaff?.name}
                </div>
                <div className="text-xs text-gray-600">
                  {editingStaff?.email}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="edit-role"
                className="block text-sm font-medium text-gray-700"
              >
                New Role *
              </label>
              <Select
                id="edit-role"
                value={editingStaff?.newRole ?? ""}
                onChange={(e) =>
                  setEditingStaff(
                    editingStaff
                      ? {
                          ...editingStaff,
                          newRole: e.target.value as ClubRole,
                        }
                      : null,
                  )
                }
                className="mt-1"
              >
                {Object.entries(ROLE_INFO).map(([role, info]) => (
                  <option key={role} value={role}>
                    {info.label} - {info.description}
                  </option>
                ))}
              </Select>
            </div>

            {updateRole.error && (
              <div
                className="rounded-md bg-red-50 p-3 text-sm text-red-800"
                role="alert"
              >
                {updateRole.error.message}
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
              disabled={updateRole.isPending}
              variant="primary"
            >
              {updateRole.isPending ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Remove Staff Modal */}
      <Dialog
        open={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        title="Remove Staff Member"
        size="md"
      >
        <DialogContent>
          <p className="text-sm text-gray-600">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{removingStaff?.name}</span> from
            the club staff?
          </p>
          <p className="mt-2 text-sm text-gray-600">
            They will lose all access to club management features.
          </p>

          {removeStaff.error && (
            <div
              className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800"
              role="alert"
            >
              {removeStaff.error.message}
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => setIsRemoveModalOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemoveStaff}
            disabled={removeStaff.isPending}
            variant="danger"
          >
            {removeStaff.isPending ? "Removing..." : "Remove Staff Member"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
