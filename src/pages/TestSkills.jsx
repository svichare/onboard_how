import React, {useState} from "react";

import { ProjectInput, ProjectDetails, TaskDetails, ResultDashboard, About } from '../containers';
import { Navbar, Sidebar } from '../components';
import * as S from "./testSkillStyles";
import mixpanel from 'mixpanel-browser';


export default function TestSkills() {
  const [selectedProject, setSelectedProject] = useState({name: "", typeId:"0", uniqueId:""});
  const [selectedTask, setSelectedTask] = useState({name: "",// Dont populate, used in the check below.
  id:1,
  title: "default task title", 
  description: "default task set in the main function.",
  subtasks: [{
    name: "default subtask name",
    type: "bool",
    rank: "1"}]});

  mixpanel.init('59c469bb7eb9d16f26c54243b1e5f5be', { debug: true, track_pageview: true, persistence: 'localStorage' });

  const [MockProjectTypeList] = useState([{name: "MockProjectType01", id:101}, {name: "MockProjectType102", id:102}]);
  let renderedPage;
  let renderedSidebar;

  if (selectedTask.name.length > 0) {
    switch (selectedTask.name) {
        case 'ResultDashboard': 
            // Show result dashboard here.
            renderedPage = <ResultDashboard />;
            renderedSidebar = <Sidebar ProjectTaskList={MockProjectTypeList} setSelectedTask={setSelectedTask} />;
        break;

        case 'Home':
            setSelectedProject({name: "" , type: "", id:0}) ;
            setSelectedTask({name: "",// Dont populate, used in the check below.
            id:1,
            title: "default task title", 
            description: "default task set in the main function.",
            subtasks: [{
                name: "default subtask name",
                type: "bool",
                rank: "1"}]});
                renderedPage = <ProjectInput setSelectedProject={setSelectedProject} />;
                renderedSidebar = <Sidebar ProjectTaskList={[]} />;
        break;

        case 'About':
            renderedPage = <About />;
            renderedSidebar = <Sidebar ProjectTaskList={MockProjectTypeList} setSelectedTask={setSelectedTask} />;
        break;

        default:
            renderedPage = <TaskDetails selectedTask={selectedTask} userProjectUniqueId={selectedProject.uniqueId} />;
            renderedSidebar = <Sidebar selectedProject={selectedProject} ProjectTaskList={MockProjectTypeList} setSelectedTask={setSelectedTask} />;
        break;
    }
    
  } else if (selectedProject.name.length > 0) {
    mixpanel.identify(selectedProject.name)

    // Get list of project task list if required.
    if (selectedProject.id == -1) {
      renderedPage = <ProjectInput setSelectedProject={setSelectedProject} statusMessage={selectedProject.status_message} />;
      renderedSidebar = <Sidebar ProjectTaskList={[]} />;
    } else {

      renderedPage = <ProjectDetails selectedProject={selectedProject} setSelectedTask={setSelectedTask} />;
      renderedSidebar = <Sidebar selectedProject={selectedProject} ProjectTaskList={MockProjectTypeList} setSelectedTask={setSelectedTask}/>;
    }
  } else {
    // Project not selected yet.
    renderedPage = <ProjectInput setSelectedProject={setSelectedProject} mixpanelInput={mixpanel} />;
    renderedSidebar = <Sidebar ProjectTaskList={[]} />;
  }
  return (
    <S.Container>
      {renderedSidebar}
      <S.Main>
          <Navbar setSelectedTask={setSelectedTask} />
          {renderedPage}
      </S.Main>
    </S.Container>
  );
}