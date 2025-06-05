"""Configuration management for NLP services."""

from typing import Dict, Optional
import os
from pathlib import Path
import json

class NLPServiceConfig:
    """Configuration handler for NLP services.
    
    Manages API keys, endpoints, and other settings for various NLP services.
    Supports loading from environment variables or configuration files.
    """
    
    def __init__(self, api_key: Optional[str] = None, api_secret: Optional[str] = None):
        self.api_key = api_key or os.getenv('NLP_SERVICE_API_KEY')
        self.api_secret = api_secret or os.getenv('NLP_SERVICE_API_SECRET')
        self.settings: Dict = {}
        
    def load_from_file(self, config_path: str) -> None:
        """Load configuration from a JSON file.
        
        Args:
            config_path: Path to the configuration file
        """
        path = Path(config_path)
        if not path.exists():
            raise FileNotFoundError(f"Configuration file not found: {config_path}")
            
        with path.open('r') as f:
            config = json.load(f)
            
        self.api_key = config.get('api_key', self.api_key)
        self.api_secret = config.get('api_secret', self.api_secret)
        self.settings.update(config.get('settings', {}))
        
    def save_to_file(self, config_path: str) -> None:
        """Save current configuration to a JSON file.
        
        Args:
            config_path: Path where to save the configuration
        """
        config = {
            'api_key': self.api_key,
            'api_secret': self.api_secret,
            'settings': self.settings
        }
        
        path = Path(config_path)
        path.parent.mkdir(parents=True, exist_ok=True)
        
        with path.open('w') as f:
            json.dump(config, f, indent=2)
            
    def update_settings(self, settings: Dict) -> None:
        """Update service settings.
        
        Args:
            settings: Dictionary containing new settings
        """
        self.settings.update(settings)
        
    @property
    def is_configured(self) -> bool:
        """Check if the service is properly configured."""
        return bool(self.api_key and self.api_secret)