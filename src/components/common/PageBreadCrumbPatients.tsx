"use client";

import React, { useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Text from "../ui/TextUser";
import Input from "../ui/InputUser";

interface BreadcrumbProps {
  pageTitle: string;
  total: number;
  defaultSearch?: string;
  pageSize?: string;
}

const DEBOUNCE_MS = 400;

const PatientBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  total,
  defaultSearch = "",
  pageSize = "10",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [query, setQuery] = useState(defaultSearch);
  const [isPending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = (q: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", "1");
    params.set("pageSize", pageSize);
    q ? params.set("q", q) : params.delete("q");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const q = e.target.value;
    setQuery(q);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => navigate(q), DEBOUNCE_MS);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (timer.current) clearTimeout(timer.current);
      navigate(query);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-6 mb-6">
      <div className="flex-shrink-0">
        <Text as="h1" className="font-semibold text-primary_black text-xl">
          {pageTitle}
        </Text>
        <p className="text-secondary_black/70 text-sm">
          Total Patients: {total}
        </p>
      </div>

      <nav className="flex sm:flex-row flex-col items-stretch sm:items-center gap-3 w-full sm:w-auto">
        {/* no Add button on Patients */}
        <div className="relative sm:w-[220px] min-w-[200px]">
          <Input
            id="search"
            name="q"
            type="search"
            placeholder="Search..."
            defaultValue={defaultSearch}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-white border-primary_black/10 rounded-md w-full text-secondary_black/80 placeholder:text-secondary_black/80"
          />
          {isPending && (
            <span className="top-1/2 right-2 absolute text-gray-500 text-xs -translate-y-1/2 pointer-events-none">
              searching…
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default PatientBreadcrumb;
