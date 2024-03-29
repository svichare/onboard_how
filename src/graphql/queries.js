/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allProjects = /* GraphQL */ `
  query AllProjects {
    allProjects {
      id
      name
      description
    }
  }
`;
export const allProjectsPassQuery = /* GraphQL */ `
  query AllProjectsPassQuery {
    allProjectsPassQuery {
      id
      name
      description
    }
  }
`;
export const allProjectTasks = /* GraphQL */ `
  query AllProjectTasks($projectId: ID) {
    allProjectTasks(projectId: $projectId) {
      id
      name
      description
    }
  }
`;
export const taskDetails = /* GraphQL */ `
  query TaskDetails($taskId: ID) {
    taskDetails(taskId: $taskId) {
      id
      name
      description
    }
  }
`;
export const allTaskActionItems = /* GraphQL */ `
  query AllTaskActionItems($taskId: ID) {
    allTaskActionItems(taskId: $taskId) {
      id
      name
      description
      actionType
    }
  }
`;
export const userProjectDetails = /* GraphQL */ `
  query UserProjectDetails($userProjectId: String) {
    userProjectDetails(userProjectId: $userProjectId) {
      uniqueId
      name
      typeId
      taskResponses {
        id
        name
        description
      }
    }
  }
`;
export const userTaskDetails = /* GraphQL */ `
  query UserTaskDetails($userProjectId: ID, $userTaskId: ID) {
    userTaskDetails(userProjectId: $userProjectId, userTaskId: $userTaskId) {
      taskId
      actionItemId
      response
      comment
    }
  }
`;
export const userActionItemsDetails = /* GraphQL */ `
  query UserActionItemsDetails(
    $userProjectId: String
    $userActionItemsInput: UserActionItemsListInput
  ) {
    userActionItemsDetails(
      userProjectId: $userProjectId
      userActionItemsInput: $userActionItemsInput
    ) {
      taskId
      actionItemId
      response
      comment
    }
  }
`;
