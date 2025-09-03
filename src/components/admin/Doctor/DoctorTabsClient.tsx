"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DoctorTabs from "./DoctorTabs";
import React from "react";

type DoctorTabsProps = React.ComponentProps<typeof DoctorTabs>;

export default function DoctorTabsClient(
  props: Omit<DoctorTabsProps, "onPageChange">
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (p: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(p));
    params.set("pageSize", String(props.pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  return <DoctorTabs {...props} onPageChange={onPageChange} />;
}
