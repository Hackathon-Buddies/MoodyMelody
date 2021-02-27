import axios from 'axios';
import React, {useState} from 'react';

function SentimentApi() {
    const [sentimentalText, setSentimentalText] = useState('');
    const [emotions, setEmotions] = useState(null);

    const getEmotion = () => {
        const apiKey = 'Q0b2tLfyuz5OdnfFNGgOFqc_W1yAMM596BJsmt6VfWiG';
        const serviceUrl = 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/6c379a06-c69a-4551-86c2-bd4f3c2393da/v1/analyze?version=2020-08-01';
        const data = {
            "text": sentimentalText,
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
                setEmotions(res.data.emotion.document.emotion)
            });
        } catch (err) {
            console.log(err);
        }
    }
    const dummyData = () => {
        setEmotions({
            sadness: 0.06,
            joy: 0.008,
            fear: '0.1',
            disgust: '0.49',
            anger: '0.62'
        })
    }

    // const mapEmotionToColor = emotion => {
    //     switch(emotion){
    //         case 'sadness': return 'gray';
    //         case 'joy': return 'yellow'
    //         case 'fear': return 'purple';
    //         case 'disgust': return 'green'
    //         case 'anger': return 'blue';
    //         default: return 'white';
    //     }
    // }

    const displayEmotions = emotions ? Object.keys(emotions).map(emotion => {
        // const colour = mapEmotionToColor(emotion);
        // style={{'background-color': colour}}
        return <div key={emotion}>{emotion} -- {emotions[emotion]}</div>
    }) : null

    return (
        <div className="sentiment-api">
            <div className="md-form amber-textarea active-amber-textarea">
                <h3>
                    <span className="m-4">Text to analyse</span>
                    <button className="btn btn-success" onClick={dummyData}>Get Emotion</button>
                </h3>
                <textarea id="emotional-text" 
                    className="md-textarea form-control" 
                    rows="3"
                    value={sentimentalText} 
                    onChange={e => setSentimentalText(e.target.value)} />
            </div>
            {displayEmotions}
        </div>
    );
}

export default SentimentApi;