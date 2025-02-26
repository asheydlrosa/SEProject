const BASE_URL = "http://127.0.0.1:8000/api"; // Change this if your backend URL is different

// ✅ Improved Login Function with Better Error Handling
export async function loginUser(username: string, password: string) {
    try {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Ensure it handles JSON response errors properly
            const errorData = await response.json();
            throw new Error(errorData.error || "Login failed");
        }

        const data = await response.json();
        return data.token; // Return the auth token

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

// ✅ Improved Register Function with Error Checking
export async function registerUser(username: string, email: string, password: string) {
    try {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Registration failed");

        return data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

// ✅ Improved Join Class Function with Proper Error Handling
export async function joinClass(token: string, className: string) {
    try {
        const response = await fetch(`${BASE_URL}/join-class/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Include user authentication token
            },
            body: JSON.stringify({ class_name: className }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to join class");

        return data;
    } catch (error) {
        console.error("Join class error:", error);
        throw error;
    }
}
