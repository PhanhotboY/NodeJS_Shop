import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import keys from '../../../config/keys.config';

const s3 = new AWS.S3({
    // apiVersion: '2012-10-17',
    // signatureVersion: 'v4',
    credentials: {
        awsAccessKey: keys.awsAccessKey,
        awsSecretKey: keys.awsSecretKey,
    },
    region: 'ap-southeast-1',
});

module.exports = async (req, res, next) => {
    const { file, userId } = req.body;

    const Key = `${userId}/${uuidv4()}${file.name.slice(file.name.lastIndexOf('.'))}`;

    await s3.getSignedUrl(
        'putObject',
        {
            Bucket: 'shopee-phan-nguyen',
            Key,
            ContentType: file.type,
        },
        (err, url) => {
            if (err) {
                console.log(err.message);
                return res.status(500).send(err.message);
            }

            return res.status(200).json({ Key, url });
        }
    );
};
