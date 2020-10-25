I modified jaewonhimnae's code

https://www.youtube.com/watch?v=SsMn8tT3ZBQ&t=4365s


To use this application, 

1. make dev.js file inside config folder 
2. put mongoDB info into dev.js file 
3. Type  " npm install " inside the root directory  ( Download Server Dependencies ) 
4. Type " npm install " inside the client directory ( Download Front-end Dependencies )
5. install ffmpeg

Error Solution:

1. npm install error:
-> https://www.slipp.net/wiki/pages/viewpage.action?pageId=26643025
1-1: delete package-lock.json
1-2: $npm init
1-3: $npm i --save

2.
And you will have to change Icon 

ex) 
import { Input } from 'antd';
<Icon type="dislike" /> 
-> change 
import { DislikeOutlined } from '@ant-design/icons'; 
<DislikeOutlined />

3. 
