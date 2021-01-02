import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './Footer.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import PhoneIcon from '@material-ui/icons/Phone';
const Footer = () => {
    return ( <
        div >
        <Container className='footer'>
            <Row className='justify-content-md-center footericons'>
                <Col md='auto' className='face'>
                <a href="https://instagram.com/feetbitstore?igshid=1dswid66t46br" target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
                </Col>
                <Col md='auto' className='face'>
                <a href="https://twitter.com/feetbitstore/media" target="_blank" rel="noopener noreferrer"><TwitterIcon/></a>
                </Col>
                <Col md='auto' className='face'>
                <a href="https://www.facebook.com/feetbitstore-107935234464128" target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
                </Col>
                <Col md='auto' className='face'>
                <a href="https://api.whatsapp.com/send?phone=+789652909&amp;text=Hi there! I saw this on your webApplication, i would like to inquire :)" target="_blank" rel="noopener noreferrer"><WhatsAppIcon/></a>
                </Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>copyright &copy; FeetbitOnlineStore</Col>
            </Row>
        </Container>
        <
        /div>
    )
}

export default Footer
