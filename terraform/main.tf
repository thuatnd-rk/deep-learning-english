terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
  
  backend "s3" {
    # Configure in backend.config
  }
}

provider "aws" {
  region = var.aws_region
}

# Local variables
locals {
  project_name = "deep-learning-english"
  environment  = var.environment
}

