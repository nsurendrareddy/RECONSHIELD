import random
import asyncio
from typing import Dict, Any

async def get_threat_intel(target: str) -> Dict[str, Any]:
    """
    Get threat reputation and blacklist status.
    Simulated for educational purposes.
    """
    # In a real app, you'd use APIs like AbuseIPDB, VirusTotal, etc.
    # For now, we simulate a check based on some randomness or specific targets.
    
    # Simulate API latency
    await asyncio.sleep(1.5)
    
    # Deterministic-ish score for demo
    random.seed(target)
    score = random.randint(0, 30) # Most IPs are clean
    
    if "malicious" in target or "attack" in target:
        score = random.randint(70, 95)
        
    blacklists = [
        {"name": "Spamhaus", "status": "Clean" if score < 70 else "Blacklisted"},
        {"name": "AbuseIPDB", "status": "Clean" if score < 50 else "Reported", "confidence": score},
        {"name": "Talos Intelligence", "status": "Neutral" if score < 40 else "Poor"},
        {"name": "Google Safe Browsing", "status": "Safe" if score < 85 else "Malicious"},
    ]
    
    return {
        "score": score,
        "blacklists": blacklists,
        "malicious_activity": score > 50,
        "threat_type": "None" if score < 50 else "Spam/Botnet" if score < 80 else "Malicious/Phishing",
        "confidence": random.randint(80, 100)
    }
