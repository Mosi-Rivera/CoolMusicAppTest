import { redirectToAuth } from '../../api/spotify';
import Container from '../../components/Container/Container';

const LoginCard = () => {
    return <div className='max-w-lg text-center p-4 text-white rounded-xl mx-4 green-svg'>
        <span>
            <h1 className='font-bold text-4xl mb-8'>Music-App</h1>
            <p className='l font-medium text-white text-opacity-80 text-lg'>Upgrade your Spotify playlist: Tailored music suggestions, easy discovery, seamless integration.</p>
        </span>
        <div className='bg-green-500 max-w-fit mx-auto text-black font-bold text-xl rounded-full py-2 px-10 cursor-pointer mt-20 hover:scale-105'>
            <div onClick={redirectToAuth}>Login with Spotify</div>
        </div>
    </div>
}

const LoginPage = () => {
    return (<Container>
        <div className='mx-auto flex justify-center items-start h-screen w-screen bg-black pt-40'>
            <LoginCard/>
        </div>
    </Container>);
}

export default LoginPage;