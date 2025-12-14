from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime
from enum import Enum

class MessageType(str, Enum):
    USER = "user"
    AI = "ai"
    SYSTEM = "system"

class EmotionType(str, Enum):
    ANXIETY = "anxiety"
    DEPRESSION = "depression"
    STRESS = "stress"
    JOY = "joy"
    ANGER = "anger"
    SADNESS = "sadness"
    NEUTRAL = "neutral"

class ChatMessage(BaseModel):
    text: str
    user_id: str
    context: Optional[Dict[str, Any]] = {}
    timestamp: Optional[datetime] = None

class AIResponse(BaseModel):
    text: str
    confidence: float
    reasoning: str
    emotion_detected: EmotionType
    patterns_identified: List[str]
    recommendations: List[str]
    crisis_level: int  # 0-10 scale
    timestamp: datetime
    thinking_process: List[Dict[str, str]]

class UserProfile(BaseModel):
    user_id: str
    preferences: Dict[str, Any]
    conversation_history: List[Dict[str, Any]]
    emotional_patterns: Dict[str, int]
    learned_insights: List[str]
    last_interaction: datetime

class LearningStats(BaseModel):
    total_interactions: int
    patterns_learned: int
    accuracy_score: float
    confidence_level: float
    neural_connections: int
    learning_rate: float
    memory_size_mb: float

class NeuralLayer(BaseModel):
    name: str
    neurons: int
    activation: float
    weights: Optional[List[float]] = None

class NeuralNetwork(BaseModel):
    layers: List[NeuralLayer]
    connections: int
    learning_rate: float
    accuracy: float
    training_epochs: int

class AIInsight(BaseModel):
    type: str  # pattern, prediction, recommendation
    title: str
    description: str
    confidence: float
    evidence: List[str]
    action_items: List[str]
    timestamp: datetime

class ThoughtProcess(BaseModel):
    step: str
    type: str  # analysis, memory, pattern, emotion, generation
    content: str
    confidence: float
    timestamp: datetime

class AssessmentResult(BaseModel):
    assessment_type: str
    score: int
    max_score: int
    severity_level: str
    recommendations: List[str]
    ai_analysis: str
    confidence: float
    follow_up_needed: bool

class MoodAnalysis(BaseModel):
    mood_trend: str  # improving, declining, stable
    patterns_detected: List[str]
    triggers_identified: List[str]
    recommendations: List[str]
    risk_assessment: str
    confidence: float