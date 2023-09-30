import { useState } from "react";
import { Icon } from "@iconify/react";
import BtnWithIcon from "../util/BtnWithIcon";
import { useProjectQuery } from "../../api/endpoints/project.endpoint";
import { useParams } from "react-router-dom";

export default function Menubar() {
  const projectId = Number(useParams().projectId);
  const { data: project } = useProjectQuery(projectId, { skip: !projectId });
  return (
    <div className="relative p-4">
      <div className="flex-1 flex flex-col bg-white">
        {projectId ? (
          <>
            <div className="flex">
              <div className="grid h-10 w-10 shrink-0 place-items-center bg-cyan-500 text-lg">
                {project?.name.at(0)}
              </div>
              <div className="ml-2 w-40">
                <span className="block truncate text-sm font-medium text-c-5">
                  {project?.name ?? "loading..."}
                </span>
                <span className="text-[13px] text-c-text">
                  Project Planning
                </span>
              </div>
            </div>
            <div className="my-5">
              <BtnWithIcon
                to={projectId + "/board"}
                icon="bi:kanban"
                text="Kanban Board"
              />
              <BtnWithIcon
                to={projectId + ""}
                icon="clarity:settings-solid"
                text="Project Setting"
              />
            </div>
            <hr className="border-t-[.5px] border-gray-400" />
          </>
        ) : null}
      </div>
    </div>
  );
}
