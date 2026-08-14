import os
import sys
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

# Add project root directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from llm import get_job_details
from database.chroma import get_portfolio_links, generate_cold_email

app = FastAPI(
    title="Cold Email Generator API",
    description="Backend API for extracting job postings and generating personalized cold emails using AI & ChromaDB portfolio search.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for dev/testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    url: str
    candidate_profile: Optional[str] = None

class EmailResponse(BaseModel):
    status: str
    email: str
    job: dict
    links: list

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Cold Email Generator API is running",
        "endpoints": {
            "generate_email": "POST /api/generate-email"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/generate-email")
def generate_email_endpoint(request: EmailRequest):
    url = request.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="Job posting URL is required.")

    try:
        # Step 1: Extract job details using LLM
        try:
            job = get_job_details(url)
        except Exception as scrape_err:
            print(f"Scraping error for {url}: {scrape_err}")
            raise HTTPException(
                status_code=400,
                detail=f"Could not load webpage from the provided URL ({url}). Please make sure it is a valid, publicly accessible job posting link."
            )

        if not job or not isinstance(job, dict):
            raise HTTPException(status_code=400, detail="Failed to extract job posting details from URL.")

        # Step 2: Get candidate profile (from request or file)
        candidate_profile = request.candidate_profile
        if not candidate_profile:
            candidate_file = os.path.join(os.path.dirname(__file__), "candidate.txt")
            if os.path.exists(candidate_file):
                with open(candidate_file, "r", encoding="utf-8") as f:
                    candidate_profile = f.read()
            else:
                candidate_profile = "Experienced software developer seeking new opportunities."

        # Step 3: Fetch relevant portfolio links from ChromaDB
        skills = job.get("skills", [])
        if not isinstance(skills, list):
            skills = [str(skills)] if skills else []

        links = get_portfolio_links(skills) if skills else []

        # Step 4: Generate personalized cold email using LLM
        email = generate_cold_email(job, links, candidate_profile)

        return {
            "status": "success",
            "email": email,
            "job": job,
            "links": links
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error generating cold email: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while generating the email: {str(e)}"
        )

# Also support POST /generate-email as alias
@app.post("/generate-email")
def generate_email_alias(request: EmailRequest):
    return generate_email_endpoint(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
