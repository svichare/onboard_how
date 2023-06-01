import React, {useState} from "react";

import { ProjectInput, ProjectDetails, TaskDetails, ResultDashboard } from '../containers';
import { Sidebar } from '../components';
import * as S from "./testSkillStyles";


export default function TestSkills() {
  const [selectedProject, setSelectedProject] = useState({name: "" , type: "", id:""});
  const [selectedTask, setSelectedTask] = useState({name: "",// Dont populate, used in the check below.
  id:1,
  title: "default task title", 
  description: "default task set in the main function.",
  subtasks: [{
    name: "default subtask name",
    type: "bool",
    rank: "1"}]});

  const [MockProjectList] = useState([{name: "MockProjectTask101", id:101}, {name: "MockProjectTask102", id:102}]);
  let renderedPage;
  let renderedSidebar;

  if (selectedTask.name.length > 0) {
    // Fetch the details of the task from DB.
    // FetchTaskDetails(selectedTask.id, {setSelectedTask});
    switch (selectedTask.name) {
        case 'ResultDashboard': 
            // Show result dashboard here.
            renderedPage = <ResultDashboard />;
            renderedSidebar = <Sidebar ProjectTaskList={MockProjectList} setSelectedTask={setSelectedTask} />;
        break;

        default:
            renderedPage = <TaskDetails selectedTask={selectedTask} />;
            renderedSidebar = <Sidebar ProjectTaskList={MockProjectList} setSelectedTask={setSelectedTask} />;
        break;
    }
    
  } else if (selectedProject.name.length > 0) {
    // Get list of project task list if required. Sending MockList for now.
    renderedPage = <ProjectDetails selectedProject={selectedProject} />;
    renderedSidebar = <Sidebar ProjectTaskList={MockProjectList} setSelectedTask={setSelectedTask} />;
  } else {
    // Project not selected yet.
    renderedPage = <ProjectInput setSelectedProject={setSelectedProject} />;
    renderedSidebar = <Sidebar ProjectTaskList={[]} />;
  }
  return (
    <S.Container>
      {renderedSidebar}
      <S.Main>
          {/* <Navbar /> */}
          {renderedPage}
      </S.Main>
    </S.Container>
  );
}