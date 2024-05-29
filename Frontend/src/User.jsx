import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import './frontend.css';

const User = () => {
  const handleLogout = () => {
    axios.get('http://localhost:3002/logout')
      .then(res => {
        window.localStorage.removeItem("userId");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
            <div className="container-fluid">
        <div className="row header">
          <div className="header_menu">
            <img src="images/Logo.png" alt="" />
            <div className="aboutus">
              <img src="images/Ellipse 1.png" alt="" width="9px" height="9px" />
              <h4>About Us</h4>
            </div>
            <div className="projects">
              <img src="images/Ellipse 2.png" alt="" width="9px" height="9px" />
              <h4>Projects</h4>
            </div>
            <div className="news">
              <img src="images/Ellipse 2.png" alt="" width="9px" height="9px" />
              <h4>News</h4>
            </div>
            <div className="contact">
              <img src="images/Ellipse 2.png" alt="" width="9px" height="9px" />
              <h4>Contacts</h4>
            </div>
            <img src="images/Social.png" alt="" />
          </div>
          <div className="header_main">
            <h1>SIMPLE & MODERN</h1>
            <p>WE MAKE THE WORLD BEAUTIFUL EVERYDAY</p>
            <img src="images/Arrow.png" alt="" />
          </div>
        </div>

        <div className="row nav">
          <hr style={{ width: "40px", marginTop: "40px" }} />
          <h1>WHAT WE DO</h1>
        </div>

        <div className="row content-1">
          <div className="content1_flex">
            <div className="col-6 images">
              <img src="images/Rectangle 3.png" className="img1" alt="" width="600px" height="470px" />
              <img src="images/joel-filipe-151697 1.png" className="img2" alt="" width="600px" height="470px" />
            </div>
            <div className="col-6 text">
              <h3>ONE WORLD</h3>
              <h1>TRADE CENTER</h1>
              <p>Increasing prosperity in our lives can be accomplished by having the right frame of mind. The truth is, our thoughts are very powerful.</p>
              <button className="btn">MORE DETAILS</button><br /><br />
              <h5>New York City, United States - 1776 feet</h5>
            </div>
          </div>

          <div className="content1_flex1">
            <div className="col-6 text1">
              <h3>INTERNATIONAL</h3>
              <h1>COMMERCE CENTRE</h1>
              <p>Successful businesses have many things in common, today we’ll look at the big ‘R’ of recognition and how a digital advertising network may help.</p>
              <button className="btn">MORE DETAILS</button><br /><br />
              <h5>Hong Kong - 1588 feet</h5>
            </div>

            <div className="col-6 images1">
              <img src="images/photos-1284iH4Hjf4mhNgW 1.png" className="img3" alt="" width="600px" height="470px" />
              <img src="images/Rectangle 3 (1).png" className="img4" alt="" width="600px" height="470px" />
            </div>
          </div>
        </div>

        <div className="row content-2">
          <div className="content-2_header">
            <hr style={{ width: "40px" }} />
            <h1>LATEST NEWS</h1>
          </div>
          <div className="content_box">
            <div className="box1" style={{ marginLeft: "70px" }}>
              <img src="images/Image (1).png" alt="" width="270px" />
              <h3>SEE THE UNMATCHED BEAUTY OF THE GREAT.</h3>
              <p>Free directories: directories are perfect for customers that are searching for...</p><br />
              <div className="icon1">
                <img src="images/photos-13323TAfapiSrc9IO23 1.png" alt="" className="box1_img" style={{ marginLeft: "10px" }} />
                <div className="icon1_text">
                  <h4>ALJA BRUN</h4>
                  <p>20 Jan 2020</p>
                </div>
              </div>
            </div>

            <div className="box2" style={{ marginLeft: "20px" }}>
              <img src="images/Image (2).png" alt="" width="270px" />
              <h3>EFFECTIVE ADVERTISING POINTERS.</h3>
              <p>Having a home based business is a wonderful asset to your life...</p><br />
              <div className="icon1">
                <img src="images/photos-13323vsWmKApDZJIh 1.png" alt="" className="box1_img" style={{ marginLeft: "10px" }} />
                <div className="icon1_text">
                  <h4>DOMINIC FREEMAN</h4>
                  <p>13 Dec 2019</p>
                </div>
              </div>
            </div>

            <div className="box3" style={{ marginLeft: "20px" }}>
              <img src="images/Image (3).png" alt="" width="269px" />
              <h3>HYPNOTIZE YOURSELF INTO THE GHOST.</h3>
              <p>There are many things that are important to catalog design...</p><br />
              <div className="icon1">
                <img src="images/photos-13323TAfapiSrc9IO 1.png" alt="" className="box1_img" style={{ marginLeft: "10px" }} />
                <div className="icon1_text">
                  <h4>ALICE WARD</h4>
                  <p>30 Nov 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row content-3">
          <hr style={{ width: "40px", marginTop: "40px" }} />
          <h1>GALLERY</h1>
          <div className="gallery">
            <div className="galleryImg_images_box1">
              <img src="images/scott-webb-176434 1.png" alt="gallery1" />
            </div>
            <div className="gallery_box2">
              <div className="gallery_box2_row1">
                <img src="images/photos-13323p6Bdc0uhr8Bq 1.png" alt="gallery2" />
                <img src="images/echo-grid-156713 1.png" alt="gallery3" />
              </div>
              <div className="gallery_box2_row2">
                <img src="images/fuse-brussels-169216 1.png" alt="gallery4" />
                <img src="images/tu-tram-pham-202263 2.png" alt="gallery5" />
              </div>
            </div>
          </div>
          <div className="gallery_button">SEE MORE</div>
        </div>

        <div className="row content-4">
          {/* background map */}
        </div>

        <div className="main_box">
          <div className="main_box_box" style={{ backgroundColor: "white" }}>
            <hr style={{ width: "40px", marginTop: "30px" }} />
            <h1>GET IN TOUCH</h1>
            <div className="inside">
              <div className="col-6 right">
                <div className="firstRow">
                  <i className="fa fa-map-marker" aria-hidden="true" style={{ color: "black", paddingRight: "10px" }}></i>
                  <h5>91 Noian Extensions Sulto 570</h5>
                </div>
                <div className="secondRow">
                  <i className="fa fa-phone" aria-hidden="true" style={{ color: "black", paddingRight: "10px" }}></i>
                  <h5>+001 356-968-2454</h5>
                </div>
                <div className="thirdRow">
                  <i className="fa fa-envelope-o" aria-hidden="true" style={{ color: "black", paddingRight: "10px" }}></i>
                  <h5>monticello@service.com</h5>
                </div>
                <div className="fouthRow">
                  <i className="fa fa-clock-o" aria-hidden="true" style={{ color: "black", paddingRight: "10px" }}></i>
                  <h5>From 07:05AM to 19:30PM</h5>
                </div>
              </div>
              <div className="col-6 left">
                <h5>Mollie Medina</h5>
                <hr style={{ marginTop: "-20px" }} />
                <h5>Email</h5>
                <hr style={{ marginTop: "-20px" }} />
                <button className="btn1">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row footer">
          <div className="col-6 logo">
            <div className="footer_logo">
              <div className="footer_menu">
                <img src="images/Logo.png" alt="" />
                <img src="images/Social.png" alt="" className="socials" />
              </div>
              <p>Copyrights © 2020 Montichello</p>
            </div>
          </div>
          <div className="col-6 icons">
            <i className="fa fa-facebook-square" aria-hidden="true" style={{ color: "white" }}></i>
            <i className="fa fa-twitter-square" aria-hidden="true" style={{ color: "white" }}></i>
            <i className="fa fa-instagram" aria-hidden="true" style={{ color: "white" }}></i>
          </div>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    </div>
  );
};

export default User;
