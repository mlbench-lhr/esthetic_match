import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="font-medium text-gray-800 text-base">{title}</h3>
        {desc && <p className="mt-1 text-gray-500 text-sm">{desc}</p>}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 border-gray-100 dark:border-gray-800 border-t">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
