import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useIssuesQuery } from "../../api/endpoints/issues.endpoint";
import { useListsQuery } from "../../api/endpoints/lists.endpoint";
import type { APIERROR } from "../../api/apiTypes";
import Board from "./Board";
import Filter from "./Filter";
import SS from "../util/SpinningCircle";
import { useAppSelector } from "../../store/hooks";
import { useProjectQuery } from "../../api/endpoints/project.endpoint";
import { classNames } from "../../utils";
import Tabs from "../util/Tabs";

const Project = () => {
  const projectId = Number(useParams().projectId);
  const issueQuery = useAppSelector((state) => state.query.issue);
  const { data: lists, error: listError } = useListsQuery(projectId);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const { data: project } = useProjectQuery(projectId, { skip: !projectId });
  const { data: issues, error: issueError } = useIssuesQuery(
    { projectId, ...issueQuery },
    { refetchOnMountOrArgChange: true }
  );

  if (listError && issueError) {
    if (
      (listError as APIERROR).status === 401 ||
      (issueError as APIERROR).status === 401
    )
      return <Navigate to="/login" />;
    return (
      <div className="grid h-full grow place-items-center text-xl">
        You are not part of this project ☝
      </div>
    );
  }

  return (
    <div className="mt-6 flex grow flex-col px-8 sm:px-10">
      <div
        key={project?.name ?? "loading..."}
        className={
          "rounded-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border-2 my-8"
        }
      >
        <div>
          <span
            className={
              "rounded-lg inline-flex p-3 ring-4 ring-white text-teal-700 bg-teal-100"
            }
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center text-lg"
              aria-hidden="true"
            >
              {project?.name.at(0)}
            </span>
          </span>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium">
            <span className="focus:outline-none">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              {project?.name ?? "loading..."}
            </span>
          </h3>
          <p className="mt-2 text-sm text-gray-500">{project?.descr}</p>
        </div>
      </div>
      <h1 className="mb-4 text-xl font-semibold text-c-text">Kanban Board</h1>
      <Filter
        isEmpty={lists?.length === 0}
        {...{ projectId, setIsDragDisabled }}
      />

      {lists ? (
        <Board {...{ lists, issues, isDragDisabled }} />
      ) : (
        <div className="grid h-[40vh] w-full place-items-center">
          <SS />
        </div>
      )}
    </div>
  );
};

export default Project;
