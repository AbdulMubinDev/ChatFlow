from __future__ import annotations

from functools import lru_cache
from typing import Optional, Dict, Any

from django.conf import settings

try:
    from pymongo import MongoClient
except Exception:  # pragma: no cover - pymongo might be missing locally
    MongoClient = None


@lru_cache(maxsize=1)
def _client() -> Optional[MongoClient]:
    if not settings.MONGO_URI or MongoClient is None:
        return None
    return MongoClient(settings.MONGO_URI, serverSelectionTimeoutMS=3000)


def log_chat_message(message: Dict[str, Any]) -> None:
    client = _client()
    if client is None:
        return
    try:
        db = client[settings.MONGO_DB_NAME]
        collection = db[settings.MONGO_MESSAGES_COLLECTION]
        collection.insert_one(message)
    except Exception:
        # Fail silently; SQL storage is still primary
        pass

