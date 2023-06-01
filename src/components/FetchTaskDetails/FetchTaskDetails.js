
import { API } from '@aws-amplify/api'
import { allProjectTasks } from '../../graphql/queries'

async function fetch_task_details(id) {

    try {
      console.log("Requesting data for task : ", id);

      const response = await API.graphql({
        query: allProjectTasks, // tasksDetails,
        variables: {
          projectId:id,
          taskId:id
        },
      })
      // For local testing.
      if (response.data.allProjectTasks.length === 0) {
        console.log("Task data not recieved. Sending mock task data now");
        return {
            name: "MockprojectTask101",
            id:101,
            title: "Mock task title 101.",
            description: "This is the mock description of the mock task 101. This field will describe the task. It will show the importance",
            subtasks: [
                {
                    name: "Have you played with an e2e test setup?",
                    type: "bool",
                    rank: "1"},
                {
                    name: "Add links to the e2e setup with any other required information.",
                    type: "details",
                    rank: "2"},
            ],
        };
      }
      console.log("Sending task data received from backend");
      return response.data.allProjectTasks;
    } catch (error) {
      console.error(`Cought error in function : ${error}`);
      console.log("Sending mock data since the error received");
      return {
        name: "MockprojectTask101",
        id:101,
        title: "Mock task title 101.",
        description: "This is the mock description of the mock task 101. This field will describe the task. It will show the importance",
        subtasks: [
            {
                name: "Have you played with an e2e test setup?",
                type: "bool",
                rank: "1"},
            {
                name: "Add links to the e2e setup with any other required information.",
                type: "details",
                rank: "2"},
        ],
    };
    }
  }

export default function FetchTaskDetails({taskId, setTaskDetails}) {
    console.log("Request to fetch task details received.");
    fetch_task_details(taskId).then((task_details_from_async) => {
        setTaskDetails(task_details_from_async);
    });
}
