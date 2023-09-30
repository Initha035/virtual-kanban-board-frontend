import { Icon } from "@iconify/react";
import { lazy, Suspense as S, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../api/apiTypes";
import { usePublicUserQuery } from "../../api/endpoints/auth.endpoint";
import { selectMembers } from "../../api/endpoints/member.endpoint";
const DeleteProject = lazy(() => import("./DeleteProject"));

interface Props extends Project {
  idx: number;
  authUserId: number;
}

const TableRow = (props: Props) => {
  const { idx, id, name, descr, repo, userId, authUserId } = props;
  const { members } = selectMembers(id);
  const { data: publicUser } = usePublicUserQuery(userId);
  const [on, setOn] = useState(false);
  const navigate = useNavigate();

  if (!members) return null;

  const { isAdmin, id: memberId } = members.filter(
    ({ userId: u }) => u === authUserId
  )[0];

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOn(true);
  };

  return (
    <tr
      className="cursor-pointer"
      key={id}
      onClick={() => navigate(id + "/board")}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {idx + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {descr}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {publicUser?.username}
        {isAdmin ? <span className="ml-1 text-sm font-bold">(you)</span> : ""}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          title="Delete or Leave"
          onClick={handleDelete}
          className="btn-icon right-0 ml-5 block"
        >
          <Icon icon="bx:trash" className="text-red-500" />
        </button>
      </td>
      {on && publicUser && (
        <S>
          <DeleteProject
            projectId={id}
            {...{ name, authUserId, memberId, isAdmin }}
            onClose={() => setOn(false)}
          />
        </S>
      )}
    </tr>
  );
};

export default TableRow;
