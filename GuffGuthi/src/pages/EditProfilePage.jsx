import EditProfile from "../components/profileComponents/EditProfile";
import Navbar from "../components/navbar/Navbar";

function EditProfilePage(){
    return(
        <>
        <Navbar activePage="editProfilePage" setActivePage={() => {}} />
        <EditProfile />
        </>
    )
}

export default EditProfilePage