import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const ForgetPassword = () => {
    let id = useParams();
    const token = Cookies.get("UserToken");
    const navigator = useNavigate();
    const [loginData, setLoginData] = useState({
        password: "",
        confirmPassword: "",
    });

    const onchangeInput = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const resetPassword = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.put(`${import.meta.env.VITE_API_KEY}/api/v1/password/reset/${id.id}`, {
                ...loginData
            }, {
                headers: {
                    Authorization: token
                }
            })
            console.log(data)
            toast.success('reset')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>

            <div className="logincontainer">
                <form>
                    <span onClick={() => navigator("/")}>
                        <RiCloseCircleLine />
                    </span>
                    <h3>Reset Password</h3>
                    <hr />
                    <input
                        type="text"
                        placeholder="New Password"
                        name="password"
                        value={loginData.password}
                        onChange={onchangeInput}
                    />
                    <input
                        type="text"
                        placeholder="Confirm New password"
                        name="confirmPassword"
                        value={loginData.confirmPassword}
                        onChange={onchangeInput}
                    />

                    <button onClick={resetPassword} >Reset Password</button>

                </form>
            </div>

        </>
    )
}

export default ForgetPassword