import { Fragment, lazy, memo, Suspense as S, useState } from "react";
import type { AuthUser } from "../../api/apiTypes";
import UpdateProfile from "./UpdateProfile";
const ChangePwd = lazy(() => import("./ChangePwd"));

interface Props {
  authUser: AuthUser;
  open: any;
  setOpen: any;
}

import { Dialog, Transition } from "@headlessui/react";

function Profile(props: Props) {
  // const [open, setOpen] = useState(true);
  const { authUser: u } = props;
  const [isNormal, setIsNormal] = useState(true);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="flex flex-col items-center gap-8 overflow-y-auto overflow-x-hidden p-6">
                {u ? (
                  <>
                    <div className="mb-2">
                      {isNormal ? (
                        <UpdateProfile user={u} />
                      ) : (
                        <S>
                          <ChangePwd />
                        </S>
                      )}
                      <button
                        onClick={() => setIsNormal((p) => !p)}
                        className="mt-2 w-full rounded-sm py-1 text-center text-c-text underline hover:bg-c-6"
                      >
                        {isNormal ? "Change password" : "Go back"}
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default memo(Profile);
