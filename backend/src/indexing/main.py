from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware
from pydantic import BaseModel
from indexing import transform_by
import httpx

class Options(BaseModel):
    dataset: str
    clustering: bool

class Body(BaseModel):
    query: str
    options: Options

app = FastAPI()

origins = [
    "http://localhost:4200", 
    "http://localhost:8000",
    "http://localhost:3500",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
matching_service_url = 'http://localhost:3500'


@app.post('/')
async def indexing(body: Body):    
    query = body.query
    options = body.options
    
    query_vector = transform_by(
        query=query,
        dataset=options.dataset,
    )
                
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=matching_service_url,
            json={
                "query_vector": query_vector.toarray().tolist(),
                "options": {
                    "dataset": options.dataset,
                    "clustering": options.clustering,
                },
            },
        )
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Error calling matching & ranking service!",
        )
    
    res = response.json()
    
    return {
        "data": res['data'],
    }