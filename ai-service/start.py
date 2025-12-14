#!/usr/bin/env python3
"""
NeuraWell AI Service Startup Script
"""

import os
import sys
import subprocess
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        logger.error("Python 3.8 or higher is required")
        sys.exit(1)
    logger.info(f"Python version: {sys.version}")

def install_requirements():
    """Install required packages"""
    logger.info("Installing requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        logger.info("Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to install requirements: {e}")
        sys.exit(1)

def create_directories():
    """Create necessary directories"""
    directories = ["data", "logs", "models"]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        logger.info(f"Created directory: {directory}")

def start_ai_service():
    """Start the AI service"""
    logger.info("Starting NeuraWell AI Service...")
    try:
        # Set environment variables
        os.environ["PYTHONPATH"] = os.getcwd()
        
        # Start the FastAPI server
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        logger.info("AI Service stopped by user")
    except Exception as e:
        logger.error(f"Error starting AI service: {e}")
        sys.exit(1)

def main():
    """Main startup function"""
    logger.info("=" * 50)
    logger.info("NeuraWell AI Service Startup")
    logger.info("=" * 50)
    
    check_python_version()
    create_directories()
    
    # Ask user if they want to install requirements
    install_deps = input("Install/update requirements? (y/n): ").lower().strip()
    if install_deps in ['y', 'yes', '']:
        install_requirements()
    
    start_ai_service()

if __name__ == "__main__":
    main()