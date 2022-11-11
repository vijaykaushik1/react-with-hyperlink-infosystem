import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='parth-bucket-hlis/my-images';
const REGION ='eu-west-1';


AWS.config.update({
    accessKeyId: 'AKIA5YIH7XXODZ4Z7GF5',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        // console.log(file)
        // console.log(selectedFile)
        // const newNameFile = new Date().getTime()+Math.floor(10000 + Math.random() * 99999)+'.'+file.type.slice(6);
        const newNameFile = new Date().getTime()+Math.floor(10000 + Math.random() * 99999)+'.'+file.name.split('.').pop();
        
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            // Key: file.name
            Key: newNameFile //file.name //new Date().getTime().toString()
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
                alert(newNameFile);
            })
    }


    return <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;