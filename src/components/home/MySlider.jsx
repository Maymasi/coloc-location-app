import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { House } from 'lucide-react';
import Slider from "react-slick";
export default function MySlider(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };
    return(
        <Slider {...settings} >
        <div >
            <div style={{height:"75vh"}}>
                <div className="title">
                    <House/>
                    <p>University destrict</p>
                </div>
            </div>
        </div>
        <div>
            <h3>2</h3>
        </div>
        <div>
            <h3>3</h3>
        </div>
        <div>
            <h3>4</h3>
        </div>
        <div>
            <h3>5</h3>
        </div>
        <div>
            <h3>6</h3>
        </div>
        </Slider>
    );
}