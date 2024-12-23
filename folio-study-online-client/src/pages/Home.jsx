import Banner from "../components/Banner";
import Faq from "../components/Faq";
import Feature from "../components/Feature";
import Nav from "../components/Nav";

const Home = () => {

    return (
        <div className="relative">
            <Nav checker={true}></Nav>
            <Banner></Banner>
            <Feature></Feature>
            <Faq></Faq>
        </div>
    );
};

export default Home;