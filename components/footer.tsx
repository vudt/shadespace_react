import React from "react";
import NewsletterForm from "./forms/newsletter-form";


const Footer = () => {
  const arr_link_social = [
    {link: 'https://www.facebook.com/shadespacesg', class_name: 'fa fa-facebook'},
    {link: 'https://www.instagram.com/shadespacesg', class_name: 'fa fa-instagram'},
    {link: 'https://api.whatsapp.com/send/?phone=6598168847', class_name: 'fa fa-whatsapp'},
    {link: 'https://g.page/shadespacesg?share', class_name: 'fa fa-google'}
  ]

  return (
    <footer className="footer">
      <div id="full-site-bar">
        <a href="https://shadespace.com.sg/?allow=true" target="_blank" className="turn-off-mobile btn btn-gray-flat btn-full-site ui-link">
          VISIT FULL SITE
        </a>
      </div>
      <div className="section">
        <div className="container">
          <div className="news-letter">
            <h3>SIGN UP FOR NEWSLETTER</h3>
            <NewsletterForm />
            <h3>FOLLOW US ONLINE</h3>
            <ul className="links-social clearfix">
            {arr_link_social.map((item, key) => (
              <li key={key}>
                <a href={item.link}>
                  <i className={item.class_name} aria-hidden="true" />
                </a>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
