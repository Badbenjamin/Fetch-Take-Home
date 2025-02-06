import { useState } from "react"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })

    console.log(formData)

    function onChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(event)

        // e.preventDefault()
        // let submission = { formData }
        // console.log(submission)
        console.log(formData)
        getData(formData)
    }

    const authUrl = "https://frontend-take-home-service.fetch.com/auth/login"
    function getData(formData) {
        fetch(authUrl, {
            headers: {
                "Content-Type": "application/json",
                // "Accept": 'application/json',
            },
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData)
        })
            .then((response) => console.log(response))
        // .then((cookie) => console.log(cookie))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" >Name</label>
                <input onChange={onChange} type="text" id='name' value={formData.name}></input>
                <label htmlFor="email">Email</label>
                <input onChange={onChange} type="text" id='email' value={formData.email}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}