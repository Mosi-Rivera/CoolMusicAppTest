import Container from "../../components/Container/Container"
import FavoritesSection from "../../components/FavoritesSection/FavoritesSection"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

const FavoritesPage = () => {
    return <Container>
        <Header/>
        <main className='px-2 flex flex-row flex-wrap justify-center box-content'>
            <FavoritesSection/>
        </main>
        {/* <Footer/> */}
    </Container>
}

export default FavoritesPage;