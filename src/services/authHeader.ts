
export const authHeader = () => {
    const userStr = localStorage.getItem("user");
    let user = null;

    if (userStr){
        user = JSON.parse(userStr)
    }
    
    if(user && user.accessToken){
        return { AUthorization: 'Bearer ' + user.accessToken};
    } else {
        return { Authorization: '' };
    }
}