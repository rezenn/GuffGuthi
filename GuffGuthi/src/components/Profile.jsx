import "./profile.css"

function Profile(){
    return(
        <>
            <section>
                <div className="profileImg">
                    <img className="profile" src="./src/assets/profile.jpg" alt="Profile" />
                </div>
                <div className="intro">
                    <div className="name">
                        <p>Royan Guy</p>
                    </div>
                    <div >
                        <pre className="bio">Journaling everything</pre>
                        <br />
                        <p className="Ocupation"> Journalist</p>
                        <div className="locationBlock">
                            <img className="locationImg" src="./src/assets/location-pointer.png" alt="location pin" />
                            <p className="LocationName">Kathmandu,Nepal</p>
                        </div>
                    </div>
                </div>
                <div className="followShow">
                    <div>
                        <p className="followerCount">122</p>
                        <p className="followers">followers</p>
                    </div>
                    <div>
                        <p className="followingCount">67</p>
                        <p className="following">following</p>
                    </div>
                    <div>
                        <p className="likeCount">37K</p>
                        <p className="likes">Likes</p>
                    </div>
                </div>
                <button className="editProfile">Edit profile</button>
            </section>
        
        </>
    )
}
export default Profile;