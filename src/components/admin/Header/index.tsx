import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const Header = () => {
  return (
    <header className="top-0 sticky bg-[#F4E9DC] border-[#D9D9D94D] border-b w-full">
      <div className="flex flex-wrap justify-end items-end gap-5 sm:gap-0 px-4 py-4">
        <div className="flex items-center gap-8 2xsm:gap-7">
          <DropdownUser />
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
