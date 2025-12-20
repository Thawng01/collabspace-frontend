import { useParams } from "react-router";

const WorkSpaceDetail = () => {
    const { id } = useParams();
    return <div>WorkSpaceDetail : {id}</div>;
};

export default WorkSpaceDetail;
