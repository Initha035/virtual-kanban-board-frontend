import Issue from "../issue/Issue";
import DroppableWrapper from "../dnd/DroppableWrapper";
import DraggableWrapper from "../dnd/DraggableWrapper";
import type { Issue as ApiIssue, List as LIST } from "../../api/apiTypes";
import { Icon } from "@iconify/react";
import { lazy, Suspense as S, useState } from "react";
import {
  useDeleteListMutation,
  useUpdateListMutation,
} from "../../api/endpoints/lists.endpoint";
import toast from "react-hot-toast";
const ConfirmModel = lazy(() => import("../util/ConfirmModel"));
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
interface Props extends LIST {
  idx: number;
  issues?: ApiIssue[];
  isDragDisabled: boolean;
}

const List = (props: Props) => {
  const { idx, name: NAME, id, projectId, issues, isDragDisabled } = props;
  const [deleteList] = useDeleteListMutation();
  const [name, setName] = useState(NAME);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateList] = useUpdateListMutation();

  const handleUpdateList = async () => {
    // when the user saves
    if (name && name !== NAME) {
      await updateList({ listId: id, body: { projectId, name } });
      toast("Updated list name!");
    }
    setIsEditing((p) => !p);
  };

  return (
    <>
      <DraggableWrapper
        className="w-[clamp(16rem,18rem,20rem)]"
        index={idx}
        draggableId={"list-" + id}
        isDragDisabled={isDragDisabled}
      >
        <div className="relative mr-3 bg-c-2 p-3  border rounded-md">
          <div className="mb-4 flex items-center justify-between text-[15px]">
            <div className="item-center flex">
              <div className="relative">
                {isEditing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    className="w-36 border-[1.5px] bg-c-2 pl-2 text-[15px] outline-none"
                  />
                ) : (
                  <span className="block border-[1.5px] border-transparent pl-2 font-medium">
                    {name}
                  </span>
                )}
              </div>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-c-4 pt-[1px] font-bold">
                {issues ? issues.length : 0}
              </span>
            </div>
            <div className="flex gap-2 mr-4">
              {isEditing && (
                <button
                  onClick={() => setIsOpen(true)}
                  title="Delete"
                  className="btn-icon ml-5 hover:bg-c-3"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </button>
              )}
              <button
                onClick={handleUpdateList}
                title={isEditing ? "Save" : "Edit"}
                className="btn-icon hover:bg-c-3"
              >
                {isEditing ? (
                  <CheckCircleIcon className="h-5 w-5" />
                ) : (
                  <PencilSquareIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <DroppableWrapper
            className="min-h-[3rem]"
            type="issue"
            droppableId={"list-" + id}
          >
            {issues?.map((data, i) => (
              <Issue
                isDragDisabled={isDragDisabled}
                key={data.id}
                listIdx={idx}
                idx={i}
                {...data}
                listId={id}
              />
            ))}
          </DroppableWrapper>
        </div>
      </DraggableWrapper>
      {isOpen && (
        <S>
          <ConfirmModel
            onClose={() => setIsOpen(false)}
            onSubmit={() => deleteList({ listId: id, projectId })}
            toastMsg="Deleted a list!"
          />
        </S>
      )}
    </>
  );
};

export default List;
