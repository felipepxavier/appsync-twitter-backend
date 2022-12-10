require('dotenv').config()
require('dotenv').config({ path: '.env-outputs' })
const AWS = require('aws-sdk')
AWS.config.region = process.env.AwsRegion

const we_invoke_confirmUserSignup = async (username, name, email) => {
    const handler = require('../../functions/confirm-user-signup').handler

    const context = {}
    const event = {
        version: "1",
        region: process.env.AwsRegion,
        userPoolId: process.env.CognitoUserPoolId,
        userName: username,
        triggerSource: "PostConfirmation_ConfirmSignUp",
        request: {
            userAttributes: {
                sub: username,
                "cognito:email_alias": email,
                "cognitouser_status": "CONFIRMED",
                "email_verified": "false",
                "name": name,
                "email": email
            }
        },
        response: {}
    }

    await handler(event, context)

}

module.exports = {
    we_invoke_confirmUserSignup
}