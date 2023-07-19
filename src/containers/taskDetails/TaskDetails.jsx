import React, {useState, useEffect} from 'react';
import * as S from "./taskDetailsStyles";

import brain_simplify from '../../assets/brain_simplify.jpg'

import { API, graphqlOperation } from '@aws-amplify/api'
import { allTaskActionItems, taskDetails, userActionItemsDetails } from '../../graphql/queries'
import { updateUserActionItemResponse } from '../../graphql/mutations'


async function fetch_task_details(id) {
    try {
      console.log("Requesting data for task : ", id);

      const response = await API.graphql({
        query: taskDetails,
        variables: {
          taskId: id
        },
      })
      // For local testing.
      if (typeof response.data.taskDetails === "undefined") {
        console.log("Task data not recieved. Sending mock task data now");
        return {
            name: "MockprojectTask101",
            id:101,
            title: "Mock task title 101.",
            description: "This is the mock description of the mock task 101. This field will describe the task. It will show the importance",
        };
      }
      console.log("Sending task data received from backend");
      return response.data.taskDetails;
    } catch (error) {
      console.error(`Cought error in function : ${error}`);
      console.log("Sending mock data since the error received");
      return {
        name: "MockprojectTask101",
        id:101,
        title: "Mock task title 101.",
        description: "This is the mock description of the mock task 101. This field will describe the task. It will show the importance",
    };
    }
  }

  async function fetch_actionItem_details(id) {
    try {
      console.log("Requesting data for task : ", id);

      const response = await API.graphql({
        query: allTaskActionItems,
        variables: {
          taskId:id
        },
      })
      // For local testing.
      if (response.data.allTaskActionItems.length === 0) {
        console.log("Task data not recieved. Sending mock task data now");
        return [
                {
                    name: "Have you played with an e2e test setup?",
                    type: "bool",
                    rank: "1"},
                {
                    name: "Add links to the e2e setup with any other required information.",
                    type: "details",
                    rank: "2"},
            ];
      }
      console.log("Sending task data received from backend");
      return response.data.allTaskActionItems;
    } catch (error) {
      console.error(`Cought error in function : ${error}`);
      console.log("Sending mock data since the error received");
      return [
        {
            name: "Have you played with an e2e test setup?",
            type: "bool",
            rank: "1"},
        {
            name: "Add links to the e2e setup with any other required information.",
            type: "details",
            rank: "2"},
    ];
    }
  }

  async function fetch_actionItem_responses(taskId, userProjectUniqueId, actionItem_list_from_async) {
    var results_with_responses = [];
    // Create a request array.
    var actionitem_request = [];
    console.log("Creating request : ");
    for (const actionItem of actionItem_list_from_async) {
      var cur_actionitem_request = {
        userProjectId: userProjectUniqueId,
        taskId: 0,
        actionItemId: 0
      };
      cur_actionitem_request.userProjectId = userProjectUniqueId;
      cur_actionitem_request.taskId = taskId;
      cur_actionitem_request.actionItemId = actionItem.id;
      actionitem_request.push(cur_actionitem_request);
      console.log(cur_actionitem_request);
    }

    var actionitem_list_as_array = {
      actions : actionitem_request
    };
    try {
      console.log("Requesting responses for these many actions : ", actionItem_list_from_async.length);
      const variables_object = {
        userProjectId:userProjectUniqueId,
        userActionItemsInput: actionitem_list_as_array
      };
      console.log("Request : ");
      console.log(variables_object);

      const response = await API.graphql({
        query: userActionItemsDetails, 
        variables: variables_object,
      })

      console.log("Sending ActionItem responses received from backend.");
      console.log("Data length : " + response.data.userActionItemsDetails.length);
      
      // +  "  Data is : " + response.data.userActionItemsDetails[0].taskId
      // + " : " + response.data.userActionItemsDetails[0].actionItemId
      // + " : " + response.data.userActionItemsDetails[0].response);
      if (response.data.userActionItemsDetails.length == 0) {
        return actionItem_list_from_async;
      } else {
        console.log("Data details : " +  "  Data is : " + response.data.userActionItemsDetails[0].taskId
        + " : " + response.data.userActionItemsDetails[0].actionItemId
        + " : " + response.data.userActionItemsDetails[0].response);
      }

      for (const actionItem of actionItem_list_from_async) {
        var cur_action = actionItem;
        const matchingEntry = response.data.userActionItemsDetails.find(entry => 
          entry.actionItemId == cur_action.id
        );
        if (matchingEntry) {
          console.log("Found matching entry for : " + cur_action.id + "  including response : " + matchingEntry.response);
          cur_action.response = matchingEntry.response;
        } else {
          console.log("DID NOT find matching entry for : " + cur_action.id  + " actionItem.id : " + actionItem.id);
        }

        results_with_responses.push(cur_action);
      }
      return results_with_responses;
    } catch (error) {
      console.error('Cought error in function :', error.message);
      console.log("Sending responseless data since error received");
      return actionItem_list_from_async;
    }
  }

