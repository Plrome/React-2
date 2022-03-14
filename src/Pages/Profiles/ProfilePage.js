import React, { useEffect, useState } from "react";
import { profileService } from "../../services/service";
import LoginPage from "../Login/LoginPage";

const ProfilePage = ({ setButtonLog, isLogin, setIsLogin }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        profileService('3')
            .then((response) => {
                setData(response.data)
            })
    }, [isLogin])

    return (
        <div>{
            isLogin ?
                <div style={{margin: '3%'}}>
                    <h2 style={{fontWeight: 'bold'}}>Profile</h2>
                    <h4>Name: {data?.name}</h4>
                    <h4>ID: {data?.id}</h4>
                </div>
                :
                <div>
                    <LoginPage setButtonLog={setButtonLog} isLogin={isLogin} setIsLogin={setIsLogin} />
                    <h4 style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'3%'}}>You need to Login to continue</h4>
                </div>


        }
        </div>
    )
}
export default ProfilePage;