import os
os.environ["USER_AGENT"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ColdEmailGenerator/1.0"

from langchain_groq import ChatGroq
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
llm = ChatGroq(
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile",
    max_tokens=None,
    timeout=None,
    max_retries=2
)

# print(res.content)
def get_job_details(url):

    # Scrape website
    loader = WebBaseLoader(url)

    page_data = loader.load().pop().page_content

    # Prompt
    prompt_extract = PromptTemplate.from_template(
        """
        ### SCRAPED TEXT FROM WEBSITE:
        {page_data}

        ### INSTRUCTION:
        Extract the job posting information from the scraped text.

        Return ONLY valid JSON with the following keys:

        "role": The job title.

        "experience": The REQUIRED YEARS OF EXPERIENCE for the role.
        Look for explicit statements such as:
        "6+ years of experience"
        "3-5 years of experience"
        "0-3 years of experience"

        IMPORTANT:
        Do NOT treat job levels such as "MTS 1", "MTS 2", "Senior",
        "Staff", "L1", "L2", etc. as experience.
        "MTS 1" is a job level/title, NOT years of experience.

        "skills": Extract the technical skills explicitly mentioned
        in the job posting. Return them as a JSON array.

        "description": Extract the job responsibilities and requirements.

        Do not invent information.
        If the required years of experience are not explicitly mentioned,
        return null.

        ### VALID JSON (NO PREAMBLE):
        """
    )




    # Run LLM
    chain = prompt_extract | llm

    response = chain.invoke(
        input={"page_data": page_data}
    )

    # Convert LLM response into Python dictionary
    json_parser = JsonOutputParser()

    json_res = json_parser.parse(response.content)

    return json_res
# loader = WebBaseLoader("https://jobs.intuit.com/job/-/-/27595/98962244160?cid=job_li_click_in_active-fy20_cn_text_job_intuit-talent")
# page_data = loader.load().pop().page_content
# print(page_data)
# # recruiter@clinchedge.com


# prompt_extract = PromptTemplate.from_template(
#     """
#     ### SCRAPED TEXT FROM WEBSITE:
#     {page_data}

#     ### INSTRUCTION:
#     Extract the job posting information from the scraped text.

#     Return ONLY valid JSON with the following keys:

#     "role": The job title.

#     "experience": The REQUIRED YEARS OF EXPERIENCE for the role.
#     Look for explicit statements such as:
#     "6+ years of experience"
#     "3-5 years of experience"
#     "0-3 years of experience"

#     IMPORTANT:
#     Do NOT treat job levels such as "MTS 1", "MTS 2", "Senior",
#     "Staff", "L1", "L2", etc. as experience.
#     "MTS 1" is a job level/title, NOT years of experience.

#     "skills": Extract the technical skills explicitly mentioned
#     in the job posting. Return them as a JSON array.

#     "description": Extract the job responsibilities and requirements.

#     Do not invent information.
#     If the required years of experience are not explicitly mentioned,
#     return null.

#     ### VALID JSON (NO PREAMBLE):
#     """
# )
# chain = prompt_extract | llm 
# response = chain.invoke(input = {'page_data':page_data})
# print(response.content)


# json_parser = JsonOutputParser()
# json_res = json_parser.parse(response.content)

# print(json_res)