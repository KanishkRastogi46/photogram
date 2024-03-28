import React, { useContext } from "react";

const user= React.createContext({
    userDetails: {
        username: "",
        email: "",
        password: "",
        avatar: "",
        posts: 0,
        followers: 0,
        following: 0,
        bio: ""
    },
    setUserDetails: function(){}
});

const UserProvider= user.Provider;

const userContext= function(){
    return useContext(user);
}

export {
    UserProvider,
    userContext
};