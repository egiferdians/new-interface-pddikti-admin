import { h } from "preact";
import { Button } from "@/components/ui/Button"; // pastikan huruf besar B sesuai file
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export default function PageHeader({
  icon = "User", // default string icon name
  title,
  subtitle,
  actions = [],
}) {
  const Icon = Icons[icon] || Icons.User;

  return (
    <header class="w-full bg-white shadow-sm rounded-lg p-4 mb-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div class="flex items-center sm:items-start gap-3">
          <div class="p-2 bg-gray-100 rounded-xl">
            <Icon class="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h1
                class={`text-xl font-semibold text-gray-800 ${subtitle ? "" : "mt-1"}`}
            >
                {title}
            </h1>
            {subtitle && (
              <p class="text-sm text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          {actions.map((action, idx) => {
            const ActionIcon = action.icon ? Icons[action.icon] : null;
            return (
              <Button
                key={idx}
                onClick={action.onClick}
                class={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg shadow-sm",
                  action.variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-600 text-blue hover:bg-gray-300"
                )}
              >
                {ActionIcon && <ActionIcon class="w-4 h-4" />}
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
