const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    FORGET_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  USER: {
    SAVE_FCM_TOKEN: "/save-token",
    USER: "/users",
    USERS: "/users-list",
  },
  WORKOUT: {
    CREATE_WORKOUT: "/create-workout-notes",
    GET_CLIENT_WORKOUT: "/get-all-workouts",
    UPDATE_WORKOUT:"/update-workout"
  },
};

export default API_ENDPOINTS;
