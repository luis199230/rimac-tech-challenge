# Rimac Tech Challenge

This project is a tech challenge for Rimac company.

### Requirements

NodeJs  v12.13.1

NPM 6.12.1

Serverless 
   - Framework Core: 1.68.0
   - Plugin: 3.6.6
   - SDK: 2.3.0
   - Components: 2.30.1


### Installation 

Open console AWS and create Role with same name 'devops'
 1. With file devops-role.json in trusted relationship section.
 2. With file policies-attached add and apply these policies.

is ready your role?

Copy and paste accountId in environment ACCOUNT_ID

Install dependencies
```sh
npm install
```

### Deployment

For run deploy is necessary have configured aws credentials, if isn't yet configured.

```sh
serverless config credentials --provider aws --key {key} --secret {secret}
```

After verified configuration start to deployment and enjoy

```sh
sls deploy
```

### Testing

You can test with my Postman, don't forget configure the environment with base_url for works correctly.

```sh
https://www.getpostman.com/collections/d11bb209ada57cd2cac4
```