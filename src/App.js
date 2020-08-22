import React, { useState } from 'react';
import Articles from './components/Articles'
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = (searchWord) => {
    setIsLoading(true)
    fetch(`https://newsapi.org/v2/everything?q=${searchWord}&apiKey=9152561a7d9f477eabb7741f4a904434`)
     .then(res => res.json())
     .then(res => setArticles(res.articles))
     .catch(err => console.error(err))
     .finally(() => setIsLoading(false))
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData(search);
    setSearch('');
  };

  const removeArticle = (selectedArticle) => {
    const filteredArticles = articles.filter(article => article.title !== selectedArticle.title)
    setArticles(filteredArticles)
  }

  return (
    <div className="App">
      <h2 className="title"> <strong>Newsorama</strong></h2>
      <form onSubmit={handleSubmit}>
        <label>
          Search News Article:
          <input type="text" value={search} onChange={event => setSearch(event.target.value)}/>
        </label>
        <button type="submit" value="Submit" />
      </form>
      {isLoading ? <span>Loading</span> :<Articles articles={articles} removeArticle={removeArticle}/>}
    </div>
  );
}

export default App;
