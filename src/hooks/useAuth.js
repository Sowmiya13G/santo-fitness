export const useAuth = () => {
    const isLoggedIn = localStorage.getItem('token') !== null
    console.log('isLoggedIn: ',localStorage.getItem('token'), isLoggedIn);
    return { isLoggedIn }
  }
  