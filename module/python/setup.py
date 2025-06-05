from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="transformo-docs",
    version="0.1.0",
    author="SIH Team",
    author_email="team@sih.com",
    description="A modular interface for accessing various NLP services",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/sih/transformo-docs",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.7",
    install_requires=[
        "requests>=2.25.0",
        "typing-extensions>=3.7.4",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "black>=20.8b1",
            "mypy>=0.800",
        ],
    },
)