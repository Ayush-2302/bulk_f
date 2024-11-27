import React from "react";

const About = () => {
  return (
    <div className="">
      <div className="w-11/12 mx-auto ">
        <h1 className="text-3xl font-semibold text-center mb-6">
          About Our Project
        </h1>
        <div className="w-11/12 mx-auto shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-lg leading-relaxed">
              Welcome to our project built on the MERN stack! We're excited to
              present a dynamic web application that offers full CRUD (Create,
              Read, Update, Delete) functionality alongside seamless image
              uploading capabilities, all powered by Cloudinary. Our project is
              crafted with React, Tailwind CSS, and integrates with the powerful
              features of Cloudinary for a robust and user-friendly experience.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Key Features:</h2>
            <ul className="list-disc pl-6">
              <li> SIGNUP AND LOGIN </li>
              <li>JWT AUTHONTICATION</li>
              <li>MERN Stack Integration</li>
              <li>CRUD Operations</li>
              <li>Image Uploading with Cloudinary</li>
              <li>React and Tailwind CSS</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Beautiful Design and User Experience:
            </h2>
            <p className="text-lg  leading-relaxed">
              We understand the importance of aesthetics and user experience.
              Our project features a clean and visually appealing design,
              coupled with intuitive navigation and smooth interactions.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Future Enhancements:
            </h2>
            <ul className="list-disc pl-6">
              <li>
                Enhanced security features such as authentication and
                authorization.
              </li>
              <li>
                Integration with additional APIs for extended functionality.
              </li>
              <li>Performance optimizations for faster loading times.</li>
              <li>Customizable themes and styling options.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-4">Get Involved:</h2>
            <p className="text-lg  leading-relaxed">
              We're always open to feedback and contributions from the
              community. Whether you're a developer looking to contribute code
              or a user with suggestions for improvement, we welcome your input.
              Join us on our journey to build innovative and impactful web
              applications!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
