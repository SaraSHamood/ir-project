from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from matching_ranking import search_by, get_topic_tags
from lib import get_kmeans, get_vectorizer, get_terms
from typing import Union


class Options(BaseModel):
    dataset: str
    clustering: bool

class Body(BaseModel):
    query_vector: list
    options: Options

app = FastAPI()

origins = [
    "http://localhost:4200", 
    "http://localhost:8000", 
    "http://localhost:3500", 
    "http://localhost:3000", 
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
    

@app.post('/')
async def matching(body: Body):
    query_vector = body.query_vector
    options = body.options

    top_k_docs = search_by(
        query_vector=query_vector,
        dataset=options.dataset,
        clustering=options.clustering
    )

    return {
        "data": top_k_docs,
    }
    
@app.get('/tags')
async def get_tags(
    q: Union[str, None] = None,
    dataset: str = 'touche'
    ):
    
    tags = get_topic_tags(
        kmeans=get_kmeans(dataset=dataset),
        terms=get_terms(dataset=dataset),
        lab_idx=get_kmeans(dataset).predict(get_vectorizer(dataset).transform([q])[0]),
    )
    
    return tags[0].replace('[','').replace(']','').replace('\'','').split()