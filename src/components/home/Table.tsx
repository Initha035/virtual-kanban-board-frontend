import { Icon } from "@iconify/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { APIERROR } from "../../api/apiTypes";
import { selectAuthUser } from "../../api/endpoints/auth.endpoint";
import { useProjectsQuery } from "../../api/endpoints/project.endpoint";
import SS from "../util/SpinningCircle";
import CreateProjectModel from "./CreateProjectModel";
import TableRow from "./TableRow";

export default function Example() {
  const { authUser } = selectAuthUser();
  const {
    data: projects,
    error,
    isLoading,
  } = useProjectsQuery(authUser?.id as number, { skip: !authUser });
  const [isOpen, setIsOpen] = useState(false);

  if (error && (error as APIERROR).status === 401)
    return <Navigate to="/login" />;

  if (!authUser || isLoading)
    return (
      <div className="z-10 grid w-full place-items-center bg-c-1 text-xl text-c-text">
        {isLoading ? (
          "Fetching your projects..."
        ) : (
          <div className="flex items-center gap-6">
            <span className="text-base">Loading...</span>
            <SS />
          </div>
        )}
      </div>
    );
  return (
    <div className="flex flex-col mx-auto mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex min-w-[43rem] justify-between pb-8">
            <span className="text-2xl font-semibold tracking-wide">
              Projects
            </span>
            <button onClick={() => setIsOpen(true)} className="btn">
              Create Project
            </button>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {projects ? (
              projects.length !== 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lead
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((data, i) => (
                      <TableRow
                        key={data.id}
                        idx={i}
                        authUserId={authUser.id}
                        {...data}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="mx-auto my-16 grid place-items-center text-xl">
                  You haven't created any project yet!!
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      {isOpen && <CreateProjectModel onClose={() => setIsOpen(false)} />}
    </div>
  );
}
