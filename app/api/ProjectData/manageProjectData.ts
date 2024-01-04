// Define the interface for the request body
interface AddProjectRequest {
  userId: string;
}

// Define the interface for the response
interface AddProjectResponse {
  projectId: string;
}

async function addProjectToUser(userId: string): Promise<AddProjectResponse> {
  // URL of the API endpoint
  const url = 'http://localhost:3000/api/dbAccess/endpoint/project';

  // Create the request body
  const requestBody: AddProjectRequest = {
    userId: userId,
  };

  try {
    // Send a POST request to the endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parse the JSON response
    const result: AddProjectResponse = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to add project to user:', error);
    throw error;
  }
}

interface ProjectsListResponse {
  projects: string[];
}

async function fetchProjectsList(
  userId: string,
): Promise<ProjectsListResponse> {
  // URL of your API endpoint
  const url = new URL(
    'http://localhost:3000/api/dbAccess/endpoint/projectLists',
  );

  // Add userId as a query parameter
  url.searchParams.append('userId', userId);

  try {
    // Send a GET request to the endpoint
    const response = await fetch(url.toString());

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the JSON response
    const data: ProjectsListResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch projects list:', error);
    throw error;
  }
}

interface ProjectChatsResponse {
  chats: string[];
}

async function fetchProjectChatsList(
  projectId: string,
): Promise<ProjectChatsResponse> {
  // URL of the API endpoint
  const url = new URL(
    'http://localhost:3000/api/dbAccess/endpoint/projectChatLists',
  );

  // Add projectId as a query parameter
  url.searchParams.append('projectId', projectId);

  try {
    // Send a GET request to the endpoint
    const response = await fetch(url.toString());

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the JSON response
    const data: ProjectChatsResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch project chats list:', error);
    throw error;
  }
}

interface AddChatResponse {
  chatId: string;
}

async function addChatToProject(projectId: string): Promise<AddChatResponse> {
  // URL of your API endpoint
  const url = 'http://localhost:3000/api/dbAccess/endpoint/chatToProject';

  // Create the request body
  const requestBody = {
    projectId: projectId,
  };

  try {
    // Send a POST request to the endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the JSON response
    const data: AddChatResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to add chat to project:', error);
    throw error;
  }
}

export {
  addProjectToUser,
  fetchProjectsList,
  fetchProjectChatsList,
  addChatToProject,
};
