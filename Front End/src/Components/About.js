import React from 'react';
import './About.css'; // Make sure to import the CSS file for styling
import Navbar from './Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="ground">
        <div className="contact-container">
          <div className='content-ffn'>
            <h1 style={{ marginLeft: "20px" }}>About us</h1>
            <div className='photo'>
              <imgage src="D:\myapp\src\assets\aboutus.jpg"alt="About us"style={{ width: "200px", marginRight: "20px" }}/>
            </div>
          </div>
          <div className='about-cs'>
            <p style={{ marginTop: "90px" }}>
              We are driven by a passion for excellence and a commitment to providing top-notch solutions for our valued clients.
              Established in 1976, we have steadily grown into a leading force in the industry, thanks to our unwavering dedication to innovation and customer satisfaction.
            </p>
            <p>
              Our mission is simple yet powerful: to empower businesses of all sizes with the tools they need to thrive in today's dynamic market.
              Through our state-of-the-art inventory management system, tailored solutions, and expert support, we enable businesses to streamline their operations, enhance efficiency, and boost profitability.
              We believe that success lies in understanding the unique needs of each client, and our team of seasoned professionals works tirelessly to deliver personalized solutions that align with your business goals.
            </p>
            <p>
              We pride ourselves on staying at the forefront of technological advancements. Our commitment to innovation ensures that our clients have access to cutting-edge tools and resources, allowing them to adapt quickly to changing market demands.
              With a focus on reliability, security, and user-friendliness, our platform offers a seamless experience that inspires confidence and trust.
              Join us on this transformative journey and discover a world of endless possibilities for your business. Together, let's shape a brighter future!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
