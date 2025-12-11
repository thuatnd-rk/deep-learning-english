/**
 * AWS Lambda Handler Wrapper
 * 
 * This file wraps the Express app for AWS Lambda deployment.
 * It uses @vendia/serverless-express to convert Express requests/responses
 * to Lambda event/context format.
 */

import serverlessExpress from '@vendia/serverless-express'
import app from './index'

// Create Lambda handler from Express app
export const handler = serverlessExpress({ app })

