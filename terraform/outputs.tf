output "api_gateway_url" {
  description = "API Gateway endpoint URL"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "s3_bucket_frontend" {
  description = "S3 bucket for frontend"
  value       = aws_s3_bucket.frontend.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.frontend.id
}

output "dynamodb_tables" {
  description = "DynamoDB table names"
  value = {
    lessons    = aws_dynamodb_table.lessons.name
    progress   = aws_dynamodb_table.progress.name
    vocabulary = aws_dynamodb_table.vocabulary.name
    recordings = aws_dynamodb_table.recordings.name
  }
}

