import { ProjectsPage } from "../../components/projects/Project";
import useFetch from "../../hooks/useFetch";

function ProjectPage() {
  const { data: workspaces, isLoading } = useFetch("/workspaces");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="App">
      <ProjectsPage workspaces={workspaces} />
    </div>
  );
}

export default ProjectPage;
