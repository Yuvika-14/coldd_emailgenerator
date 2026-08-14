# # import chromadb
# # chroma_client = chromadb.Client()
# # collection = chroma_client.create_collection(name="my_collection")
# # collection.add(
# #     ids=["id1", "id2"],
# #     documents=[
# #         "This is a document about pineapple",
# #         "This is a document about oranges"
# #     ]
# # )
# # results = collection.query(
# #     query_texts=["This is a query document about hawaii"], # Chroma will embed this for you
# #     n_results=2 # how many results to return
# # )
# print(results)
from langchain_core.prompts import PromptTemplate
import pandas as pd

from langchain_groq import ChatGroq
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from llm import get_job_details
df = pd.read_csv("database/my_portfolio.csv")
print(df)

import chromadb
import uuid
llm1 = ChatGroq(
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile",
    max_tokens=None,
    timeout=None,
    max_retries=2
)

chroma_client = chromadb.PersistentClient('vectorstore')
collection = chroma_client.get_or_create_collection(name="portfolio")
if not collection.count():
    for _,row in df.iterrows():
        collection.add(documents=row["Techstack"],
                       metadatas={"links":row["Links"]},
                       ids=[str(uuid.uuid4())]),


# links = collection.query(query_texts=["skills"],n_results =2, include=["embeddings", "documents", "metadatas", "distances"])

#print(links)
def get_portfolio_links(skills):

    results = collection.query(
        query_texts=[", ".join(skills)],
        n_results=2
    )

    links = []

    for metadata in results["metadatas"][0]:
        links.append(metadata["links"])

    return links
# url = input("Enter job URL: ")

# json_res = get_job_details(url)


# job = json_res
# job['skills']

def generate_cold_email(job, links,candidate_profile):

    prompt_email = PromptTemplate.from_template(
        """
        ### JOB DESCRIPTION:
        
        
        {job_description}
              ### CANDIDATE PROFILE:

        {candidate_profile}
         
        ### CANDIDATE'S PORTFOLIO / PROJECTS:

        {link_list}

        ### INSTRUCTION:

        You are an AI-powered job outreach assistant helping a job candidate write a personalized cold email to a hiring manager or recruiter.
         
        Your job is to analyze the job description above and write a concise, highly personalized cold email expressing the candidate's interest in the role.

        The email should:

        1. Identify the most important skills, technologies, responsibilities, and requirements from the job description.
        2. Match those requirements with the candidate's relevant skills, experience, and projects.
        3. Highlight the MOST relevant project(s) from the candidate's portfolio provided below.
        4. Briefly explain how the candidate's experience relates to the specific requirements of the job.
        5. Show genuine interest in the company and role without sounding generic or overly promotional.
        6. Keep the email concise and suitable for contacting a recruiter or hiring manager.
        7. End with a clear but polite call to action, such as asking if they would be open to discussing the opportunity.


        ### IMPORTANT & STRICT GROUNDING RULES:

        1. Write the email from the perspective of the candidate (use the Candidate Name from CANDIDATE PROFILE).
        2. STRICT GROUNDING: Do NOT invent, fabricate, or assume any past job roles, domain experience (e.g. retail, store management, inventory, sales), skills, or achievements that are NOT explicitly listed in the CANDIDATE PROFILE.
        3. SENIORITY & EXPERIENCE MATCHING: Compare the required experience in JOB DESCRIPTION against the Candidate's actual experience level (e.g. Fresher / 8 months). If the job is a Team Lead, Manager, or Senior role requiring 3+ years:
           - NEVER claim the candidate is qualified for a Team Lead / Senior role.
           - Instead, write the email expressing interest in joining the company in an entry-level, junior, or associate position within their field of expertise, highlighting relevant projects and enthusiasm to learn under senior leaders.
        4. DOMAIN RELEVANCE: Focus on the candidate's actual background (e.g., Computer Science, Software Engineering, C++, Java, React, Python). Do not claim experience in unrelated non-technical fields.
        5. Mention only skills supported by the profile that relate to the role.
        6. If portfolio project links are provided in CANDIDATE'S PORTFOLIO, reference only those exact links.
        7. Keep the email concise, natural, professional, and free of generic clichés.
        8. Do NOT provide any preamble or commentary. Start directly with the email.

        ### EMAIL (NO PREAMBLE):


        """

    )

    chain = prompt_email | llm1

    response = chain.invoke({
        "job_description": str(job),
        "candidate_profile": candidate_profile,
        "link_list": links
      
    })

    return response.content
# prompt_email = PromptTemplate.from_template(
#     """
#     ### JOB DESCRIPTION:
#     {job_description}

#     ### INSTRUCTION:
#     You are Mohan, a business development executive at AtliQ. AtliQ is an AI & Software Consulting company that specializes in the seamless integration of business processes through automated tools.

#     Over our experience, we have empowered numerous enterprises with tailored solutions that focus on process optimization, cost reduction, and heightened overall efficiency.

#     Your job is to write a cold email to the client regarding the job mentioned above, highlighting how AtliQ can assist them in fulfilling their needs.

#     Also add the most relevant ones from the following links to showcase AtliQ's portfolio:{link_list}


#     Remember you are Mohan, BDE at AtliQ.

#     Do not provide a preamble.

#     ### EMAIL (NO PREAMBLE):
#     """
# )
# chain = prompt_email | llm1
# response = chain.invoke({"job_description":str(job),"link_list":links})
# print(response.content)
