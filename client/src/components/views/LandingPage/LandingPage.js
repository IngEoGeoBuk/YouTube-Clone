import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ContactUs from '../ContactForm/contactForm'
import Modal from '../Modal/Modal'
import { useSelector } from "react-redux";


const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {



    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    // 추가한거
    const user = useSelector(state => state.user)

    const [isOpen, setIsOpen] = useState(false)

    if(user.userData && !user.userData.isAuth) {
        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={2}> 전체 글 </Title>
                <hr />
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
        )
    } else {
        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <div style={{display: 'flex'}}>
                    <Title level={2}> 전체 글 </Title>
                    <div>
                    <Button style = {{backgroundColor:'red', color:'white', marginLeft:'0.5rem', marginTop:'0.5rem'}} 
                        onClick={() => setIsOpen(true)}
                    > 신고
                    </Button>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <ContactUs/>
                    </Modal>
                    </div>
                </div>
                <hr />
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
        )
    }
}

export default LandingPage
