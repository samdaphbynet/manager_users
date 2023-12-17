import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddCategory = () => {
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!category) {
                setError("Category is required");
                return;
            }

            const response = await axios.post("https://https://manager-users-server.vercel.app/add_category", { category });

            if (response.data.Status) {
                navigate("/dashbord/category");
            } else {
                setError(response.data.Error);
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while processing your request");
        }
    };

    return (
        <div className="container">
            <div className="login-page">
                <form action="" className="form" onSubmit={handleSubmit}>
                    <h1>Add Category</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="email">
                        <label htmlFor="category">Category:</label>
                        <input
                            name="category"
                            type="text"
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <button className="btn" type="submit">
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};
