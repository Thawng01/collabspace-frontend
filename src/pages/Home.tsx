import KanbanBoard from "../components/columns/KanbanBoard";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const { data } = useFetch("/users/me");

    return <KanbanBoard />;
};

export default Home;
