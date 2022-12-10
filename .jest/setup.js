require('dotenv').config()
require('dotenv').config({ path: '.env-outputs' })
const AWS = require('aws-sdk')
AWS.config.region = process.env.AwsRegion