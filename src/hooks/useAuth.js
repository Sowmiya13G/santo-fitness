export const useAuth = () => {
    const isLoggedIn = localStorage.getItem('token') !== null
    return { isLoggedIn }
  }
  