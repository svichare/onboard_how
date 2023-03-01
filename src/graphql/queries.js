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
