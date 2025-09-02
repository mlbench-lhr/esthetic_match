// components/common/PageBreadCrumb.tsx
"use client";

import React, { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Text from "../ui/TextUser";
import Input from "../ui/InputUser";
import Button from "../ui/ButtonUser";
import AddDocModal from "../ui/AddDocModal";

interface BreadcrumbProps {
  pageTitle: string;
  total: number;
  defaultSearch?: string;
  pageSize?: string;
  verified?: string; // keep current filter
  addHref?: string; // optional "Add Doctors" link
}

const DEBOUNCE_MS = 400; // adjust to taste; use 0 to disable

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  total,
  defaultSearch = "",
  pageSize = "10",
  verified,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [query, setQuery] = useState(defaultSearch);
  const [isPending, startTransition] = useTransition();
  const [openAdd, setOpenAdd] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = (q: string) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", "1"); // reset page on new search
    params.set("pageSize", pageSize);
    verified ? params.set("verified", verified) : params.delete("verified");
    q ? params.set("q", q) : params.delete("q");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const q = e.target.value;
    setQuery(q);

    // debounce/throttle
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => navigate(q), DEBOUNCE_MS);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      // cancel pending debounce and navigate immediately
      if (timer.current) clearTimeout(timer.current);
      navigate(query);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-3 mt-6 mb-6">
      <div>
        <Text as="h1" className="font-semibold text-primary_black text-xl">
          {pageTitle}
        </Text>
        <p className="text-secondary_black/70 text-sm">
          Total Doctors: {total}
        </p>
      </div>

      <nav>
        <ol className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => setOpenAdd(true)}
            className="bg-secondary hover:bg-secondary/80 rounded-md min-w-[150px] text-white_primary"
          >
            Add Doctors
          </Button>

          <div className="relative">
            <Input
              id="search"
              name="q"
              type="search"
              placeholder="Search..."
              defaultValue={defaultSearch} // avoids hydration mismatch
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="bg-white border-primary_black/10 rounded-md w-[260px] min-w-sm text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {isPending && (
              <span className="top-1/2 right-2 absolute text-gray-500 text-xs -translate-y-1/2">
                searching…
              </span>
            )}
          </div>
        </ol>
      </nav>
      <AddDocModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
};

export default PageBreadcrumb;
