import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export const EditEmployer = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: ""
    })

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/category")
            .then(res => {
                if (res.data.Status) {
                    setCategory(res.data.Data || []); // Assurez-vous que Data est défini et est un tableau
                }
            }).catch(err => console.log(err));

            axios.get("http://localhost:8080/employ/"+id)
            .then(result => {
                setEmployer({
                    ...employer,
                    name: result.data[0].name,
                    email: result.data[0].email,
                    password: result.data[0].password,
                    salary: result.data[0].salary,
                    address: result.data[0].address,
                    category_id: result.data[0].category_id

                })
            });

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put("http://localhost:8080/edit_employer/"+id, employer)
            .then(resuslt => {
                if (resuslt.data.Status) {
                    navigate("/dashbord/employer")
                }
            }).catch(err => console.log(err))

    }

    return (
        <div className="container">
            <div className='login-page'>
                <form action="" className='form' onSubmit={handleSubmit}>
                    <h3 style={{textAlign: "center"}}>Edit Employer</h3>
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input name='name' type="text" placeholder='Enter Name'
                            value={employer.name}
                            onChange={(e) => setEmployer({...employer, name: e.target.value})}/>
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input name='email' type="text" placeholder='Enter Email' 
                        value={employer.email}
                            onChange={(e) => setEmployer({...employer, email: e.target.value})}/>
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="text" placeholder='Enter Password' 
                        value={employer.password}
                            onChange={(e) => setEmployer({...employer, password: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="salary">Salary:</label>
                        <input name="salary" type="number" placeholder='Enter Salary' 
                        value={employer.salary}
                            onChange={(e) => setEmployer({...employer, salary: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="address">Address:</label>
                        <input name="address" type="address" placeholder='Enter Address' 
                        value={employer.address}
                            onChange={(e) => setEmployer({...employer, address: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="category">Select Category:</label>
                        <select name="category" id="category"
                        value={employer.category_id}
                            onChange={(e) => setEmployer({...employer, category_id: e.target.value})}>
                            {
                                category && category.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                }
                                )
                            }
                        </select>
                    </div>

                    <button className='btn' type='submit'>Edit Employer</button>


                </form>
            </div>
        </div>
    )
}