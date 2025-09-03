import Image from "next/image";
import { cn } from "@/utils";
import Text from "@/components/ui/TextUser";
import Button from "@/components/ui/ButtonUser";

export type DoctorHeaderProps = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  addedOn?: Date | string;
  className?: string;
  onEditHref?: string;
  onEditClick?: () => void;
  verified?: number; // show extra actions when verified === 1
};

export default function DoctorHeaderCard({
  name,
  email,
  image,
  addedOn,
  className,
  onEditClick,
  verified,
}: DoctorHeaderProps) {
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
        // container
        "bg-tertiary_skin border border-secondary_skin rounded-3xl",
        "p-4 sm:p-5 md:p-6 lg:p-7",
        "w-full",
        className
      )}
    >
      <div
        className={cn(
          "items-center grid w-full",
          // image + content + edit
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

        {/* Name + Email */}
        <div className="pr-2 min-w-0">
          <Text as="h3" className="text-primary_black truncate">
            {name}
          </Text>

          <div className="flex items-center gap-2 mt-2">
            <Image
              src="/images/admin/doctor/email.svg"
              alt="email"
              width={18}
              height={18}
              className="shrink-0"
            />
            <Text
              as="p1"
              className="text-secondary_black/80 truncate"
              //   title={email}
            >
              {email}
            </Text>
          </div>

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

        {/* Actions (right-top) */}
        <div className="flex flex-row items-start gap-3">
          {verified === 1 ? (
            <div className="flex md:flex-row flex-col items-center gap-3">
              <Button
                type="button"
                onClick={onEditClick}
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
              <Button className="bg-black_secondary hover:bg-black_tertiary rounded-md w-full min-w-[100px] text-primary">
                Accept
              </Button>
              <Button className="bg-red hover:bg-black_tertiary rounded-md w-full min-w-[100px] text-primary">
                Reject
              </Button>
            </div>
          ) : (
            <Button
              aria-label="Edit Profile"
              className="inline-flex justify-center items-center bg-secondary hover:bg-secondary/90 rounded-xl w-[120px] h-9 text-white_primary"
              onClick={onEditClick}
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
    </section>
  );
}