function FetchTaskDetailsFunc(taskId, userProjectUniqueId, setSelectedLocalTask, setSelectedLocalActionItems) {
    console.log("Request to fetch task details received.");
    fetch_task_details(taskId).then((task_details_from_async) => {
      setSelectedLocalTask(task_details_from_async);
      fetch_actionItem_details(taskId).then((actionItem_details_from_async) => {
        fetch_actionItem_responses(taskId, userProjectUniqueId, actionItem_details_from_async).then((actionItem_with_responses) => {
          setSelectedLocalActionItems(actionItem_with_responses);
        });
      });
    });
}

async function update_action_response(curUniqueId, curTaskId, curActionItemId, curResponse) {
  // update actionItem with the response.
  const action_item_details = {
    uniqueId: curUniqueId,
    taskId: curTaskId,
    actionItemId: curActionItemId,
    response: curResponse
  };

  console.log("Update the action response : " + action_item_details.uniqueId
   + " : " + action_item_details.taskId + " : " + action_item_details.actionItemId
   + " : " + action_item_details.response);
  try {
      const response = await API.graphql(
        graphqlOperation(updateUserActionItemResponse,
          {userActionItemInput: action_item_details}));
      // For local testing.
      // if (typeof response.data.UserProjectCreateOutput === 'undefined' || response.data.UserProjectCreateOutput.status.length === 0) {
      //   console.log("No status returned");
      // } else {
      //   console.log("Project creation status : " + response.data.UserProjectCreateOutput.status);
      // }
  } catch (error) {
      console.error(`Cought error in update_action_response function : ${error}`);
  }
}

function FormatQuestions(props) {
  const result = [];

  const handleResponseChange = (e, actionItem) => {
    actionItem.response = e.target.value;
    update_action_response(props.userProjectUniqueId, props.taskId, actionItem.id, e.target.value)
  };

  if (Array.isArray(props.actionItems)) {
    props.actionItems.forEach((actionItem, index) => {
      result.push(
        <p><br></br></p>,
        <p key={index}> .. {actionItem.description}</p>
      );
      switch (actionItem.actionType) {
        case 'Tick': 
          result.push(<div class="buttons">
          <input type="radio" name={actionItem.name + "_choice"} value="yes" defaultChecked={actionItem.response == "yes"} onChange={(e) => {
            actionItem.response = e.target.value;
            handleResponseChange(e, actionItem);
          }}/>  Yes 
          <input type="radio" name={actionItem.name + "_choice"} value="no"  defaultChecked={actionItem.response == "no"} onChange={(e) => {
            actionItem.response = e.target.value;
            handleResponseChange(e, actionItem);
          }} />  No 
          <input type="radio" name={actionItem.name + "_choice"} value="na" defaultChecked={actionItem.response == "na"} onChange={(e) => {
            actionItem.response = e.target.value;
            handleResponseChange(e, actionItem);
          }} />  NA
        </div>);
        break;
        case 'details':
          // result.push(<S.TextInput type="text" placeholder="Enter link to the documents .."></S.TextInput>);
          result.push(<S.TextInput type="text" placeholder="Enter link to the documents .." defaultValue={actionItem.response} onChange={(e) => {
            actionItem.response = e.target.value;
            handleResponseChange(e, actionItem);
          }}></S.TextInput>);
        break;
        case '':
          result.push(<S.TextInput type="text" placeholder="Enter link to the documents .."  defaultValue={actionItem.response} onChange={(e) => {
            actionItem.response = e.target.value;
            handleResponseChange(e, actionItem);
          }}></S.TextInput>);
        break;
      }
    });
  }

  return (
    <div className="dashboard_dropdown">
      {result}
    </div>
  );
}

export default function FetchTaskDetails({selectedTask, userProjectUniqueId}) {

  const [selectedLocalTask, setSelectedLocalTask] = useState([{name: "Initialized value",
  id:1,
  description: "Description default task set in the local function."}]);
  
  const [selectedLocalActionItems, setSelectedLocalActionItems] = useState([{name: "Initialized value",
  id:1,
  description: "Description default task set in the local function.",
  actionType: "Tick",
  response: "no"}]);

  useEffect( () => {
    // Clear old values of actionItem list.
    setSelectedLocalActionItems([]);
    FetchTaskDetailsFunc(selectedTask.id, userProjectUniqueId, setSelectedLocalTask, setSelectedLocalActionItems);
  }, [selectedTask.id]);

return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1> {Array.isArray(selectedLocalTask) && selectedLocalTask.length > 0 ? selectedLocalTask[0].name : ""} </h1>
    <p>  {Array.isArray(selectedLocalTask) && selectedLocalTask.length > 0 ? selectedLocalTask[0].description : ""} </p>
    <p> <br></br> </p>

    <p>Answer the following. I ..</p>
    <FormatQuestions actionItems={selectedLocalActionItems} userProjectUniqueId={userProjectUniqueId} taskId={selectedLocalTask[0].id}/>
    <p> <br></br> </p>
  </S.Container>
);
}