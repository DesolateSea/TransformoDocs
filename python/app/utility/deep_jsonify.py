import json
from typing import Any

def deep_jsonify(obj: Any) -> Any:
    """
    Recursively walk through `obj`. If you find a string that can be json.loads()-parsed,
    parse it; otherwise leave it as-is. Returns a structure containing only dicts, lists,
    ints, floats, booleans, and None (no embedded JSON strings).
    """
    # If it's a dict, recurse into each value
    if isinstance(obj, dict):
        return {k: deep_jsonify(v) for k, v in obj.items()}

    # If it's a list/tuple, recurse into each element
    if isinstance(obj, list) or isinstance(obj, tuple):
        return [deep_jsonify(v) for v in obj]

    # If it's a string, try to parse as JSON; if that fails, return as-is
    if isinstance(obj, str):
        try:
            parsed = json.loads(obj)
        except (json.JSONDecodeError, TypeError):
            return obj
        else:
            return deep_jsonify(parsed)

    # Anything else (int, float, bool, None, etc.) just return directly
    return obj
