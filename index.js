const {
    S3
} = require("@aws-sdk/client-s3");
let s3 = new S3({
    region: 'us-east-2',
    credentials: {
        accessKeyId: 'AKIASYDUBNHCQH5LYZPB',
        secretAccessKey: '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'
    }
});

// To create new bucket
s3.createBucket({
    Bucket: 'mybucketbasic'
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});


// To get list of buckets
s3.listBuckets({}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

// To add object to the bucket
s3.putObject({
    Bucket: 'mybucketbasic',
    Key: 'testFile.txt',
    Body: Buffer('This is the text file')
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

// copies an object from one bucket to another
s3.copyObject({
    Bucket: 'destinationbucket', 
    CopySource: "/mybucketbasic/testFile.txt", 
    Key: "testFile.txt"
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

// To get list of objects
s3.listObjects({}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

s3.getObject({
    Bucket: 'mybucketbasic',
    Key: 'testFile.txt'
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

// To delete object from bucket
s3.deleteObject({
    Bucket: 'mybucketbasic',
    Key: 'testFile.txt',
    Body: Buffer('This is the text file')
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});

// To delete bucket
s3.deleteBucket({
    Bucket: 'mybucketbasic'
}, (error, success) => {
    if(error) {
        console.log('error =>', error);
    } else {
        console.log('success =>', success);
    }
});
