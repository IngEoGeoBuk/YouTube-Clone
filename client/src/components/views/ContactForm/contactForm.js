import emailjs from "emailjs-com";
import React, { useState } from 'react';
import { Input, Select } from 'antd';

// npm install emailjs-com --save

const { TextArea } = Input;

const ReasonsCategory = [
    { value: 0, label: '성적인 콘텐츠' },
    { value: 1, label: '폭력적 또는 혐오스러운 콘텐츠' },
    { value: 2, label: '증오 또는 악의적인 콘텐츠' },
    { value: 3, label: '유해하거나 위험한 행위' },
    { value: 4, label: '아동 학대' },
    { value: 5, label: '테러 조장' },
    { value: 6, label: '스팸 또는 오해의 소지가 있는 콘텐츠' },
    { value: 7, label: '권리 침해' },
    { value: 8, label: '자막 문제' }
]

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

        if(subject !== "" || message !== "") {
            emailjs.sendForm('gmail', '', e.target, '')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()

            setSubject("");
            setMessage("");
        }
    }

    const [subject, setSubject] = useState("");
    const [Categories, setCategories] = useState(0);
    const [message, setMessage] = useState("");

    const handleChangeSubject = (event) => {
        setSubject(event.currentTarget.value)
    }

    const handleChangeReason = (event) => {
        setCategories(event.currentTarget.value)
    }

    const handleChangeMessage = (event) => {
        setMessage(event.currentTarget.value)
    }


    const onSubmit = () => {

        if(subject === "" || message === "") {
            return alert('글 제목과 세부내용을 적어주세요.')
        }
    
        const variables = {
            subject: subject,
            message: message,
            category: Categories
        }

        alert('신고메일이 성공적으로 보내졌습니다.');

    }

    return (
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                <div>
                    <div>
                        <Input type="text" onChange={handleChangeSubject} value={subject} className="form-control" placeholder="글 제목" name="subject" />
                    </div>
                    <div>
                        <select onChange={handleChangeReason} name="reason">
                            {ReasonsCategory.map((item, index) => (
                                <option key={index} value={item.label}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <TextArea value={message} onChange={handleChangeMessage} cols="30" rows="8" placeholder="세부내용을 적어주세요" name="message"></TextArea>    
                    </div>
                    <br />
                    <div style={{ textAlign:"center"}}>
                        <Input type="submit" value="신고접수" onClick={onSubmit}></Input>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}
