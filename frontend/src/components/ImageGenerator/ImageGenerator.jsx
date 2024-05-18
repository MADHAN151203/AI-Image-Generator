import './ImageGenerator.css'
import Default_image from '../Assests/default.webp'
import { useRef,useState } from 'react';
const ImageGenerator =()=>{
    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null)
    const [loading,setloading] = useState(false);

    const imageGenerator = async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setloading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        let dataarray=data.data;
        console.log(data);
        setImage_url(dataarray[0].url);
        setloading(false);

    }
    const handleDownload = () => {
        if (image_url !== Default_image) {
            // Create a temporary anchor element
            const downloadLink = document.createElement("a");
            downloadLink.href = image_url;
            downloadLink.download = "generated_image.png"; // You can set the desired filename here
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            console.error("No image available to download.");
        }
    };

    return(
        <div className='ai-image-generator'>
            <div className="header">AI Images <span>Generator</span>
            <br />
            <div className="img-loading">
                <div className="image"><img src={image_url==="/"?Default_image:image_url} alt='AI default Image'/></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>This may take few Seconds..</div>
                </div>
            </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='What You Need To See'/>
                <div className="generator-btn" onClick={()=>{imageGenerator()}}>Generate</div>
                <button className="download-btn" onClick={handleDownload} disabled={image_url === Default_image}>Download</button>
            </div>

        </div>
    );
}
export default ImageGenerator;