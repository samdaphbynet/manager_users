import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Category = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("https://manager-users-server.vercel.app/category")
            .then(res => {
                if (res.data.Status) {
                    setCategory(res.data.Data || []); // Assurez-vous que Data est défini et est un tableau
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="category">
            <h3>List Of Categories</h3>

            <Link to="/dashbord/add_category" className="addcategory">Add Category</Link>
            <div className="category_table">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {category && category.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    );
};
