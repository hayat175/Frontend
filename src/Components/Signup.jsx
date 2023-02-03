import {useState} from "react"
import axios from 'axios';

const Signup = () =>{
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUserType] = useState("admin");
    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = (event) =>{
        console.log(firstname, lastname, username, password, usertype);
        event.preventDefault();
        console.log("submit")
        axios.post('http://localhost:3000/signup', {
            
            userName: username,
            password: password,
            userType: usertype,
            data: {
                firstName: firstname,
                lastName: lastname,
            }
          })
          .then(function (response) {
            console.log(response);
            setErrors("")
            setSuccess("Record added successfully")
          })
          .catch(function (error) {
            setErrors(error.response.data.error)
            console.log(error.response);
            setSuccess("")
          });
    }
    return(
        <section className="signupform">
        <h1>Signup</h1>
        {errors !== "" && (<h6 className="error">{errors}</h6>)}
        {success !== "" && (<h6 className="success">{success}</h6>)}
        <form>
            <label htmlFor="firstname">Enter first name</label>
            {firstname}
            <input id="firstname" type="text" name="firstname" value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} />
            <label htmlFor="lastname">Enter last name</label>
            <input id="lastname" type="text" name="lastname" value={lastname} onChange={(e)=>{setLastName(e.target.value)}} />
            <label htmlFor="username">Enter user name</label>
            <input id="username" type="text" name="username" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
            <label htmlFor="password">Enter password</label>
            <input id="password" type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <label htmlFor="usertype">Enter usertype</label>
            <select name="usertype" id="usertype" value={usertype} onChange={(e)=>{setUserType(e.target.value)}}>
                <option value="admin">Admin</option>
            </select>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
        </section>
    )
}

export default Signup;