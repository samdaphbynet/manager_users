import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export const AddEmployer = () => {
    const navigate = useNavigate();
    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        image: "",
        category_id: ""
    })

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/category")
            .then(res => {
                if (res.data.Status) {
                    setCategory(res.data.Data || []); // Assurez-vous que Data est défini et est un tableau
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
            formData.append('name', employer.name);
            formData.append('email', employer.email);
            formData.append('password', employer.password);
            formData.append('salary', employer.salary);
            formData.append('address', employer.address);
            formData.append('category_id', employer.category_id);
            formData.append('image', employer.image);

        axios.post("https://https://manager-users-server.vercel.app/add_employer", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => {
                if (res.data.Status) {
                    navigate("/dashbord/employer")
                } else {
                    alert("Not Success")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className='login-page'>
                <form action="" className='form' onSubmit={handleSubmit}>
                    <h3 style={{textAlign: "center"}}>Add Employer</h3>
                    <div className="name">
                        <label htmlFor="name">Name:</label>
                        <input name='name' type="text" placeholder='Enter Name' 
                            onChange={(e) => setEmployer({...employer, name: e.target.value})}/>
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input name='email' type="text" placeholder='Enter Email' 
                            onChange={(e) => setEmployer({...employer, email: e.target.value})}/>
                    </div>

                    <div className="password">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" placeholder='Enter Password' 
                            onChange={(e) => setEmployer({...employer, password: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="salary">Salary:</label>
                        <input name="salary" type="number" placeholder='Enter Salary' 
                            onChange={(e) => setEmployer({...employer, salary: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="address">Address:</label>
                        <input name="address" type="address" placeholder='Enter Address' 
                            onChange={(e) => setEmployer({...employer, address: e.target.value})}/>
                    </div>

                    <div className="name">
                        <label htmlFor="category">Select Category:</label>
                        <select name="category" id="category"
                            onChange={(e) => setEmployer({...employer, category_id: e.target.value})}>
                            {
                                category && category.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                }
                                )
                            }
                        </select>
                    </div>

                    <div className="name">
                        <label htmlFor="select image">select Image:</label>
                        <input name="image" type="file" 
                            onChange={(e) => setEmployer({...employer, image: e.target.files[0]})}/>
                    </div>

                    <button className='btn' type='submit'>Log In</button>


                </form>
            </div>
        </div>
    )
}