
import styles from "./profile.module.css";
import { Link } from "react-router-dom"; 

function Profile(){
    return(
        <>
            <section>
                <div className={styles.profileImg}>
                    <img className= {styles.profile} src="./src/assets/profile.jpg" alt="Profile" />
                </div>
                <div className= {styles.intro}>
                    <div className= {styles.name}>
                        <p>Royan Guy</p>
                    </div>
                    <div >
                        <pre className= {styles.bio} >Journaling everything</pre>
                        <br />
                        <p className= {styles.Ocupation} > Journalist</p>
                        <div className= {styles.locationBlock}>
                            <img className= {styles.locationImg} src="./src/assets/location-pointer.png" alt="location pin" />
                            <p className= {styles.LocationName}>Kathmandu,Nepal</p>
                        </div>
                    </div>
                </div>
                <div className= {styles.followShow}>
                    <div>
                        <p className= {styles.followerCount}>122</p>
                        <p className= {styles.followers}>followers</p>
                    </div>
                    <div>
                        <p className= {styles.followingCount}>67</p>
                        <p className= {styles.following}>following</p>
                    </div>
                    <div>
                        <p className= {styles.likeCount}>37K</p>
                        <p className= {styles.likes}>Likes</p>
                    </div>
                </div>
                <button className={styles.editProfile}>
  <Link to="/EditProfile" className={styles.link}>
    Edit Profile
  </Link>
</button>

            </section>
        
        </>
    )
}
export default Profile;