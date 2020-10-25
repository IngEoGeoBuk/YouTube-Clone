import emailjs from "emailjs-com";
import React from 'react';
import { Input } from 'antd';

// npm install emailjs-com --save

const { TextArea } = Input;

export default function ContactUs() {
    function sendEmail(e) {
        e.preventDefault();
        
        emailjs.sendForm('you3667@gmail.com', 'template_20juxq5', e.target, 'user_71SWcHKoMzt5SZWagtE9p')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
    }

    return (
        <div>
            <div className="container">
            <form onSubmit={sendEmail}>
                <div>
                    <div>
                        <Input type="text" className="form-control" placeholder="글 제목" name="subject" />
                    </div>
                    <div>
                        <Input type="text" className="form-control" placeholder="사유" name="reason" />
                    </div>
                    <div>
                        <TextArea cols="30" rows="8" placeholder="세부내용을 적어주세요" name="message"></TextArea>    
                    </div>
                    <br />
                    <div style={{ textAlign:"center"}}>
                        <Input type="submit" value="신고접수"></Input>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}