#!/usr/bin/env bash

VERSION=$(git rev-parse --short HEAD)

echo "Deployment started for version: $VERSION"

echo "Building Docker image..."

docker build -t r3v3ng3r/simplified-ninja-blog:$VERSION .

echo "Pushing Docker image to registry..."

docker push r3v3ng3r/simplified-ninja-blog:$VERSION

echo "Applying Kubernetes deployment..."

kubectl apply -f simplified-ninja-deployment.yaml

echo "Applying Kubernetes service..."

kubectl apply -f simplified-ninja-service.yaml


echo "Deployment complete"