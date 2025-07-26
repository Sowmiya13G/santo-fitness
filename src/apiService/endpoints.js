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
    UPDATE_WORKOUT: "/update-workout",
    DELETE_WORKOUT: "/delete-workout",
  },
  DAILY_LOGS: {
    GET_DIET_PROGRESS: "/diet-progress",
    CREATE_DAILY_LOGS: "/daily-logs",
  },
  REPORT: {
    GET_REPORT: "/reports",
    ADD_REPORT: "/reports",
  },
  FILE: {
    UPLOAD_FILE: "/file/upload",
  },
  PROGRESS: {
    BODY_PROGRESS: "/body-progress",
  },
};

export default API_ENDPOINTS;
