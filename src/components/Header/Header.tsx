import { Link, useMatch, useNavigate } from "react-router-dom";
import { useUserDataStore } from "../../store/user_data";

const HeaderNavlink = ({children, link_to}: any) => {
    const match = useMatch(link_to);
    return <Link to={link_to} className={
        "align-center items-center flex flex-row px-4 cursor-pointer hover:bg-green-500 hover:text-black " +
        (match ? 'text-green-500' : '')
    }>
        {children}
    </Link>
}

const ProfileInfo = () => {
    const navigate = useNavigate();
    const {display_name, profile_img, logout} = useUserDataStore();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return <div className="align-self flex">
         <div className="align-center flex items-center">
            <span className="mx-4 hidden sm:block">{display_name || 'none'}</span>
            <span className="hidden sm:block w-10 h-10 bg-green-500 rounded-full overflow-hidden">
                {profile_img && <img src={profile_img} alt="Profile Image."/>}
            </span>
            <span onClick={handleLogout} className="ml-4 cursor-pointer hover:text-green-500">Logout</span>
        </div>
    </div>
}

const Header = () => {
    return <>
        <header id="header" className=" h-14 bg-black z-10">
            <nav className="flex justify-between px-4 min-h-full">
                <div className="flex flex-flow max-w-60">
                    <HeaderNavlink link_to="/home">
                        <h1>MUSIC-APP</h1>
                    </HeaderNavlink>
                    <HeaderNavlink link_to="/favorites">
                        <span>FAVORITES</span>
                    </HeaderNavlink>
                </div>
                <div className="flex flex-flow max-w-60" >
                    <ProfileInfo/>
                </div>
            </nav>
        </header>
    </>
}

export default Header;