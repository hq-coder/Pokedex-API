import React from 'react'
import './footer.css'
import {FaGithub} from 'react-icons/fa'
import {FaLinkedin} from 'react-icons/fa'
import {IoLogoTwitter} from 'react-icons/io'
import {GiPortal} from 'react-icons/gi'

const Footer = () => {
  return (
    <footer className='footer_container'>
   

 

      <div className="footer__socials">
        <a href="https://github.com/hq-coder"><FaGithub/></a>
        <a href="https://www.linkedin.com/in/hanselquiroz/"><FaLinkedin/></a>
        <a href="https://twitter.com/hq_coder"><IoLogoTwitter/></a>
        <a href="https://hqcoder.com"><GiPortal/></a>
              </div>

              <h4>&copy; hq-coder. All rights reserved.</h4>
  
    </footer>
  )
}

export default Footer