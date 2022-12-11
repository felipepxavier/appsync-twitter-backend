const AWS = require('aws-sdk')

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

const a_user_signs_up = async (password, name, email) => {
    const cognito = new AWS.CognitoIdentityServiceProvider()
    const userPoolId = process.env.CognitoUserPoolId
    const clientId = process.env.WebCognitoUserPoolClientId
    
    const response = await cognito.signUp({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'name', Value: name }
        ]
    }).promise()

    const username = response.UserSub
    console.log(`[${email}] - user has signed up [${username}]`)

    await cognito.adminConfirmSignUp({
        UserPoolId: userPoolId,
        Username: username
    }).promise()

    console.log(`[${email}] - confirmed sign up`)

    return {
        username,
        name,
        email
    }
}

module.exports = {
    we_invoke_confirmUserSignup,
    a_user_signs_up
}