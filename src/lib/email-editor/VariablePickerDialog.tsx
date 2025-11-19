"use client";

import { Dialog, DialogContent } from "@/components/ui";
import { Variable as VariableIcon } from "lucide-react";
import { useState } from "react";

interface Variable {
  name: string;
  placeholder: string;
  description: string;
  category: string;
}

const variables: Variable[] = [
  // Subscriber Information
  {
    name: "Email",
    placeholder: "{{.Email}}",
    description: "Subscriber's email address",
    category: "Subscriber",
  },
  {
    name: "Full Name",
    placeholder: "{{.Name}}",
    description: "Subscriber's full name",
    category: "Subscriber",
  },
  {
    name: "First Name",
    placeholder: "{{.Name.First}}",
    description: "Subscriber's first name",
    category: "Subscriber",
  },
  {
    name: "Last Name",
    placeholder: "{{.Name.Last}}",
    description: "Subscriber's last name",
    category: "Subscriber",
  },
  // Campaign & Club Information
  {
    name: "Club Name",
    placeholder: "{{.Club.Name}}",
    description: "Name of the club",
    category: "Campaign & Club",
  },
  {
    name: "Campaign Name",
    placeholder: "{{.Campaign.Name}}",
    description: "Name of the campaign",
    category: "Campaign & Club",
  },
  {
    name: "Email List Name",
    placeholder: "{{.EmailList.Name}}",
    description: "Name of the email list",
    category: "Campaign & Club",
  },
  // URLs
  {
    name: "Unsubscribe URL",
    placeholder: "{{.UnsubscribeUrl}}",
    description: "URL to unsubscribe from emails",
    category: "URLs",
  },
  {
    name: "Archive URL",
    placeholder: "{{.ArchiveUrl}}",
    description: "URL to view campaign on the web",
    category: "URLs",
  },
  // Date & Time
  {
    name: "Date",
    placeholder: "{{.Date}}",
    description: "Current date (locale formatted)",
    category: "Date & Time",
  },
  {
    name: "Time",
    placeholder: "{{.Time}}",
    description: "Current time (locale formatted)",
    category: "Date & Time",
  },
  {
    name: "Date & Time",
    placeholder: "{{.DateTime}}",
    description: "Current date and time",
    category: "Date & Time",
  },
  {
    name: "Year",
    placeholder: "{{.Year}}",
    description: "Current year",
    category: "Date & Time",
  },
  {
    name: "Month",
    placeholder: "{{.Month}}",
    description: "Current month (1-12)",
    category: "Date & Time",
  },
  {
    name: "Day",
    placeholder: "{{.Day}}",
    description: "Current day of month (1-31)",
    category: "Date & Time",
  },
  // Custom Fields (example)
  {
    name: "Custom Field",
    placeholder: "{{.CustomFields.fieldName}}",
    description: "Access custom subscriber fields",
    category: "Custom Fields",
  },
];

interface VariablePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (placeholder: string) => void;
}

export function VariablePickerDialog({
  isOpen,
  onClose,
  onSelect,
}: VariablePickerDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(variables.map((v) => v.category)));

  const filteredVariables = variables.filter((variable) => {
    const matchesSearch =
      variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variable.placeholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variable.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || variable.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSelect = (placeholder: string) => {
    onSelect(placeholder);
    onClose();
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} title="Insert Variable" size="lg">
      <DialogContent>
        <div className="space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search variables..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
              autoFocus
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedCategory === null
                  ? "bg-[#b1d135] text-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  selectedCategory === category
                    ? "bg-[#b1d135] text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Variable List */}
          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {filteredVariables.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                No variables found
              </p>
            ) : (
              filteredVariables.map((variable) => (
                <button
                  key={variable.placeholder}
                  type="button"
                  onClick={() => handleSelect(variable.placeholder)}
                  className="w-full rounded-md border border-gray-200 bg-white p-3 text-left transition hover:border-[#b1d135] hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <VariableIcon className="h-4 w-4 text-gray-400" />
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {variable.placeholder}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {variable.description}
                      </p>
                    </div>
                    <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {variable.category}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Help Text */}
          <div className="rounded-md bg-blue-50 p-3">
            <p className="text-xs text-blue-800">
              <strong>Tip:</strong> You can add default values using{" "}
              <code className="rounded bg-blue-100 px-1 py-0.5 font-mono text-xs">
                {'{{.Variable || "default"}}'}
              </code>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
