import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./PostRequest.css";

function PostRequest(){
    const [activePage, setActivePage] = useState("postRequest");

    return (
        <>
      <Navbar activePage="postrequest" setActivePage={() => {}} />
      <main>
                <div className="PostReq-Container">
                    <h1 className="Heading">Post for Community Service</h1>
                    <form className="postRequestForm">
                        <div className="form-group">
                            <label className="formTitle1">Title:</label>
                            <input className="inputTitle1" type="text" id="title" name="title" />
                        </div>
                        <div className="form-group">
                            <label className="formTitle1">From:</label>
                            <input className="inputTitle1" type="text" id="from" name="from" />
                        </div>
                        <div className="form-group">
                            <label className="formTitle1">To:</label>
                            <input className="inputTitle1" type="text" id="to" name="to" />
                        </div>
                        <div className="form-group">
                            <label className="formTitle1">Location:</label>
                            <input className="inputTitle1" type="text" id="location" name="location" />
                        </div>
                        <div className="form-group">
                            <label className="formTitle1">Description: </label>
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
