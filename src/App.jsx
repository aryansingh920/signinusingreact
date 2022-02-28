import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const App = () => {
    const [fullName,
        setFullName] = useState("");
    const [email,
        setEmail] = useState("");
    const [password,
        setPassword] = useState("");
    const [username,
        setUsername] = useState("");
    const [status,
        setStatus] = useState("");
    const [usersList,
        setUserList] = useState([]);

    const deleteUser = (user) => {
        console.log(user)
    }

    // console.log(fullName, email, password, username);

    axios
        .get("https://obscure-everglades-02620.herokuapp.com/app/addedUser")
        .then((res) => {
            // console.log(res.data);
            setUserList(res.data);
        })
        .catch((err) => {
            setUserList("Loading");
        });

    const formSubmit = (e) => {
        e.preventDefault();

        // console.dir(e.target.value)
        if (fullName !== "" && email !== "" && password != "" && username != "") {
            const registered = {
                fullname: fullName,
                username: username,
                email: email,
                password: password
            }

            axios
                .post("https://obscure-everglades-02620.herokuapp.com/app/signup", registered)
                .then(Response => {
                    console.log(Response.data)
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    setStatus("Status : User added succesfully");
                })
                .catch(error => {
                    console.log(error);
                    setStatus("Status : User not added");
                });
        } else {
            setStatus("Invalid or Empty Input")
        }

    }

    return (
        <div>
            <div className="container ">
                <div className="form-div ">
                    <br/>
                    <h3 style={{
                        textAlign: "center"
                    }}>Signup Form</h3>
                    <form
                        onSubmit={(e) => {
                        formSubmit(e)
                    }}>
                        <input
                            type="text"
                            value={fullName}
                            className="form-control form-group"
                            placeholder="Enter Full Name"
                            onChange={(e) => {
                            setFullName(e.target.value);
                            setStatus("Typing....");
                        }}/>

                        <input
                            type="text"
                            value={username}
                            className="form-control form-group"
                            placeholder="Enter Username"
                            onChange={(e) => {
                            setUsername(e.target.value);
                            setStatus("Typing....");
                        }}/>

                        <input
                            type="text"
                            value={email}
                            className="form-control form-group"
                            placeholder="Enter Email"
                            onChange={(e) => {
                            setEmail(e.target.value);
                            setStatus("Typing....");
                        }}/>

                        <input
                            type="password"
                            value={password}
                            className="form-control form-group"
                            placeholder="Enter PassWord"
                            onChange={(e) => {
                            setPassword(e.target.value);
                            setStatus("Typing....");
                        }}/>

                        <input
                            value="Submit"
                            type='submit'
                            className='btn btn-info form-control form-group d-grid'/>
                    </form>

                    <code
                        style={{
                        textAlign: "center"
                    }}>{status}</code>

                    <br/>
                    <hr/>
                    <h4>Registered Users</h4>
                    <hr/>

                    <table class="table">
                        <tr>
                            <td>
                                <th>Full Name</th>
                                {usersList.map((user) => {
                                    return (
                                        <tr>{user.fullname}</tr>
                                    )
                                })}
                            </td>
                            <td>
                                <th>Username</th>
                                {usersList.map((user) => {
                                    return (
                                        <tr>{user.username}</tr>
                                    )
                                })}
                            </td>
                            <td>
                                <th>Email</th>
                                {usersList.map((user) => {
                                    return (
                                        <tr>{user.email}</tr>
                                    )
                                })}
                            </td>
                            <td>
                                <th>.</th>
                                {usersList.map((user) => {
                                    return (
                                        <tr>
                                        Delete
                                        </tr>
                                    )
                                })}
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default App;