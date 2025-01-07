import React from "react";
import Navbar from "../components/navbar/Navbar";
import './PostRequest.css';

const PostRequest = () => {
    return (
        <>
            <Navbar />
            <main>
                <div className="PostReq-Container">
                    <h1 className="Heading">Post Request</h1>
                    <form>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" id="title" name="title" />
                        </div>
                        <div className="form-group">
                            <label>From:</label>
                            <input type="text" id="from" name="from" />
                        </div>
                        <div className="form-group">
                            <label>To:</label>
                            <input type="text" id="to" name="to" />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text" id="location" name="location" />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea id="description" name="description" rows="5" />
                        </div>
                        <button className="post-request-btn">Post Request</button>
                    </form>
                    
                    
                </div>
            </main>
        </>
    );
};

export default PostRequest;