#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting Ruby OS installation...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root (use sudo)${NC}"
  exit 1
fi

# Update system
echo -e "${YELLOW}Updating system packages...${NC}"
apt update && apt upgrade -y

# Install Node.js and npm
echo -e "${YELLOW}Installing Node.js and npm...${NC}"
apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install build essentials
echo -e "${YELLOW}Installing build essentials...${NC}"
apt install -y build-essential git

# Install audio dependencies
echo -e "${YELLOW}Installing audio dependencies...${NC}"
apt install -y pulseaudio alsa-utils

# Install Ollama
echo -e "${YELLOW}Installing Ollama...${NC}"
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama service
echo -e "${YELLOW}Starting Ollama service...${NC}"
systemctl enable ollama
systemctl start ollama

# Pull default model
echo -e "${YELLOW}Pulling default Ollama model (mistral)...${NC}"
ollama pull mistral

# Configure audio permissions
echo -e "${YELLOW}Configuring audio permissions...${NC}"
usermod -a -G audio $SUDO_USER
usermod -a -G pulse $SUDO_USER
usermod -a -G pulse-access $SUDO_USER

# Start PulseAudio service
systemctl --user enable pulseaudio
systemctl --user start pulseaudio

# Test audio devices
echo -e "${YELLOW}Testing audio devices...${NC}"
if ! pactl list short sources | grep -q input; then
    echo -e "${RED}No microphone detected${NC}"
else
    echo -e "${GREEN}Microphone detected${NC}"
fi

if ! pactl list short sinks | grep -q output; then
    echo -e "${RED}No speakers detected${NC}"
else
    echo -e "${GREEN}Speakers detected${NC}"
fi

# Verify installations
echo -e "${YELLOW}Verifying installations...${NC}"
node_version=$(node --version)
npm_version=$(npm --version)
ollama_version=$(ollama --version)

echo -e "${GREEN}Installation complete!${NC}"
echo -e "Node.js version: ${node_version}"
echo -e "npm version: ${npm_version}"
echo -e "Ollama version: ${ollama_version}"

echo -e "\nImportant notes:"
echo -e "1. The Ollama service is running and will start automatically on boot"
echo -e "2. The default 'mistral' model has been installed"
echo -e "3. Audio permissions have been configured"
echo -e "4. You may need to log out and back in for audio permissions to take effect"
echo -e "5. The application will be available at http://localhost:5173"

# Create config directory
mkdir -p /etc/ruby-os
chmod 755 /etc/ruby-os

echo -e "${GREEN}Setup complete! You can now run the application using the run.sh script.${NC}"