// https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#emotion
import axios from 'axios';
function SentimentApi() {
    const getEmotion = () => {
        const apiKey = 'Q0b2tLfyuz5OdnfFNGgOFqc_W1yAMM596BJsmt6VfWiG';
        const serviceUrl = 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/6c379a06-c69a-4551-86c2-bd4f3c2393da/v1/analyze?version=2020-08-01';
        const data = {
            "text": "I love apples! I don't like oranges.",
            "features": {
              "emotion": {
                "targets": [
                  "apples",
                  "oranges"
                ]
              }
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
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="sentiment-api">
            <div>test</div>
            <button onClick={getEmotion}>Test Api</button>
        </div>
    );
}

export default SentimentApi;