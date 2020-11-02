import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col, Button } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import ContactUs from '../ContactForm/contactForm';
import Modal from '../Modal/Modal';

function DetailVideoPage(props) {

    const user = useSelector(state => state.user)

    const [isOpen, setIsOpen] = useState(false)

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const [DeleteVideo, setDeleteVideo] = useState('userId');

    const userId = localStorage.getItem('userId');

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })

        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })


    }, [])

    const deleteVideo = () => {
        if(userId === Video.writer._id) {
            if(window.confirm('해당 게시글을 삭제하시겠습니까?')) {
                if(Video._id !== undefined) {
                    axios.post('/api/video/deleteVideo', videoVariable)
                    .then(response =>  {
                        if(response.data.success) {
                            setDeleteVideo(!DeleteVideo)
                        } else {
                            alert('동영상 삭제에 실패했습니다.')
                        }
                        return window.location.href = '/'
                    })
                }
            } 
        }   else {
                alert('회원님의 동영상이 아닙니다.')
        }
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if (Video.writer) {
        if(user.userData && !user.userData.isAuth) {
            return (
                <Row>
                    <Col lg={18} xs={24}>
                        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                            <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
    
                            <List.Item
                                actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />, 
                                        <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />,
                                    ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                    title={<a href="https://ant.design">{Video.title}</a>}
                                    description={Video.description}
                                />
                                <div></div>
                            </List.Item>
    
                            <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
    
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
    
                        <SideVideo />
    
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col lg={18} xs={24}>
                        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                            <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>
                            <List.Item
                                actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />, 
                                <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />,
                                <Button onClick={deleteVideo} userTo={Video.writer._id} userFrom={localStorage.getItem('userId')}>삭제</Button>
                            ]}
                            >
                                
                                <List.Item.Meta
                                    avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                    title={<a href="https://ant.design">{Video.title}</a>}
                                    description={Video.description}
                                />

                                <Button style = {{backgroundColor:'red', color:'white', marginLeft:'0.5rem', marginTop:'0.5rem'}} 
                                onClick={() => setIsOpen(true)}
                                > 신고
                                </Button>

                                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                    <ContactUs/>
                                </Modal>
                            </List.Item>
    
                            <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment} />
    
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
    
                        <SideVideo />
    
                    </Col>
                </Row>
            )
        }
        

    } else {
        return (
            <div>Loading...</div>
        )
    }


}

export default DetailVideoPage

