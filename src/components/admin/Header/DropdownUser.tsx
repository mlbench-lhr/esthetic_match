"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/admin/ClickOutside";
import { useNotification } from "@/context/NotificationContext";
import Button from "@/components/ui/ButtonUser";
import Text from "@/components/ui/TextUser";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { ClipLoader } from "react-spinners";
import Input from "@/components/ui/InputUser";
import Label from "@/components/ui/Label";
const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isActive, toggleNotifications } = useNotification();
  const [userData, setUserData] = useState({
    username: "Ali Ahmed",
    email: "ali.ahmed@example.com",
    image: "", // leave empty string if no profile picture
  });

  const handleLogoutClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onEditClose = () => {
    setIsEditOpen(false);
  };

  const handleChangePassword = () => {
    setPasswordOpen(true);
  };

  const onPasswordClose = () => {
    setPasswordOpen(false);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="text-left">
            <span className="block font-medium text-[20px] text-black">
              {userData?.username}
            </span>
          </span>

          {userData?.image ? (
            <div className="flex-shrink-0 rounded-full w-[44px] h-[44px] overflow-hidden">
              <Image
                width={44}
                height={44}
                src={userData?.image ?? "/images/admin/header/user.svg"}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center bg-[#F2F2F2] rounded-full w-[44px] h-[44px] font-bold text-[#266CA8] text-[26.86px]">
              {userData?.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <svg
            style={{
              transform: dropdownOpen ? "rotate(360deg)" : "rotate(270deg)",
            }}
            className="hidden sm:block fill-current transition-transform duration-300"
            width="12"
            height="14"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill="#000000"
            />
          </svg>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.4,
              }}
              className="right-0 absolute flex flex-col bg-[#2B2B31] shadow-default mt-4 rounded-sm w-72"
            >
              <div className="flex flex-col justify-center items-center py-3">
                <span className="rounded-full w-[55px] h-[55px] text-center">
                  {userData?.image ? (
                    <Image
                      width={35}
                      height={35}
                      className="rounded-full w-full h-full object-cover"
                      src={userData?.image ?? "/images/admin/header/user.svg"}
                      alt="User"
                    />
                  ) : (
                    <div className="flex justify-center items-center bg-[#F2F2F2] rounded-full w-[55px] h-[55px] font-semibold text-[#266CA8] text-[38px]">
                      {userData?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </span>
                <span className="lg:block mt-3 text-center">
                  <span className="block font-semibold text-[20px] text-white">
                    {userData?.username}
                  </span>
                  <span className="block font-normal text-[#FFFFFF99] text-base text-center">
                    {userData?.email}
                  </span>
                </span>
              </div>
              <ul className="flex flex-col gap-4 px-5 py-5 border-[#FFFFFF1A] border-t">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 font-medium text-[14px] hover:text-[#A8E543] lg:text-base duration-300 ease-in-out cursor-pointer"
                    onClick={handleEditClick}
                  >
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.60938 22.4318C5.60938 22.0601 5.91067 21.7589 6.28233 21.7589H20.6387C21.0104 21.7589 21.3116 22.0601 21.3116 22.4318C21.3116 22.8035 21.0104 23.1048 20.6387 23.1048H6.28233C5.91067 23.1048 5.60938 22.8035 5.60938 22.4318Z"
                        fill="#FFFFFF99"
                      />
                      <path
                        d="M12.179 16.8867C12.4074 16.7086 12.6145 16.5014 13.0288 16.0871L18.3377 10.7783C17.6152 10.4775 16.7594 9.98356 15.95 9.1742C15.1405 8.36472 14.6465 7.50879 14.3458 6.78618L9.03683 12.0952L9.0368 12.0952C8.62253 12.5095 8.41538 12.7166 8.23723 12.945C8.02708 13.2144 7.84691 13.506 7.6999 13.8144C7.57528 14.0759 7.48265 14.3538 7.29737 14.9097L6.32033 17.8408C6.22916 18.1143 6.30035 18.4159 6.50423 18.6198C6.70811 18.8236 7.00968 18.8948 7.28321 18.8036L10.2143 17.8266C10.7701 17.6413 11.0481 17.5487 11.3095 17.4241C11.618 17.2771 11.9095 17.0969 12.179 16.8867Z"
                        fill="#FFFFFF99"
                      />
                      <path
                        d="M19.8108 9.30512C20.9132 8.20276 20.9132 6.41549 19.8108 5.31313C18.7085 4.21077 16.9212 4.21077 15.8189 5.31313L15.1821 5.94986C15.1908 5.97619 15.1999 6.00289 15.2093 6.02993C15.4427 6.70262 15.883 7.58447 16.7114 8.41284C17.5397 9.24122 18.4216 9.68156 19.0943 9.91495C19.1212 9.92429 19.1478 9.93329 19.174 9.94197L19.8108 9.30512Z"
                        fill="#FFFFFF99"
                      />
                    </svg>
                    Edit Profile
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 font-medium hover:text-[#A8E543] text-sm lg:text-base duration-300 ease-in-out cursor-pointer"
                  onClick={handleChangePassword}
                >
                  <svg
                    width="27"
                    height="28"
                    viewBox="0 0 27 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.40246 12.334V10.4905C7.40246 7.14549 10.1141 4.43386 13.4591 4.43386C16.804 4.43386 19.5156 7.14549 19.5156 10.4905V12.334C20.5159 12.4087 21.1672 12.5973 21.6434 13.0734C22.4318 13.8618 22.4318 15.1308 22.4318 17.6686C22.4318 20.2065 22.4318 21.4754 21.6434 22.2639C20.855 23.0523 19.586 23.0523 17.0481 23.0523H9.86996C7.33209 23.0523 6.06316 23.0523 5.27474 22.2639C4.48633 21.4754 4.48633 20.2065 4.48633 17.6686C4.48633 15.1308 4.48633 13.8618 5.27474 13.0734C5.75086 12.5973 6.40223 12.4087 7.40246 12.334ZM8.74837 10.4905C8.74837 7.88881 10.8574 5.77977 13.4591 5.77977C16.0607 5.77977 18.1697 7.88881 18.1697 10.4905V12.2882C17.8261 12.285 17.4533 12.285 17.0481 12.285H9.86996C9.46483 12.285 9.09204 12.285 8.74837 12.2882V10.4905Z"
                      fill="#FFFFFF99"
                    />
                  </svg>
                  Change Password
                </li>
                <li>
                  <div className="flex justify-between items-center gap-2 font-medium text-sm lg:text-base duration-300 ease-in-out">
                    <div className="flex items-center gap-2">
                      <Image
                        width={29}
                        height={30}
                        src="/images/admin/header/Bell1.svg"
                        alt="bell"
                        style={{ width: "auto", height: "auto" }}
                      />
                      Enable Notifications
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={isActive}
                        onChange={toggleNotifications}
                      />
                      <div className="peer after:top-[2px] after:absolute relative bg-gray-200 after:bg-white dark:bg-gray-700 dark:peer-checked:bg-[#A8E543] peer-checked:bg-[#A8E543] after:border after:border-gray-300 dark:border-gray-600 peer-checked:after:border-white rounded-full after:rounded-full peer-focus:outline-none dark:peer-focus:ring-blue-800 peer-focus:ring-blue-300 w-11 after:w-5 h-6 after:h-5 after:content-[''] after:transition-all rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full after:start-[2px]"></div>
                    </label>
                  </div>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 font-medium hover:text-[#A8E543] text-sm lg:text-base duration-300 ease-in-out"
                  >
                    <svg
                      width="27"
                      height="28"
                      viewBox="0 0 27 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5006 13.4442C17.64 13.5717 17.7194 13.752 17.7194 13.9409C17.7194 14.1298 17.64 14.3101 17.5006 14.4376L13.575 18.0267C13.3007 18.2774 12.875 18.2584 12.6243 17.9841C12.3735 17.7098 12.3925 17.2841 12.6668 17.0333L15.3131 14.6139L5.38194 14.6139C5.01028 14.6139 4.70898 14.3126 4.70898 13.9409C4.70898 13.5692 5.01028 13.2679 5.38194 13.2679L15.3131 13.2679L12.6668 10.8485C12.3925 10.5977 12.3735 10.172 12.6243 9.89772C12.875 9.62343 13.3007 9.60437 13.575 9.85515L17.5006 13.4442Z"
                        fill="#A8E543"
                      />
                      <path
                        d="M16.1492 21.3434C15.7775 21.3434 15.4763 21.6447 15.4763 22.0164C15.4763 22.388 15.7775 22.6893 16.1492 22.6893L16.1985 22.6893C17.4255 22.6893 18.4146 22.6893 19.1925 22.5848C20.0002 22.4762 20.6802 22.2439 21.2203 21.7038C21.7604 21.1637 21.9927 20.4837 22.1012 19.676C22.2058 18.8981 22.2058 17.9091 22.2058 16.682L22.2058 11.1999C22.2058 9.97275 22.2058 8.98367 22.1012 8.20576C21.9927 7.39812 21.7604 6.7181 21.2203 6.17801C20.6802 5.63793 20.0002 5.40563 19.1925 5.29705C18.4146 5.19246 17.4255 5.19248 16.1984 5.19249L16.1492 5.19249C15.7775 5.19249 15.4763 5.49379 15.4763 5.86545C15.4763 6.23711 15.7775 6.5384 16.1492 6.5384C17.4372 6.5384 18.3354 6.53983 19.0132 6.63096C19.6716 6.71947 20.0203 6.88138 20.2686 7.12972C20.5169 7.37805 20.6788 7.7267 20.7673 8.3851C20.8585 9.06285 20.8599 9.96113 20.8599 11.2491L20.8599 16.6327C20.8599 17.9207 20.8585 18.819 20.7673 19.4967C20.6788 20.1551 20.5169 20.5038 20.2686 20.7521C20.0203 21.0004 19.6716 21.1623 19.0132 21.2509C18.3354 21.342 17.4372 21.3434 16.1492 21.3434Z"
                        fill="#A8E543"
                      />
                    </svg>
                    Logout
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </ClickOutside>
      {/* edit profile */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} buttonContent="">
        <form
        // onSubmit={handleSubmit1}
        >
          {loading && (
            <div className="z-[100000] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="flex flex-col justify-start items-center gap-3">
            <div className="flex justify-start items-center mb-4 w-full">
              <Text
                as="h3"
                className="flex-grow font-semibold text-white text-start"
              >
                Edit Profile
              </Text>
            </div>
            <div className="flex justify-start w-full">
              <div className="relative cursor-pointer">
                <Image
                  src="/images/userImage.svg"
                  alt="userImage"
                  className="rounded-full w-36 h-36 object-cover"
                  onClick={handleImageClick}
                  width={200}
                  height={200}
                />
                <Image
                  src="/images/admin/header/editIcon.svg"
                  alt="editImage"
                  className="top-0 right-0 absolute w-[40px] h-[40px] transform"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  // onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="mt-4 w-full">
              <Label htmlFor="username">Username</Label>
              <Input
                id="password"
                type="text"
                value={name}
                placeholder="Enter Username"
                onChange={(e) => setName(e.target.value)}
                withIcon
                name=""
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none rounded-[43.81px] text-white placeholder-[#FFFFFF80]"
              />
            </div>

            <div className="w-full">
              <div className="flex justify-start gap-3 mt-8 w-full max-w-xs">
                <Button
                  className="bg-[#FFFFFF1A] text-white"
                  onClick={() => onEditClose()}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* change password */}
      <Modal isOpen={passwordOpen} onClose={onPasswordClose} buttonContent="">
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="z-[100000] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="flex justify-start items-center mb-7 w-full">
            <Text as="h3" className="flex-grow text-white text-start">
              Change Password
            </Text>
          </div>
          <form
          // onSubmit={handleUpdatePassword}
          >
            <div className="mb-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="password"
                type="password"
                value={oldPassword}
                placeholder="Enter Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                withIcon
                name=""
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none rounded-[43.81px] text-white placeholder-[#FFFFFF80]"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="oldPassword">New Password</Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                withIcon
                name=""
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none rounded-[43.81px] text-white placeholder-[#FFFFFF80]"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="oldPassword">Confirm New Password</Label>
              <Input
                id="password"
                type="password"
                value={confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                withIcon
                name=""
                readOnly={true}
                className="bg-[#FFFFFF1A] border-none rounded-[43.81px] text-white placeholder-[#FFFFFF80]"
              />
            </div>
            <div className="flex gap-3 mt-8 w-full max-w-xs">
              <Button
                className="bg-[#FFFFFF1A] text-white"
                onClick={() => onPasswordClose()}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      </Modal>
      {/* delete */}
      <Modal isOpen={isDeleteOpen} onClose={onEditClose} buttonContent="">
        <div className="flex flex-col items-center gap-8">
          {loading && (
            <div className="z-[100000] fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <ClipLoader color="#A8E543" size={50} />
            </div>
          )}
          <div className="relative flex flex-col items-center">
            <Image
              src="/images/admin/header/warning.svg"
              alt="userImage"
              className="rounded-full w-30 h-30 object-cover"
              onClick={handleImageClick}
              width={200}
              height={200}
            />
            <Text
              as="h3"
              className="flex-grow font-semibold text-[#000000] text-center"
            >
              <span className="text-[#266CA8]">Delete</span> Your Account?
            </Text>

            <Text className="text-[#777777] text-center">
              Are you sure you want to delete your account? All your downloaded
              files and subscription data will be lost
            </Text>
          </div>

          <div className="flex gap-10 w-full max-w-sm">
            <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button
            // onClick={handleDelete}
            >
              Yes I&apos;m Sure
            </Button>
          </div>
        </div>
      </Modal>

      {/* Account logout Modal */}
      <Modal isOpen={isOpen} onClose={onClose} buttonContent="">
        <div className="flex flex-col items-center">
          <Image
            src="images/admin/header/dltCircle.svg"
            alt="dltCircle"
            className=""
          />
          <Text as="h3" className="mt-2 font-medium text-white">
            Logout
          </Text>
          <Text as="p" className="font-medium text-primary">
            Are you sure you want to Logout to your account
          </Text>
          <div className="flex gap-3 mt-8 w-full max-w-xs">
            <Button
              className="bg-[#FFFFFF1A] text-white"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
            // onClick={handleLogout}
            >
              Yes, Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DropdownUser;
