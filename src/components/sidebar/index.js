import React, {useState, useEffect} from "react"
import * as S from "./styles";
import Message from "../../assets/icons/message.png";
import Shape from "../../assets/icons/shape.png";
import Arrow from "../../assets/icons/arrow-right.png";
import ArrowDown from "../../assets/icons/arrow-down-nav.png";

import { API } from '@aws-amplify/api'
import { allProjectsPassQuery, allProjectTasks } from '../../graphql/queries'

async function list_project_tasks(id) {
  try {
    const response = await API.graphql({
      query: allProjectTasks,
      variables: {
        projectId:id
      },
    })
    // For local testing.
    if (response.data.allProjectTasks.length === 0) {
      return [{name: "MockprojectTask101FromFunction", id:101},
      {name: "MockprojectTask102FromFunction", id:102}];
    }
    return response.data.allProjectTasks;
  } catch (error) {
    console.error(`Cought error in function : ${error}`);
    return [{name: "MockprojectTask101FromFunction", id:101},
    {name: "MockprojectTask102FromFunction", id:102}];
  }
}


function DisplayProjectTaskList({ProjectTaskList, setSelectedTask}) {
  if (typeof ProjectTaskList === "undefined"|| ProjectTaskList.length === 0 ) {
    // nothing to do as project not selected.
    console.log("Undefined project tasklist returning without fuss. XXXXXXX");
    return <><S.SubList><S.SubItem href="#" key={0}>Pick a project on the form to see test topics.</S.SubItem></S.SubList></>;
  }
  // if (typeof ProjectTaskList === "undefined" || ProjectTaskList.length === 0) {
  //   return <><S.SubList><S.SubItem href="#">Pick a project on the form to see test topics.</S.SubItem></S.SubList></>;
  // }
  return (
    <S.SubList>
      {
        ProjectTaskList.map((value, index) => (
          <S.SubListItem>
          <S.SubItem onClick={() => {console.log("task sidebar clicked"); setSelectedTask(value)}} key={value.id}>{value.name}</S.SubItem>
          </S.SubListItem>
        ))
      }
    </S.SubList>
  );
}

export default function Sidebar({ProjectTaskList, setSelectedTask, selectedProject}) {
  const [localTaskList, setLocalTaskList] = useState([
  //   {
  //   name: '',
  //   type: '',
  //   id: '',
  // }
]);

  useEffect( () => {
    if (typeof selectedProject === "undefined") {
        // nothing to do as project not selected.
        console.log("Undefined project received. XXXXXXX");
        return;
    }
    console.log("Valid project received. XXXXXXX ");
    list_project_tasks(selectedProject.typeId)
    .then((tasks_from_async) => {
      setLocalTaskList(tasks_from_async);
    });
  }, [selectedProject]);

  console.log("Received project task list : ", ProjectTaskList);
  return (
    <S.Wrapper>
      <S.Container>
        <S.Profile>
          <S.ProfileImg></S.ProfileImg>
          <S.ProfileInfo onClick={() => {console.log("Top left image clicked.");
              if(typeof setSelectedTask !== "undefined") setSelectedTask({name:'Home', id:999}); setLocalTaskList([]);}}>
            <h2 className="text-base">Onboard.how</h2>
            <S.Email className="text-sm">svichare@onboard.how</S.Email>
          </S.ProfileInfo>
        </S.Profile>
        <S.List>
          <S.ListItem>
            <S.Item onClick={() => {console.log("result sidebar clicked");
              setSelectedTask({name:'ResultDashboard', id:999});}} href="#">
              <S.ItemIcon src={Shape} alt="shape" />
              Result Dashboard
            </S.Item>
            <img src={Arrow} alt="arrow" />
          </S.ListItem>

          <S.ListItem className="dropdown">
            <S.Item href="#" className="active">
              <S.ItemIcon src={Message} alt="message" />
              Test Topics
            </S.Item>
            <img src={ArrowDown} alt="arrow" />
            <DisplayProjectTaskList ProjectTaskList={localTaskList} setSelectedTask={setSelectedTask}/>
           </S.ListItem>
        </S.List>
      </S.Container>
    </S.Wrapper>
  );
}