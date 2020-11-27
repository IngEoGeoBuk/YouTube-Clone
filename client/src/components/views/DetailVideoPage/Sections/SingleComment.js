import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
// import { response } from 'express';

const { TextArea } = Input;
function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const [DeleteComment, setDeleteComment] = useState(true)

    const userId = localStorage.getItem('userId');

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const variables = {
        writer: user.userData._id,
        postId: props.postId,
        responseTo: props.comment._id,
        content: CommentValue
    }

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const deleteComment = () => {

        // console.log(variables.responseTo + '찾아라 commentId')

        if(userId === props.comment.writer._id) {
            console.log(variables.responseTo + '찾아라 commentId')
            if(window.confirm('해당 댓글을 삭제하시겠습니까?')) {
                Axios.post('/api/comment/deleteComment', variables)
                .then(response => {
                    if(response.data.success) {
                        setDeleteComment(!DeleteComment)
                    } else {
                        alert('댓글 삭제에 실패했습니다.')
                    }
                    return window.location.href = window.location.href;
                })
            }
        } else {
            alert('회원님이 작성한 댓글이 아닙니다.')
        }
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">답글 </span>,
        <span onClick={deleteComment} key="comment-basic-reply-to">삭제 </span>
    ]

    if (user.userData && !user.userData.isAuth) {
        return (
            <div>
                <Comment
                    actions={actions}
                    author={props.comment.writer.name}
                    avatar={
                        <Avatar
                            src={props.comment.writer.image}
                            alt="image"
                        />
                    }
                    content={
                        <p>
                            {props.comment.content}
                        </p>
                    }
                ></Comment>
                {OpenReply}
            </div>
        )
    } else {
        return (
            <div>
                <Comment
                    actions={actions}
                    author={props.comment.writer.name}
                    avatar={
                        <Avatar
                            src={props.comment.writer.image}
                            alt="image"
                        />
                    }
                    content={
                        <p>
                            {props.comment.content}
                        </p>
                    }
                ></Comment>
    
    
                {OpenReply &&
                    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                        <TextArea
                            style={{ width: '100%', borderRadius: '5px' }}
                            onChange={handleChange}
                            value={CommentValue}
                            placeholder="공개 답글 추가..."
                        />
                        <br />
                        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>답글달기</Button>
                    </form>
                }
    
            </div>
        )
    }   
}

export default SingleComment
