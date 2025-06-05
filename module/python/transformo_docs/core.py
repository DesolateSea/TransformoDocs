"""Core NLP service implementation."""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from .config import NLPServiceConfig

class NLPTask(ABC):
    """Abstract base class for NLP tasks.
    
    All specific NLP task implementations should inherit from this class.
    """
    
    @abstractmethod
    def process(self, input_text: str, **kwargs) -> Dict[str, Any]:
        """Process the input text and return results.
        
        Args:
            input_text: The text to process
            **kwargs: Additional task-specific parameters
            
        Returns:
            Dictionary containing the processing results
        """
        pass

class TextClassification(NLPTask):
    """Text classification task implementation."""
    
    def process(self, input_text: str, **kwargs) -> Dict[str, Any]:
        # Implementation to be provided by service-specific classes
        raise NotImplementedError

class NamedEntityRecognition(NLPTask):
    """Named Entity Recognition (NER) task implementation."""
    
    def process(self, input_text: str, **kwargs) -> Dict[str, Any]:
        # Implementation to be provided by service-specific classes
        raise NotImplementedError

class SentimentAnalysis(NLPTask):
    """Sentiment analysis task implementation."""
    
    def process(self, input_text: str, **kwargs) -> Dict[str, Any]:
        # Implementation to be provided by service-specific classes
        raise NotImplementedError

class NLPService:
    """Main NLP service class that coordinates different NLP tasks."""
    
    def __init__(self, config: Optional[NLPServiceConfig] = None):
        self.config = config or NLPServiceConfig()
        self.tasks: Dict[str, NLPTask] = {}
        
    def register_task(self, name: str, task: NLPTask) -> None:
        """Register a new NLP task.
        
        Args:
            name: Name of the task
            task: Task implementation instance
        """
        self.tasks[name] = task
        
    def get_available_tasks(self) -> List[str]:
        """Get list of available NLP tasks.
        
        Returns:
            List of registered task names
        """
        return list(self.tasks.keys())
        
    def process(self, task_name: str, input_text: str, **kwargs) -> Dict[str, Any]:
        """Process text using the specified task.
        
        Args:
            task_name: Name of the task to use
            input_text: Text to process
            **kwargs: Additional task-specific parameters
            
        Returns:
            Dictionary containing the processing results
            
        Raises:
            KeyError: If the specified task is not registered
        """
        if not self.config.is_configured:
            raise ValueError("NLP service is not properly configured")
            
        if task_name not in self.tasks:
            raise KeyError(f"Task not found: {task_name}")
            
        task = self.tasks[task_name]
        return task.process(input_text, **kwargs)