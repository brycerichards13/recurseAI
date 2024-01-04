async function deleteChatData(chatId: string): Promise<void> {
  // URL of your API endpoint
  const url = new URL(
    `http://localhost:3000/api/dbAccess/endpoint/removeChat?chatId=${chatId}`,
  );

  try {
    // Send a DELETE request to the endpoint
    const response = await fetch(url.toString(), {
      method: 'DELETE',
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to delete chat:', error);
    throw error; // Re-throw the error for further handling
  }
}

export { deleteChatData };
