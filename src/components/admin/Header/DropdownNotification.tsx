"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/components/admin/Header/DropdownNotifications.css";
import { formatDistanceToNowStrict } from "date-fns";
import { useNotification } from "@/context/NotificationContext";
import Text from "@/components/ui/TextUser";
import ClickOutside from "../ClickOutside";

interface Notification {
  message: string;
  user_name?: string;
  email?: string;
  image?: string | null;
  type?: string;
  isReadable?: boolean;
  createdAt?: string;
}

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isActive } = useNotification();

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const res = await axios.get("/api/admin/get-notifications");
  //       const all = res.data.allNotifications || [];
  //       setNotifications(all);
  //       const hasUnread = all.some((n: any) => !n.isReadable);
  //       setNotifying(hasUnread);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  // const handleNotificationsClick = async () => {
  //   setDropdownOpen(!dropdownOpen);

  //   if (notifying) {
  //     try {
  //       await axios.put("/api/admin/mark-notifications");
  //       setNotifying(false);
  //     } catch (error) {
  //       console.error("Error updating isNewNotification:", error);
  //     }
  //   }
  // };
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)}>
      <li className="relative">
        <Link
          // onClick={handleNotificationsClick}
          href="#"
          className="relative flex justify-center items-center rounded-full w-8.5 h-8.5"
        >
          {isActive && notifying && (
            <span className="-top-0.5 right-[4px] z-1 absolute bg-accent rounded-full w-2 h-2">
              <span className="inline-flex -z-1 absolute bg-accent opacity-75 rounded-full w-full h-full animate-ping"></span>
            </span>
          )}
          <Image
            src="/images/admin/header/notification.svg"
            alt="notifications"
            width={24}
            height={24}
          />
        </Link>
        {dropdownOpen && (
          <div className="right-1 sm:right-1 lg:right-1 2xl:right-1 xl:right-1 absolute flex flex-col bg-[#2B2B31] shadow-default mt-1 px-5 rounded-sm w-75 sm:w-[550px] h-[92.2vh]">
            <div className="px-4.5 py-3">
              <Text as="h2" className="font-semibold text-white">
                Notifications
              </Text>
            </div>
            <ul className="flex flex-col pb-7 h-auto overflow-y-auto modal-body-custom">
              {notifications?.map((data, index) => {
                const styledMessage = data.message.replace(
                  /<b>(.*?)<\/b>/g,
                  '<b style="color: #FFFFFF;">$1</b>'
                );

                return (
                  <li key={index}>
                    <div className="flex flex-col gap-2.5 hover:bg-gray-2 dark:hover:bg-meta-4 px-4.5 py-3 border-stroke dark:border-strokedark">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 rounded-full w-[45px] h-[45px] overflow-hidden">
                          <Image
                            src={
                              data?.image ? data.image : "/images/userImage.svg"
                            }
                            width={60}
                            height={60}
                            alt="userImage"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col">
                          <Text
                            as="p"
                            className="font-medium text-[#FFFFFF5C] text-[16px] sm:text-[17px]"
                            dangerouslySetInnerHTML={{ __html: styledMessage }}
                          />
                          <Text className="text-[#FFFFFF5C] text-[15px]">
                            {data.createdAt
                              ? formatDistanceToNowStrict(
                                  new Date(data.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )
                              : "Unknown time"}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
