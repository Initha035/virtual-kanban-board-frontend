import { Dispatch, lazy, SetStateAction, Suspense as S, useState } from "react";
import { APIERROR } from "../../api/apiTypes";
import { Navigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMembersQuery } from "../../api/endpoints/member.endpoint";
import { useAuthUserQuery } from "../../api/endpoints/auth.endpoint";
import { useProjectQuery } from "../../api/endpoints/project.endpoint";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setIssueQuery } from "../../store/slices/querySlice";
import Avatar from "../util/Avatar";
import toast from "react-hot-toast";
const IssueModelHOC = lazy(() => import("../issue/IssueModelHOC"));
const CreateIssueModal = lazy(() => import("../issue/CreateIssueModal"));

interface Props {
  setIsDragDisabled: Dispatch<SetStateAction<boolean>>;
  projectId: number;
  isEmpty: boolean;
}

function Filter(props: Props) {
  const { projectId, isEmpty, setIsDragDisabled } = props;
  const { data: m, error } = useMembersQuery(projectId);
  const { data: pj } = useProjectQuery(projectId);
  const { data: u } = useAuthUserQuery();
  const { userId: uid } = useAppSelector((s) => s.query.issue);
  const [on, setOn] = useState(false);
  const dispatch = useAppDispatch();
  const [fold, setFold] = useState(true);
  const len = m?.length;

  if (error && (error as APIERROR).status === 401)
    return <Navigate to="/login" />;

  function handleClick() {
    if (isEmpty) return toast.error("Please create a list first!");
    setOn(true);
  }

  const handleSetQuery = (query: { userId?: number }) => () => {
    dispatch(setIssueQuery(query));
    setIsDragDisabled(!!query.userId);
  };

  return (
    <div className="flex min-w-fit items-center">
      <button
        onClick={handleClick}
        className="relative shrink-0 bg-indigo-600 p-2 rounded-lg text-white mb-8"
      >
        Create an issue
      </button>

      {on && !isEmpty && (
        <S>
          <IssueModelHOC
            children={CreateIssueModal}
            onClose={() => setOn(false)}
          />
        </S>
      )}
    </div>
  );
}

export default Filter;
