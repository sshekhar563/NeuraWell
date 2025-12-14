from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
import logging
from datetime import datetime
from typing import List, Dict, Optional
import uvicorn

from ai_agent import NeuraWellAI
from models import ChatMessage, AIResponse, LearningStats, UserProfile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="NeuraWell AI Service", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Agent
ai_agent = NeuraWellAI()

# WebSocket connections manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_sessions: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.user_sessions[user_id] = websocket
        logger.info(f"User {user_id} connected")

    def disconnect(self, websocket: WebSocket, user_id: str):
        self.active_connections.remove(websocket)
        if user_id in self.user_sessions:
            del self.user_sessions[user_id]
        logger.info(f"User {user_id} disconnected")

    async def send_personal_message(self, message: str, user_id: str):
        if user_id in self.user_sessions:
            await self.user_sessions[user_id].send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "NeuraWell AI Service is running", "status": "active"}

@app.get("/ai/status")
async def get_ai_status():
    """Get current AI agent status and capabilities"""
    return {
        "status": "active",
        "capabilities": ai_agent.get_capabilities(),
        "learning_stats": ai_agent.get_learning_stats(),
        "neural_network": ai_agent.get_neural_network_status(),
        "timestamp": datetime.now().isoformat()
    }

@app.post("/ai/chat")
async def chat_with_ai(message: ChatMessage):
    """Send a message to the AI agent and get a response"""
    try:
        response = await ai_agent.process_message(
            message.text, 
            message.user_id, 
            message.context
        )
        return response
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/learn")
async def trigger_learning():
    """Trigger AI learning process"""
    try:
        result = await ai_agent.learn()
        return {"status": "learning_started", "result": result}
    except Exception as e:
        logger.error(f"Error triggering learning: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ai/insights")
async def get_ai_insights():
    """Get AI-generated insights and patterns"""
    try:
        insights = await ai_agent.generate_insights()
        return {"insights": insights, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        logger.error(f"Error getting insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ai/thoughts")
async def get_ai_thoughts():
    """Get current AI thought processes"""
    try:
        thoughts = ai_agent.get_current_thoughts()
        return {"thoughts": thoughts, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        logger.error(f"Error getting thoughts: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/assessment")
async def process_assessment(assessment_data: dict):
    """Process mental health assessment with AI analysis"""
    try:
        result = await ai_agent.analyze_assessment(assessment_data)
        return result
    except Exception as e:
        logger.error(f"Error processing assessment: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/mood")
async def analyze_mood(mood_data: dict):
    """Analyze mood data and provide insights"""
    try:
        analysis = await ai_agent.analyze_mood_patterns(mood_data)
        return analysis
    except Exception as e:
        logger.error(f"Error analyzing mood: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    """WebSocket endpoint for real-time AI communication"""
    await manager.connect(websocket, user_id)
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Process with AI
            response = await ai_agent.process_message(
                message_data["text"], 
                user_id, 
                message_data.get("context", {})
            )
            
            # Send AI response back
            await manager.send_personal_message(
                json.dumps(response.dict()), 
                user_id
            )
            
            # Send AI thoughts if requested
            if message_data.get("include_thoughts", False):
                thoughts = ai_agent.get_current_thoughts()
                await manager.send_personal_message(
                    json.dumps({"type": "thoughts", "data": thoughts}), 
                    user_id
                )
                
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket, user_id)

@app.on_event("startup")
async def startup_event():
    """Initialize AI agent on startup"""
    logger.info("Starting NeuraWell AI Service...")
    await ai_agent.initialize()
    
    # Start background learning process
    asyncio.create_task(ai_agent.continuous_learning())
    logger.info("AI Agent initialized and learning started")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down NeuraWell AI Service...")
    await ai_agent.save_state()
    logger.info("AI Agent state saved")

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )