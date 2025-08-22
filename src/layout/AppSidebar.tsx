"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { UserContext } from "@/context/UserContext";
import { useSidebar } from "@/context/SidebarContext";
import CloseButton from "@/components/ui/CloseButton";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

interface User {
  username: string;
  email: string;
}

const navItems: NavItem[] = [
  {
    icon: (
      <Image
        src="/images/sidebar/dashboard.svg"
        alt="Dashboard"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/dashboard.svg"
        alt="Dashboard Active"
        width={24}
        height={24}
      />
    ),
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: (
      <Image
        src="/images/sidebar/allpatients.svg"
        alt="All Patients"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/allpatients.svg"
        alt="All Patients Active"
        width={24}
        height={24}
      />
    ),
    name: "All Patients",
    path: "/admin/allpatients",
  },
  {
    icon: (
      <Image
        src="/images/sidebar/alldoctors.svg"
        alt="All Doctors"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/alldoctors.svg"
        alt="All Doctors Active"
        width={24}
        height={24}
      />
    ),
    name: "All Doctors",
    path: "/admin/alldoctors",
  },
  {
    icon: (
      <Image
        src="/images/sidebar/promocode.svg"
        alt="Promo Code"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/promocode.svg"
        alt="Promo Code Active"
        width={24}
        height={24}
      />
    ),
    name: "Promo Code",
    path: "/admin/promocode",
  },
  {
    icon: (
      <Image
        src="/images/sidebar/revenue.svg"
        alt="Total Revenue"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/revenue.svg"
        alt="Total Revenue Active"
        width={24}
        height={24}
      />
    ),
    name: "Total Revenue",
    path: "/admin/totalrevenue",
  },
  {
    icon: (
      <Image
        src="/images/sidebar/reviews.svg"
        alt="Reported Reviews"
        width={24}
        height={24}
      />
    ),
    iconActive: (
      <Image
        src="/images/sidebar/active/reviews.svg"
        alt="Reported Reviews Active"
        width={24}
        height={24}
      />
    ),
    name: "Reported Reviews",
    path: "/admin/reportedreviews",
  },
];

const othersItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();
  const pathname = usePathname();
  // const { user } = useContext(UserContext);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => {
      if (!path) return false;
      return pathname === path || pathname === `${path}/`;
    },
    [pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main",
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    othersItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "others",
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  // Close mobile sidebar when clicking on a link
  const handleLinkClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4 font-raleway">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group w-full flex items-center justify-center gap-4 p-3 transition-colors cursor-pointer hover:bg-[#16263D99] rounded-lg ${
                !isExpanded && !isHovered && !isMobileOpen
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`transition-all duration-200 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-primary"
                    : "text-[#F4E9DC99]"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`font-medium transition-colors ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "text-primary"
                      : "text-[#F4E9DC99]"
                  }`}
                >
                  {nav.name}
                </span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                onClick={handleLinkClick}
                className={`group flex items-center gap-4 w-full p-3 transition-colors rounded-lg ${
                  !isExpanded && !isHovered && !isMobileOpen
                    ? "lg:justify-center"
                    : "lg:justify-start"
                } hover:bg-[#16263D99] ${
                  isActive(nav.path) ? "bg-primary/5" : ""
                }`}
              >
                <span className="transition-all duration-200">
                  {isActive(nav.path) ? nav.iconActive : nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span
                    className={`font-medium transition-colors ${
                      isActive(nav.path) ? "text-primary" : "text-[#F4E9DC99]"
                    }`}
                  >
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="space-y-1 mt-2 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-[#16263D99] rounded-md ${
                        isActive(subItem.path) ? "bg-gray-50" : ""
                      }`}
                    >
                      <span
                        className={`${
                          isActive(subItem.path)
                            ? "text-primary font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {subItem.name}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              isActive(subItem.path)
                                ? "bg-primary/10 text-primary"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              isActive(subItem.path)
                                ? "bg-primary/10 text-primary"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed flex flex-col top-0 left-0 bg-[#16263D] text-[#F4E9DC] h-screen transition-all duration-300 ease-in-out z-40 border-r border-gray-200 
        ${
          isMobileOpen
            ? "w-[290px] translate-x-0"
            : isExpanded || isHovered
            ? "w-[290px] lg:translate-x-0"
            : "w-[90px] lg:translate-x-0"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        px-5`}
      onMouseEnter={() => !isExpanded && !isMobileOpen && setIsHovered(true)}
      onMouseLeave={() => !isMobileOpen && setIsHovered(false)}
    >
      {/* Header with Logo and Close Button */}
      <div className="flex justify-center items-center py-8">
        <div
          className={`flex ${
            !isExpanded && !isHovered && !isMobileOpen
              ? "lg:justify-center"
              : "justify-start"
          }`}
        >
          <Link href="/admin/dashboard" onClick={handleLinkClick}>
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                <Image
                  className="dark:hidden ml-3"
                  src="/images/mainlogo.svg"
                  alt="Esthetic Match Logo"
                  width={30}
                  height={40}
                />
                <Image
                  className="hidden dark:block ml-3 fl"
                  src="/images/sidebar/mainlogo.svg"
                  alt="Esthetic Match Logo"
                  width={85}
                  height={90}
                />
              </>
            ) : (
              <Image
                className="ml-2"
                src="/images/mainlogo.svg"
                alt="Esthetic Match Logo"
                width={85}
                height={90}
              />
            )}
          </Link>
        </div>
      </div>
      <CloseButton />

      {/* Navigation Content */}
      <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="flex-1">
          <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col justify-center items-center gap-2">
              {renderMenuItems(navItems, "main")}
              {othersItems.length > 0 && renderMenuItems(othersItems, "others")}
            </div>

            {/* User Profile Section */}
            {/* <div className="mt-auto pb-4">
              <div
                className={`flex items-center gap-3 p-3 transition-colors hover:bg-gray-50 rounded-lg ${
                  !isExpanded && !isHovered && !isMobileOpen
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <div className="flex flex-shrink-0 justify-center items-center bg-primary rounded-full w-8 h-8">
                  <span className="font-semibold text-white text-lg">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">
                        {user?.username
                          ? user.username.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                    )}
                  </span>
                </div>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-gray-900 truncate">
                      {user ? user.username : ""}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      {user ? user.email : ""}
                    </span>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
