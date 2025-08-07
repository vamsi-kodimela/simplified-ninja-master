import { API_URL } from "@/config/api.config";

export interface SubscriptionResult {
  success: boolean;
  message: string;
}

/**
 * Subscribe an email to the newsletter
 * @param email - The email address to subscribe
 * @returns Promise<SubscriptionResult>
 */
export async function subscribeEmail(
  email: string,
): Promise<SubscriptionResult> {
  try {
    if (!email || !email.trim()) {
      throw new Error("Email address is required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("Please enter a valid email address");
    }

    const response = await fetch(`${API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    });

    if (!response.ok) {
      // Handle different error responses
      if (response.status === 409) {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter.",
        };
      } else if (response.status === 400) {
        return {
          success: false,
          message: "Invalid email address. Please check and try again.",
        };
      } else if (response.status >= 500) {
        return {
          success: false,
          message: "Server error. Please try again later.",
        };
      } else {
        return {
          success: false,
          message: "Failed to subscribe. Please try again.",
        };
      }
    }

    return {
      success: true,
      message: "Successfully subscribed! Welcome to the Ninja's Dispatch.",
    };
  } catch (error) {
    console.error("Subscription error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
