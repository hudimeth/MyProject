import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Carousel.Caption>
                    <h1>FOR ALL NEW MEMBERS:</h1>
                    <h3>Free Shipping on orders of $300+</h3>
                    <h4>Coupon Code: NewMember!</h4>
                    <div style={{ height:200 }}></div>
                </Carousel.Caption>
                <div className="bg-warning bg-gradient" style={{ height: 600 }} >
                    <div className="vr">
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={{ height: 600, backgroundColor: 'hotpink' }} >
                    <div className="vr">
                    </div>
                </div>
                <Carousel.Caption>
                    <h1>Pre-Purim Sale</h1>
                    <h2>For every $500 spent get back $50</h2>
                    <h4>Coupon Code: dG35ms</h4>
                    <div style={{ height: 200 }}></div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="bg-dark" style={{ height: 600 }} >
                    <div className="vr">
                    </div>
                </div>
                <Carousel.Caption>
                    <h1>Mazel Tov on your newest addition!</h1>
                    <h3>In honor of the birth of your first child, enjoy 15% off your order!</h3>
                    <h4>Coupon Code: baby2024</h4>
                    <div style={{ height: 150 }}></div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;
