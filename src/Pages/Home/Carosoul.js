import React from 'react';

const Carosoul = () => {
    return (
        <div>
        <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://images.adsttc.com/media/images/512e/1260/b3fc/4b00/6d00/01a1/large_jpg/JM_ClinicaDentaria_PauloMerlini_047.jpg?1361973845" alt='clinic-1' className="w-full rounded-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a> 
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div> 
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://yoursignaturesmile.com/wp-content/uploads/2019/03/very-white-dental-office.jpg" alt='clinic-2' className="w-full rounded-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a> 
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div> 
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/b1bce191300193.5e2ebd5c0b18c.jpg" alt='clinic-3' className="w-full rounded-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a> 
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div> 
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://media.istockphoto.com/photos/group-of-doctors-at-the-hospital-picture-id512278456?b=1&k=20&m=512278456&s=170667a&w=0&h=LfLLU5beDKqeFhH4HQoQ54O_LtNwLmdcYFQjM_2HeZc=" alt='clinic-4' className="w-full rounded-lg" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a> 
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Carosoul;