import React, { useState } from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = 'parth-bucket-hlis/my-images';
const REGION = 'eu-west-1';


AWS.config.update({
    accessKeyId: 'AKIA5YIH7XXODZ4Z7GF5',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const UploadImageToS3WithNativeSdk = () => {

    const [progress, setProgress] = useState(0);
    const [imagesArr, setImagesArr] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedMultipleFiles, setSelectedMultipleFiles] = useState(null);

    const handleFileInput = (e) => {
        console.log(e)
        setSelectedFile(e.target.files);
    }

    const handleMulipleFilesInput = (e) => {
        console.log(e.target.files)
        setSelectedMultipleFiles(e.target.files)
    }

    const uploadFile = (file) => {
        // console.log(file)
        // console.log(selectedFile)
        // return;
        // const newNameFile = new Date().getTime()+Math.floor(10000 + Math.random() * 99999)+'.'+file.type.slice(6);
        const newNameFile = new Date().getTime() + Math.floor(10000 + Math.random() * 99999) + '.' + file.name.split('.').pop();

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

    const uploadAllImages = (files) => {
        let images = [];
        return new Promise((resolve, reject) => {
            for (let x = 0; x < files.length; x++) {
                console.log("under loop img")
                console.log(files[x])
            const newNameFile = new Date().getTime() + Math.floor(10000 + Math.random() * 99999) + '.' + files[x].name.split('.').pop();

                const params = {
                    ACL: 'public-read',
                    Body: files[x],
                    Bucket: S3_BUCKET,
                    // Key: file.name
                    Key: newNameFile //file.name //new Date().getTime().toString()
                };

                myBucket.putObject(params)
                    .on('httpUploadProgress', (evt) => {
                        images.push(newNameFile)

                        setProgress(Math.round((evt.loaded / evt.total) * 100))
                    })
                    .send((err) => {
                        if (err) console.log(err)
                        reject(err)
                        // alert(newNameFile);
                    })
            }
            resolve(images)
        })
    }

    const uploadMultipleFiles = (files) => {
        // uploadAllImages(files).then((images)=>{console.log("Images after resolve"); console.log(images)}).catch((err)=>{console.log(err)})
        let images = [];
        for (let x = 0; x < files.length; x++) {
            console.log("under loop img")
            console.log(files[x])
            const newNameFile = new Date().getTime() + Math.floor(10000 + Math.random() * 99999) + '.' + files[x].name.split('.').pop();

            const params = {
                ACL: 'public-read',
                Body: files[x],
                Bucket: S3_BUCKET,
                // Key: file.name
                Key: newNameFile //file.name //new Date().getTime().toString()
            };
            setImagesArr(imagesArr.push(newNameFile))
            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    // images.push(newNameFile)                   
                    setProgress(Math.round((evt.loaded / evt.total) * 100))
                })
                .send((err) => {
                    if (err) console.log(err)

                    // alert(newNameFile);
                })
        }
        console.log("total images uploaded: ");

        console.log(imagesArr)
    }

    return <div>

        <div>
            <div>Single file Native SDK Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} multiple />
            <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>

        <div>
            <div>Mulitple files Native SDK File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleMulipleFilesInput} multiple />
            <button onClick={() => uploadMultipleFiles(selectedMultipleFiles)}> Upload to S3</button>
        </div>
    </div>
}

export default UploadImageToS3WithNativeSdk;