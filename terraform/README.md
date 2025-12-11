# Terraform Infrastructure

This directory contains Terraform configuration for deploying the Deep Learning English infrastructure on AWS.

## Prerequisites

- Terraform >= 1.0
- AWS CLI configured
- Appropriate AWS permissions

## Structure

- `main.tf` - Main Terraform configuration
- `variables.tf` - Variable definitions
- `outputs.tf` - Output values
- `modules/` - Reusable modules (to be added)
- `environments/` - Environment-specific configurations (to be added)

## Usage

```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure
terraform destroy
```

## Backend Configuration

Configure S3 backend in `backend.config`:

```hcl
bucket = "your-terraform-state-bucket"
key    = "deep-learning-english/terraform.tfstate"
region = "ap-southeast-1"
```

