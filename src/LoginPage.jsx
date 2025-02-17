import { useState } from "react"
import { useNavigate } from "react-router"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })
    let navigate = useNavigate()
    const authUrl = "https://frontend-take-home-service.fetch.com/auth/login"

    // update formData state with inputs from forms
    function onChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // make sure form does not clear by preventing default
    function handleSubmit(event) {
        event.preventDefault()
        getData(formData)
    }

    // POST fetch with formData to auth/login endpoint. 
    function getData(formData) {
        fetch(authUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok){
                    console.log(response)
                    navigate('/home')
                } else {
                    window.alert('please provide a valid email address and name.')
                }
            }) 
    }

    return (
        <div className="login">
            <h2>LOGIN</h2>
            <form className="login-fields" onSubmit={handleSubmit}>
                <label htmlFor="name" >NAME </label>
                <input onChange={onChange} type="text" id='name' value={formData.name}></input>
                <br></br>
                <label htmlFor="email">EMAIL </label>
                <input onChange={onChange} type="text" id='email' value={formData.email}></input>
                <br></br>
                <input type="submit"></input>
            </form>
        </div>
    )
}