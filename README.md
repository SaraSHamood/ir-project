## Information Retrieval Systems Project
#### Fifth year - Damascus University

#### Dataset Choice:
1- First Dataset: [Antique Dataset](https://ir-datasets.com/antique.html#antique/test/non-offensive)
2- Second Dataset: [WebIsTouche Dataset](https://ir-datasets.com/beir.html#beir/webis-touche2020/v2)

#### Text Processing:
In both datasets, we start with *Text Preprocessing* by cleaning the data of unwanted tokens or replacing it with specific meaningful tokens by:
1- Detecting hyperlinks and replacing them with token "Link"
2- Normalizing emojis (Touche dataset)
3- Removing punctuation marks
4- Removing stopwords
5- Detecing numbers and replacing them with token "Number"
6- Stemming (Antique dataset)

#### Data Representation and Indexing:
Using the `TfidfVectorizer` to *weight* the data using the TF-IDF method then *represent* it in the form of *vectors*.

#### Searching: 
Upon receiving user input, the system *transforms* the query using the `TfidfVectorizer` model into a TF-IDF weighted vector, therefore, it can apply `cosine_similarity` between the *vectorized query* and the set of docs' vectors, the resulting output is used by the system to return *10 most accurate results* (documents) the answers the user query.

#### Query Suggestions (Optional Feature):
As the user starts entering their query into the input field, the system starts suggesting to the user queries believed to help the user *refining their query* by applying `cosine similarity` to user input and `queries` file attached to the given datasets.

#### Clustering (Optional Feature):
We use `KMeans` clustering to cluster the datasets each into *3* clusters. Each cluster's documents are supposed to have common features or answer the *same topic*. Later, we can search for documents by the help of clusters.

#### Topic Detection (Optional Feature):
As we used clustering, we can now determine *what cluster helps the most* in answering the user query and thus, retrieve the most common words in that cluster to use as *topic tags* to help enhance the user experience.

#### Evaluation:
We evaluate the system by calculating four criter



