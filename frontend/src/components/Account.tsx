import { Fragment, useContext } from "react";
import { UserContext } from "../context/user.context";
import { Popover, Transition } from "@headlessui/react";
import EditIcon from "../assets/icon/pen.png";

function Account() {
  const { user, signout } = useContext(UserContext);
  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`;

  return (
    <header className="flex items-center justify-end mb-4">
      <Popover className="relative">
        <Popover.Button className="focus:outline-none flex items-center">
          <img
            className="rounded-full  object-cover w-8 mr-2 overflow-hidden"
            src={avatarUrl}
            alt=""
          />
          <span className="text-sm font-medium">{user.email}</span>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-full -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative gap-8 bg-violet-500 p-5">
                <a className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-white  hover:bg-gray-50 hover:text-red-500">
                  <div className="cursor-pointer" onClick={signout}>
                    <p className="text-sm font-medium ">Sign out</p>
                  </div>
                </a>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}

export default Account;
