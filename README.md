# RuleValidation

A simple rule-validation API

## Brief Description

- First route is the base route. HTTP GET "/"
- Second route is the rule validation route. HTTP POST "/validate-rule"
- The response format is:
                `
                    {
                        "message": "API response message",
                        "status": "success",
                        "data": {
                            isValidForRule: true,
                        }
                        }
                `

## API Deployment

API is deployed [here](https://rulevalidator.herokuapp.com)

## Built with

- NodeJS
- ExpressJS
- JavaScript

## Getting Started

### Installation

- Clone this repository using git clone https://github.com/hadeoh/rule-validation.git .
- Use the .env.example file to setup your environmental variables and rename the file to .env
- Run npm install to install all dependencies
- Run npm start to start the production server
- Run npm run start:dev to start the development server

## Project References

- Stack Overflow
- Node Documentation
