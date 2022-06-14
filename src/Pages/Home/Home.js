import React from 'react';
import Banner from './Banner';
import Carosoul from './Carosoul';
import Contact from './Contact';
import FeaturedDoctors from './FeaturedDoctors';
import Footer from './Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div className=' lg:px-12 lg:py-12'>
            <Carosoul></Carosoul>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <FeaturedDoctors></FeaturedDoctors>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;