// Type definitions for our API interactions
export interface Reflection {
  id: string;
  date: string;
  mood: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReflectionData {
  userId: string;
  date: string;
  mood: string;
  content: string;
  tags: string[];
}

export interface UpdateReflectionData {
  mood?: string;
  content?: string;
  tags?: string[];
}

// API response type definitions
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Fetch all reflections with optional filters
export async function getReflections(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<Reflection[]>> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("userId", userId);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    console.log(`Fetching reflections with params: userId=${userId}`);
    const response = await fetch(`/api/reflections?${params.toString()}`);

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Non-JSON response received:", await response.text());
      return { error: "Server returned a non-JSON response" };
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch reflections" };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching reflections:", error);
    return { error: "An unexpected error occurred" };
  }
}

// Get a single reflection by ID
export async function getReflection(
  id: string
): Promise<ApiResponse<Reflection>> {
  try {
    const response = await fetch(`/api/reflections/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to fetch reflection" };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return { error: "An unexpected error occurred" };
  }
}

// Create a new reflection
export async function createReflection(
  reflectionData: CreateReflectionData
): Promise<ApiResponse<Reflection>> {
  try {
    console.log("Client: Creating reflection with data:", {
      userId: reflectionData.userId,
      date: reflectionData.date,
      mood: reflectionData.mood,
      contentLength: reflectionData.content?.length || 0,
      tags: reflectionData.tags,
    });

    const response = await fetch("/api/reflections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reflectionData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Client: Error response from API:", responseData);
      return {
        error:
          responseData.error ||
          responseData.details ||
          "Failed to create reflection",
      };
    }

    console.log("Client: Successfully created reflection:", responseData.id);
    return { data: responseData };
  } catch (error) {
    console.error("Client: Error creating reflection:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Update an existing reflection
export async function updateReflection(
  id: string,
  reflectionData: UpdateReflectionData
): Promise<ApiResponse<Reflection>> {
  try {
    console.log("Client: Updating reflection", id, "with data:", {
      mood: reflectionData.mood,
      contentLength: reflectionData.content?.length || 0,
      tags: reflectionData.tags,
    });

    const response = await fetch(`/api/reflections/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reflectionData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Client: Error response from API:", responseData);
      return {
        error:
          responseData.error ||
          responseData.details ||
          "Failed to update reflection",
      };
    }

    console.log("Client: Successfully updated reflection:", id);
    return { data: responseData };
  } catch (error) {
    console.error("Client: Error updating reflection:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Delete a reflection
export async function deleteReflection(
  id: string
): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const response = await fetch(`/api/reflections/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Failed to delete reflection" };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting reflection:", error);
    return { error: "An unexpected error occurred" };
  }
}
