import { Link } from "react-router-dom"
import axios from "axios"
import {useEffect, useState} from 'react'


export const Employer = () => {

    // const cate = document.querySelector('.cate');
    // console.log(cate);

    // fetch("http://localhost:5000/category")
    // .then((res) => res.json())
    // .then((data) => {
    //     cate.innerHTML += "test"
    // })

    const [employ, setEmployer] = useState([]);

    useEffect(() => {
        axios.get("https://manager-users-server.vercel.app/employ")
            .then(res => {
                if (res.data.Status) {
                    setEmployer(res.data.Data)
                }
            }).catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete("https://manager-users-server.vercel.app/delete/"+id)
            .then(res => {
                if (res.data.Status) {
                    window.location.reload(false);
                    Navigate("/dashbord/employer")
                }
                else {
                    alert(Error)
                }
            })
    }

    return (
        <div className="employer">
            <h3>List Of Employers</h3>
            <Link to="/dashbord/add_employer" className="addemployer">Add Employer</Link>
            <table className="table_employer">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>address</th>
                        <th>salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employ && employ.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td><img className="image" src={`https://manager-users-server.vercel.app/images/` + item.image} alt="" /></td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.salary}</td>
                                <td className="btn-employ">
                                    <Link className="button" to={`/dashbord/edit_employer/`+ item.id}>Edit</Link>
                                    <Link className="button" onClick={() => handleDelete(item.id)}>Delete</Link>
                                </td>

                            </tr>
                        ))
                    }                  
                </tbody>
            </table>
        </div>
    )
}