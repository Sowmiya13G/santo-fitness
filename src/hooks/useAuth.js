// You can replace this with real auth (context or redux)
export const useAuth = () => {
    const isLoggedIn = localStorage.getItem('token') !== null
    return { isLoggedIn }
  }
  