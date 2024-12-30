import styles from "./EditProfile.module.css"
import React, { useState, useRef } from "react";


function EditProfile() {
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null); // Create a reference to the hidden file input

    const handleButtonClickProfile = () => {
        fileInputRef.current.click(); // Trigger the hidden file input when the button is clicked
    };

    const handleImageChangeProfile = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setProfileImage(imageUrl);
        }
    };

    const [coverImage, setCoverImage] = useState(null);
    const fileInputRef2 = useRef(null);

    const handleButtonClickCover = () => {
        fileInputRef2.current.click(); // Trigger the hidden file input when the button is clicked
    };

    const handleImageChangeCover = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setCoverImage(imageUrl);
        }
    };

    return(
        <>
            <section className= {styles.editProfile}>
                <h1>Edit profile</h1>
                <div className= {styles.profile}>
                    <p>Change profile</p>
                    <img className= {styles.profileImg} 
                        src={profileImage || "./src/assets/profile.jpg"} 
                        alt="Profile" />
                    <button onClick={handleButtonClickProfile}>
                        Change profile
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef} // Connect the input to the ref
                        onChange={handleImageChangeProfile}
                        style={{ display: "none" }} // Hide the input element
                    />
                </div>
                <div className= {styles.introContainer}>
                    <form >
                        <div>
                            <label>Change username</label>
                            <br />
                            <input type="text" />
                            <br />
                            <label>Bio</label>
                            <br />
                            <input type="text" />
                            <br />
                            <label>Occupation</label>
                            <br />
                            <input type="text" />
                            <br />
                            <label>Change location</label>
                            <br />
                            <input type="text" />
                            <br />
                            <label> Cover image</label>
                            <button type="button" onClick={handleButtonClickCover}>
                                Change cover
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef2} 
                                onChange={handleImageChangeCover}
                                style={{ display: "none" }} 
                            />
                            <img 
                                className={styles.coverImg} 
                                src={coverImage || "./src/assets/SwayambuCover.jpg"} 
                                alt="cover image" 
                            />
                        </div>
                        <br />
                        <button className= {styles.updateProfile} >Update profile</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditProfile