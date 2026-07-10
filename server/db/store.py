import sqlite3
import json
import os
import asyncio
from datetime import datetime, timezone
from utils.logger import logger

# Store database file in the db directory
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reconshield.db")

def _init_db_sync():
    """Synchronous DB initialization."""
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        # Enable WAL mode for high concurrency
        cursor.execute("PRAGMA journal_mode=WAL;")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS scans (
                id TEXT PRIMARY KEY,
                domain TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                completed_at TEXT,
                results TEXT,
                progress TEXT,
                score INTEGER,
                grade TEXT
            );
        """)
        conn.commit()
    finally:
        conn.close()

async def init_db():
    """Initialize persistent SQLite database."""
    logger.info(f"Initializing SQLite database at: {DB_PATH}")
    await asyncio.to_thread(_init_db_sync)
    return True

def _create_scan_sync(scan_id: str, domain: str):
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        initial_progress = json.dumps([
            {"module": "init", "status": "done", "ts": datetime.now(timezone.utc).isoformat()}
        ])
        cursor.execute(
            "INSERT INTO scans (id, domain, status, created_at, progress) VALUES (?, ?, ?, ?, ?)",
            (
                scan_id,
                domain,
                "running",
                datetime.now(timezone.utc).isoformat(),
                initial_progress
            )
        )
        conn.commit()
    finally:
        conn.close()

async def create_scan(scan_id: str, domain: str):
    """Create a new scan record in SQLite."""
    await asyncio.to_thread(_create_scan_sync, scan_id, domain)

def _update_scan_sync(scan_id: str, results: dict, score: int, grade: str):
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE scans SET status = ?, results = ?, score = ?, grade = ?, completed_at = ? WHERE id = ?",
            (
                "completed",
                json.dumps(results),
                score,
                grade,
                datetime.now(timezone.utc).isoformat(),
                scan_id
            )
        )
        conn.commit()
    finally:
        conn.close()

async def update_scan(scan_id: str, results: dict, score: int, grade: str):
    """Update scan with results in SQLite."""
    await asyncio.to_thread(_update_scan_sync, scan_id, results, score, grade)

def _fail_scan_sync(scan_id: str, error: str):
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE scans SET status = ?, results = ?, completed_at = ? WHERE id = ?",
            (
                "failed",
                json.dumps({"error": error}),
                datetime.now(timezone.utc).isoformat(),
                scan_id
            )
        )
        conn.commit()
    finally:
        conn.close()

async def fail_scan(scan_id: str, error: str):
    """Mark scan as failed in SQLite."""
    await asyncio.to_thread(_fail_scan_sync, scan_id, error)

def _get_scan_sync(scan_id: str) -> dict | None:
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, domain, status, created_at, completed_at, results, score, grade, progress FROM scans WHERE id = ?",
            (scan_id,)
        )
        row = cursor.fetchone()
        if not row:
            return None
        return {
            "id": row[0],
            "domain": row[1],
            "status": row[2],
            "created_at": row[3],
            "completed_at": row[4],
            "results": json.loads(row[5]) if row[5] else None,
            "score": row[6],
            "grade": row[7],
            "progress": json.loads(row[8]) if row[8] else []
        }
    finally:
        conn.close()

async def get_scan(scan_id: str) -> dict | None:
    """Get scan by ID from SQLite."""
    return await asyncio.to_thread(_get_scan_sync, scan_id)

def _get_history_sync(limit: int, offset: int) -> list[dict]:
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, domain, status, created_at, completed_at, results, score, grade, progress FROM scans ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (limit, offset)
        )
        rows = cursor.fetchall()
        history = []
        for row in rows:
            history.append({
                "id": row[0],
                "domain": row[1],
                "status": row[2],
                "created_at": row[3],
                "completed_at": row[4],
                "results": json.loads(row[5]) if row[5] else None,
                "score": row[6],
                "grade": row[7],
                "progress": json.loads(row[8]) if row[8] else []
            })
        return history
    finally:
        conn.close()

async def get_history(limit: int = 50, offset: int = 0) -> list[dict]:
    """Get scan history from SQLite."""
    return await asyncio.to_thread(_get_history_sync, limit, offset)

def _delete_scan_sync(scan_id: str) -> bool:
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM scans WHERE id = ?", (scan_id,))
        changes = conn.changes()
        conn.commit()
        return changes > 0
    finally:
        conn.close()

async def delete_scan(scan_id: str) -> bool:
    """Delete a scan record from SQLite."""
    return await asyncio.to_thread(_delete_scan_sync, scan_id)

def _get_scan_progress_sync(scan_id: str) -> list[dict]:
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT progress FROM scans WHERE id = ?", (scan_id,))
        row = cursor.fetchone()
        if row and row[0]:
            return json.loads(row[0])
        return []
    finally:
        conn.close()

async def get_scan_progress(scan_id: str) -> list[dict]:
    """Get scan progress list from SQLite."""
    return await asyncio.to_thread(_get_scan_progress_sync, scan_id)

def _append_scan_progress_sync(scan_id: str, item: dict):
    conn = sqlite3.connect(DB_PATH, timeout=30.0)
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT progress FROM scans WHERE id = ?", (scan_id,))
        row = cursor.fetchone()
        progress = []
        if row and row[0]:
            progress = json.loads(row[0])
        progress.append(item)
        cursor.execute("UPDATE scans SET progress = ? WHERE id = ?", (json.dumps(progress), scan_id))
        conn.commit()
    finally:
        conn.close()

async def append_scan_progress(scan_id: str, item: dict):
    """Append a progress entry to scan record in SQLite."""
    await asyncio.to_thread(_append_scan_progress_sync, scan_id, item)
