// App.tsx
import React from "react";
import type { Project } from "../../types";
import { ProjectsPage } from "../../components/projects/Project";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";

function ProjectPage() {
    const param = useParams()
    console.log("param : ", param)
    const { data: workspaces, isLoading } = useFetch("/workspaces");

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="App">
            <ProjectsPage workspaces={workspaces} />
        </div>
    );
}

export default ProjectPage;
