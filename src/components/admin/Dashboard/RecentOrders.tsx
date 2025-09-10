import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { getRecentPatients } from "@/lib/data/patients";

function fmtDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(dt);
}

export default async function RecentOrders() {
  const users = await getRecentPatients(5);
  return (
    <div className="bg-white dark:bg-white/[0.03] px-4 sm:px-6 pt-4 pb-3 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white/90 text-lg">
            Recent Added Users
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 border-y dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Added On
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-6 text-gray-500 dark:text-gray-400 text-center"
                >
                  No recent users
                </TableCell>
              </TableRow>
            )}
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-full w-[40px] h-[40px] overflow-hidden">
                      <Image
                        width={40}
                        height={40}
                        src={u.image || "/images/userImage.svg"}
                        className="w-[40px] h-[40px] object-cover"
                        alt={u.userName}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {u.userName}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        #{u.id.slice(-5)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {u.email}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {fmtDate(u.createdAt)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Link
                    href={`/admin/allpatients/${u.id}`}
                    className="text-primary underline underline-offset-2"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
