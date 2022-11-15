import globals from './constant';
import CryptoJS from 'crypto-js';
import AWS from 'aws-sdk'
AWS.config.update({
    accessKeyId: globals.ACCESSKEYID,
    secretAccessKey: globals.SECRETACCESSKEY
})

const myBucket = new AWS.S3({
    params: { Bucket: globals.S3_BUCKET },
    region: globals.S3_BUCKET_REGION,
})

let common = {

    encription: (plainText) => {
        return new Promise(function (resolve, reject) {
            try {
                let decoded_iv = CryptoJS.enc.Base64.parse(globals.iv_real);
                let hash = CryptoJS.SHA256(globals.key);
                let hashHex32 = hash.toString(CryptoJS.enc.Hex).substring(0, 32);
                let aes_key = CryptoJS.enc.Utf8.parse(hashHex32);
                if (plainText !== undefined && Object.keys(plainText).length !== 0) {
                    plainText = CryptoJS.AES.encrypt(plainText, aes_key, { padding: CryptoJS.pad.NoPadding, iv: decoded_iv, });
                    console.warn(plainText);
                    resolve(plainText);
                } else {
                    reject('');
                }
            } catch (error) {
                reject('');
            }

        });
    },

    decription: async (encText) => {
        return new Promise(function (resolve, reject) {
            let decoded_iv = CryptoJS.enc.Base64.parse(globals.iv_real);
            let hash = CryptoJS.SHA256(globals.key);
            let hashHex32 = hash.toString(CryptoJS.enc.Hex).substring(0, 32);
            let aes_key = CryptoJS.enc.Utf8.parse(hashHex32);
            try {
                let encrypted = CryptoJS.AES.decrypt(encText, aes_key, { padding: CryptoJS.pad.NoPadding, iv: decoded_iv, });
                console.warn(encrypted);
                resolve(encrypted);
            } catch (error) {
                reject('');
            }
        });
    },

    UploadMultipleFiles: async (files, callback) => {
        let imagesArr = [];
        for (let x = 0; x < files.length; x++) {
            console.log("under loop img")
            console.log(files[x])
            const newNameFile = new Date().getTime() + Math.floor(10000 + Math.random() * 99999) + '.' + files[x].name.split('.').pop();

            const params = {
                ACL: 'public-read',
                Body: files[x],
                Bucket: globals.S3_BUCKET,
                // Key: file.name
                Key: newNameFile //file.name //new Date().getTime().toString()
            };
            imagesArr.push(newNameFile);
            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    // images.push(newNameFile)                   
                    // setProgress(Math.round((evt.loaded / evt.total) * 100))
                })
                .send((err) => {
                    if (err) console.log(err);
                    // alert(newNameFile);
                })
        }
        console.log("total images uploaded: ");
        console.log(imagesArr);
        callback(imagesArr);
    },

    UploadSingleFile: (file) => {
        const newNameFile = new Date().getTime() + Math.floor(10000 + Math.random() * 99999) + '.' + file.name.split('.').pop();
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: globals.S3_BUCKET,
            Key: newNameFile
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                // setProgress(Math.round((evt.loaded / evt.total) * 100))
            }).send((err) => {
                if (err) console.log(err)
                // alert(newNameFile);
            })

        callback(newNameFile);
    }

}


//export default {FirstComponent, SecondComponent}
export default common;