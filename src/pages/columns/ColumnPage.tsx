import KanbanBoard from "../../components/columns/KanbanBoard";
import { useParams } from "react-router";

const ColumnPage = () => {
    const { id } = useParams();
    return <KanbanBoard projectId={id!} />;
};

export default ColumnPage;
