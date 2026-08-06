import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function PostInternship() {

    const [internship, setInternship] = useState({

        employer_id: 1,
        title: "",
        description: "",
        location: "",
        category: "",
        required_skills: "",
        stipend: "",
        duration: "",
        deadline: ""

    });

    const handleChange = (e) => {

        setInternship({

            ...internship,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5001/api/internships",
                internship
            );

            alert("Internship posted successfully!");

            setInternship({

                employer_id: 1,
                title: "",
                description: "",
                location: "",
                category: "",
                required_skills: "",
                stipend: "",
                duration: "",
                deadline: ""

            });

        } catch (err) {

            alert(err.response?.data?.message || "Unable to post internship");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2>Post Internship</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        name="title"
                        placeholder="Title"
                        value={internship.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        name="description"
                        placeholder="Description"
                        value={internship.description}
                        onChange={handleChange}
                    ></textarea>

                    <input
                        className="form-control mb-3"
                        name="location"
                        placeholder="Location"
                        value={internship.location}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        name="category"
                        placeholder="Category"
                        value={internship.category}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        name="required_skills"
                        placeholder="Required Skills"
                        value={internship.required_skills}
                        onChange={handleChange}
                    ></textarea>

                    <input
                        className="form-control mb-3"
                        type="number"
                        name="stipend"
                        placeholder="Stipend"
                        value={internship.stipend}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        name="duration"
                        placeholder="Duration"
                        value={internship.duration}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        type="date"
                        name="deadline"
                        value={internship.deadline}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary">

                        Post Internship

                    </button>

                </form>

            </div>

        </>

    );

}

export default PostInternship;