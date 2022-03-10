import UserContext from './userContext';
import { useState } from 'react';

function UserState(props) {
    const host = "http://localhost:5000";
    const [userAuthres, setUserAuthres] = useState(null);

    const signup = async (user_name, email, password, shippingAddress, billingAddress, phoneNo) => {

        const status = user_name.includes('admin') ? 'admin' : 'user';

        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user_name, email, password,
                shippingAddress,
                billingAddress,
                phoneNo, status
            })
        })
        // setUserAuthres(await response.json());
        return await response.json();
    }
    
    const login = async (email,password) => {
        const response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json();
        if(data.type==="success")
        {
            setUserAuthres(data.user);
        }
        return data;
    }

    return (
        <UserContext.Provider value={{ signup, login, userAuthres, setUserAuthres }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserState;