import axios from 'axios';
import React, {useState} from 'react';

function SentimentApi() {
    const [text, settext] = useState('');
    const [emotion, setemotion] = useState(null);

    const getEmotion = (text) => {
        const apiKey = 'Q0b2tLfyuz5OdnfFNGgOFqc_W1yAMM596BJsmt6VfWiG';
        const serviceUrl = 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/6c379a06-c69a-4551-86c2-bd4f3c2393da/v1/analyze?version=2020-08-01';
        const data = {
            "text": text,
            "features": {
                "emotion": {},
            }
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'apikey',
                password: apiKey
            }
        }
        try {
            axios.post(serviceUrl,data,config).then(res => {
                console.log(res);
                setemotion(res.data.emotion.document.emotion)
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="sentiment-api">
            <textarea value={text} onChange={e => settext(e.target.value)}></textarea>


            <button onClick={() => getEmotion(text)}>Get Emotion</button>
        </div>
    );
}

export default SentimentApi;