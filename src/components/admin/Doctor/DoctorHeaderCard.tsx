"use client";

import Image from "next/image";
import { cn } from "@/utils";
import Text from "@/components/ui/TextUser";
import Button from "@/components/ui/ButtonUser";
import VerifyButtons from "./VerifyButtons";
import EditNameModal from "./EditNameModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type DoctorHeaderProps = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  addedOn?: Date | string;
  className?: string;
  verified?: number;
  about?: string | null;
  clinicName?: string;
  experienceYears?: number | null;
  ratingValue?: number | null;
  ratingCount?: number | null;
};

function Stars({ value = 0 }: { value?: number | null }) {
  const v = Math.max(0, Math.min(5, Number(value ?? 0)));
  const full = Math.floor(v);
  const half = v - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="inline-flex items-center gap-0.5 align-middle">
      {Array.from({ length: full }).map((_, i) => (
        <Image
          key={`f-${i}`}
          src="/images/admin/doctor/star-full.svg"
          alt=""
          width={14}
          height={14}
        />
      ))}
      {half === 1 && (
        <Image
          src="/images/admin/doctor/star-half.svg"
          alt=""
          width={14}
          height={14}
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Image
          key={`e-${i}`}
          src="/images/admin/doctor/star-empty.svg"
          alt=""
          width={14}
          height={14}
        />
      ))}
    </div>
  );
}

export default function DoctorHeaderCard({
  id,
  name,
  email,
  image,
  addedOn,
  className,
  verified,
  about,
  clinicName,
  experienceYears,
  ratingValue,
  ratingCount,
}: DoctorHeaderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const dateStr =
    addedOn && !isNaN(new Date(addedOn).getTime())
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(addedOn))
      : undefined;

  return (
    <section
      className={cn(
        "bg-tertiary_skin border border-secondary_skin rounded-3xl",
        "p-4 sm:p-5 md:p-6 lg:p-7",
        "w-full",
        className
      )}
    >
      <div
        className={cn(
          "items-center grid w-full",
          "grid-cols-[auto_1fr_auto]",
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

        {/* Name + rating */}
        <div className="pr-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Text as="h3" className="text-primary_black truncate">
              {name}
            </Text>

            {/* Rating */}
            {typeof ratingValue === "number" && (
              <span className="inline-flex items-center gap-1">
                <Stars value={ratingValue} />
                <Text as="p3" className="text-secondary_black/70">
                  ({(ratingCount ?? 0).toLocaleString()})
                </Text>
              </span>
            )}
          </div>

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

          {/* Experience */}
          {typeof experienceYears === "number" && experienceYears > 0 && (
            <div className="mt-2">
              <Text as="p1" className="text-secondary_black/80">
                {experienceYears} {experienceYears === 1 ? "Year" : "Years"} Of
                Experience
              </Text>
            </div>
          )}

          {/* Added on */}
          {dateStr && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Text as="p1" className="text-secondary_black/80">
                Added On:
              </Text>
              <Text as="p1" className="text-primary_black">
                {dateStr}
              </Text>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-row items-start gap-3">
          {verified === 1 ? (
            <div className="flex md:flex-row flex-col items-center gap-3">
              <Button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Edit Profile"
                className="inline-flex justify-center items-center bg-secondary hover:bg-secondary/90 rounded-md w-[100px] h-9 text-white_primary"
              >
                <Image
                  src="/images/admin/doctor/edit.svg"
                  alt="Edit"
                  width={18}
                  height={18}
                />
              </Button>
              <VerifyButtons id={id} />
            </div>
          ) : (
            <Button
              aria-label="Edit Profile"
              className="inline-flex justify-center items-center bg-secondary hover:bg-secondary/90 rounded-xl w-[120px] h-9 text-white_primary"
              onClick={() => setOpen(true)}
            >
              <Image
                src="/images/admin/doctor/edit.svg"
                alt="Edit"
                width={18}
                height={18}
              />
              <Text as="p2" className="ml-2">
                Edit Profile
              </Text>
            </Button>
          )}
        </div>
      </div>

      {/* Edit name modal (existing) */}
      <EditNameModal
        open={open}
        onClose={() => setOpen(false)}
        doctorId={id}
        about={about ?? ""}
        clinicName={clinicName ?? ""}
        image={image ?? undefined}
        onSaved={() => router.refresh()}
      />
    </section>
  );
}
