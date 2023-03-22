var express = require("express");
var app = express();
var callout = require("./api.js");

// Returns list of the buckets
app.get("/listBuckets", function (req, res) {
  const request = {
    uri: "https://s3.amazonaws.com/",
    header: {
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIASYDUBNHCQH5LYZPB/20230322/us-east-2/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=6cd28c7394585ea6472a981a6c149c109a36804aa218905cc7daa4352260dbe9",
    },
    method: ApiMethod.GET,
    body: '<?xml version="1.0" encoding="UTF-8"?><CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><LocationConstraint>us-east-1</LocationConstraint></CreateBucketConfiguration>',
  };
  const result = callout(
    request.uri,
    request.method,
    undefined,
    request.body,
    request.header
  );
  res.end(result);
});

// Returns list of the objects (up to 1000) in a bucket
app.get("/objects/:bucket", function (req, res) {
  const request = {
    uri: `https://s3.amazonaws.com/${req.params.bucket}/?list-type=2`,
    header: {
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIASYDUBNHCQH5LYZPB/20230322/us-east-1/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=6cd28c7394585ea6472a981a6c149c109a36804aa218905cc7daa4352260dbe9",
    },
    method: ApiMethod.GET,
  };
  const result = callout(
    request.uri,
    request.method,
    undefined,
    undefined,
    request.header
  );
  res.end(result);
});

// Retrieves object from Amazon S3
app.get("/object/:bucket/:key", function (req, res) {
  const request = {
    uri: `https://s3.amazonaws.com/${req.params.bucket}/${req.params.key}`,
    header: {
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIASYDUBNHCQH5LYZPB/20230322/us-east-1/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=6cd28c7394585ea6472a981a6c149c109a36804aa218905cc7daa4352260dbe9",
    },
    method: ApiMethod.GET,
  };
  const result = callout(
    request.uri,
    request.method,
    undefined,
    undefined,
    request.header
  );
  res.end(result);
});

// Creates a copy of an object that is already stored in Amazon S3
app.put("/object/:bucket/:key", function (req, res) {
  const request = {
    uri: `https://s3.amazonaws.com/${req.params.bucket}/${req.params.key}`,
    header: {
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIASYDUBNHCQH5LYZPB/20230322/us-east-1/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=6cd28c7394585ea6472a981a6c149c109a36804aa218905cc7daa4352260dbe9",
    },
    method: ApiMethod.PUT,
    body: req.body,
  };
  const result = callout(
    request.uri,
    request.method,
    undefined,
    request.body,
    request.header
  );
  res.end(result);
});

// Removes the null version (if there is one) of an object and inserts a delete marker, which becomes the latest version of the object. If there isn't a null version, Amazon S3 does not remove any objects
app.delete("/object/:bucket/:key", function (req, res) {
  const request = {
    uri: `https://s3.amazonaws.com/${req.params.bucket}/${req.params.key}?VersionId=${req.query.versionId}`,
    header: {
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIASYDUBNHCQH5LYZPB/20230322/us-east-1/s3/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=6cd28c7394585ea6472a981a6c149c109a36804aa218905cc7daa4352260dbe9",
    },
    method: ApiMethod.DELETE,
  };
  const result = callout(
    request.uri,
    request.method,
    undefined,
    undefined,
    request.header
  );
  res.end(result);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Running on http://%s:%s", host, port);
});
