#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Frontend Deployment to Kubernetes...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed. Please install kubectl first.${NC}"
    exit 1
fi

# Build Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t frontend:latest .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker image built successfully${NC}"

# Load image to kind (if using kind)
if command -v kind &> /dev/null; then
    echo -e "${YELLOW}📤 Loading image to kind cluster...${NC}"
    kind load docker-image frontend:latest
    echo -e "${GREEN}✅ Image loaded to kind cluster${NC}"
fi

# Apply Kubernetes manifests
echo -e "${YELLOW}🔧 Applying Kubernetes manifests...${NC}"
kubectl apply -k k8s/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to apply Kubernetes manifests${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Kubernetes manifests applied successfully${NC}"

# Wait for deployment to be ready
echo -e "${YELLOW}⏳ Waiting for deployment to be ready...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/frontend-deployment

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed to become ready${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment is ready!${NC}"

# Get service information
echo -e "${YELLOW}📋 Service Information:${NC}"
kubectl get service frontend-service
kubectl get ingress frontend-ingress

echo -e "${GREEN}🎉 Frontend deployment completed successfully!${NC}"
echo -e "${YELLOW}💡 To access your application:${NC}"
echo -e "   - Add 'frontend.local' to your /etc/hosts file pointing to your cluster IP"
echo -e "   - Or use port-forward: kubectl port-forward service/frontend-service 3000:80" 