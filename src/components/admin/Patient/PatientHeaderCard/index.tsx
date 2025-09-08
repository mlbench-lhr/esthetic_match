"use client";

import Image from "next/image";
import Text from "@/components/ui/TextUser";
import { cn } from "@/utils";

export type PatientHeaderProps = {
  name: string;
  email: string;
  image?: string | null;
  location?: string;
  dob?: Date | string | null;
  addedOn?: Date | string | null;
  className?: string;
};

function fmtDate(d?: Date | string | null, opts?: Intl.DateTimeFormatOptions) {
  if (!d) return undefined;
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-US", opts).format(dt);
}

export default function PatientHeaderCard({
  name,
  email,
  image,
  location,
  dob,
  addedOn,
  className,
}: PatientHeaderProps) {
  const addedStr = fmtDate(addedOn, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // show DOB as DD-MM-YYYY like your mock
  const dobStr = (() => {
    const dt = new Date(dob || "");
    if (isNaN(dt.getTime())) return undefined;
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  })();

  return (
    <section
      className={cn(
        "bg-tertiary_skin border border-secondary_skin rounded-3xl",
        "p-4 sm:p-5 md:p-6 lg:p-7 w-full",
        className
      )}
    >
      <div
        className={cn(
          "items-center grid w-full",
          "grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto]",
          "gap-4 sm:gap-5 md:gap-6"
        )}
      >
        {/* Avatar */}
        <div className="row-span-2 sm:row-span-1">
          <div className="rounded-md w-[64px] sm:w-[80px] md:w-[96px] h-[64px] sm:h-[80px] md:h-[96px] overflow-hidden">
            <Image
              src={image || "/images/admin/doctor/user.svg"}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Left block: name + contact + location */}
        <div className="pr-2 min-w-0">
          <Text as="h3" className="text-primary_black truncate">
            {name}
          </Text>

          {/* Email */}
          <div className="flex items-center gap-2 mt-2">
            <Image
              src="/images/admin/doctor/email.svg"
              alt="email"
              width={18}
              height={18}
              className="shrink-0"
            />
            <Text as="p1" className="text-secondary_black/80 truncate">
              {email}
            </Text>
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 mt-2">
              <Image
                src="/images/admin/doctor/location.svg"
                alt="location"
                width={18}
                height={18}
                className="shrink-0"
              />
              <Text as="p1" className="text-secondary_black/80 truncate">
                {location}
              </Text>
            </div>
          )}

          {/* DOB */}
          {dobStr && (
            <div className="mt-2">
              <Text as="p1" className="text-secondary_black/80">
                <span className="font-semibold">DOB:</span> {dobStr}
              </Text>
            </div>
          )}

          {/* Added on */}
          {addedStr && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Text as="p1" className="text-secondary_black/80">
                Added On:
              </Text>
              <Text as="p1" className="text-primary_black">
                {addedStr}
              </Text>
            </div>
          )}
        </div>

        {/* right column intentionally empty — no buttons */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
}
