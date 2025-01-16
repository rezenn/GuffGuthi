import CommunityServices from "../components/REQUEST/Request";
import Navbar from "../components/navbar/Navbar";

function CommunityServicesPage(){
    return(
        <>
        <Navbar className="Navbar" activePage="communityServices" setActivePage={() => {}} />
        <CommunityServices/>
        </>
    )
}

export default CommunityServicesPage;