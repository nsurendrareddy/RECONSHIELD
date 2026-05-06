"""Structured logging with Winston-style output."""
import logging
import sys

# Configure logger
logger = logging.getLogger("reconshield")
logger.setLevel(logging.DEBUG)

# Console handler with formatting
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
formatter = logging.Formatter(
    "%(asctime)s | %(levelname)-8s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
handler.setFormatter(formatter)
logger.addHandler(handler)
