import React from "react";

const Footer = (props: any) => {
  return (
    <footer className="footer">
      <div id="full-site-bar">
        <a target="_blank" className="turn-off-mobile btn btn-gray-flat btn-full-site ui-link">
          VISIT FULL SITE
        </a>
      </div>
      <div className="section">
        <div className="container">
          <div className="news-letter">
            <h3>SIGN UP FOR NEWSLETTER</h3>
            <div className="frm-news-letter">
              <form className="form">
                <div className="form-group">
                  <input type="email" id="email" className="form-control" placeholder="Please enter your email address" />
                </div>
                <button className="btn btn-default">Send</button>
              </form>
            </div>
            <h3>FOLLOW US ONLINE</h3>
            <ul className="links-social clearfix">
              <li>
                <a href="https://www.facebook.com/shadespacesg">
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/shadespacesg">
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send/?phone=6598168847">
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://g.page/shadespacesg?share">
                  <i className="fa fa-google" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
