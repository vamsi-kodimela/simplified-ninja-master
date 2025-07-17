## Build Docker Image

`docker build -t r3v3ng3r/simplified-ninja-blog .`

## Push i9mage to registry

`docker push r3v3ng3r/simplfied-ninja-blog`

## RUN Docker image

`docker run -p 3000:300 simplified-ninja`

## Apply the K8 Deployment

`kubectl apply -f simplified-ninja-deployment.yaml`

## Apply K8 Service Configuration

`kubectl apply -f simplified-ninja-service.yaml`

## Get Services

`kubectl get services simplified-ninja-service`
`kubectl get pods`
