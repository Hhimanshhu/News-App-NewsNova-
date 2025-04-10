import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"; 
import "./News.css";
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps ={
    pagesize : 12,
    country: 'in',
    category: 'latest'

  }

  static propTypes ={
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }


  async fetchNews(page) {
    this.setState({ loading: true });
    
    const { category, country, pagesize } = this.props;
    const number = pagesize;
    const offset = (page - 1) * number;
    
    

    let url = `https://api.worldnewsapi.com/search-news?api-key=69d64729e6e84f41aa5c5d8c96caff7d&text=${category}&language=en&number=${number}&offset=${offset}&source-countries=${country}`;


    // const url = `https://api.worldnewsapi.com/search-news?api-key=ce038b3a95ec4fdda1714cf58ee5a944&text=latest&language=en&number=${number}&offset=${offset}&source-countries=${country}`;
    // const url = `https://api.worldnewsapi.com/search-news?api-key=91cbc42864b44c1da1386d8c4d2a9b6b&text=latest&language=en&number=${number}&offset=${offset}`;
    // const url = `https://api.worldnewsapi.com/search-news?api-key=87155e4e91e74611b54817c8a156e5cd&text=latest&language=en&number=${number}&offset=${offset}`;
    // const url = `https://api.worldnewsapi.com/search-news?api-key=69d64729e6e84f41aa5c5d8c96caff7d&text=latest&language=en&number=${number}&offset=${offset}&source-countries=${country}`;

    ////Political News
    // const url = `https://api.worldnewsapi.com/search-news?api-key=ce038b3a95ec4fdda1714cf58ee5a944&text=politics&language=en&number=${number}&offset=${offset}`
    //const url = `https://api.worldnewsapi.com/search-news?api-key=91cbc42864b44c1da1386d8c4d2a9b6b&text=politics&language=en&number=${number}&offset=${offset}`
    //  const url = `https://api.worldnewsapi.com/search-news?api-key=87155e4e91e74611b54817c8a156e5cd&text=politics&language=en&number=${number}&offset=${offset}`
    


    //// Share Market News
    // const url = `https://api.worldnewsapi.com/search-news?api-key=ce038b3a95ec4fdda1714cf58ee5a944&text=stock%20market&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=91cbc42864b44c1da1386d8c4d2a9b6b&text=stock%20market&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=87155e4e91e74611b54817c8a156e5cd&text=stock%20market&language=en&number=${number}&offset=${offset}`
    //// Sports News
    // const url = `https://api.worldnewsapi.com/search-news?api-key=ce038b3a95ec4fdda1714cf58ee5a944&text=sports&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=91cbc42864b44c1da1386d8c4d2a9b6b&text=sports&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=87155e4e91e74611b54817c8a156e5cd&text=sports&language=en&number=${number}&offset=${offset}`

    //// Tech News   
    // const url = `https://api.worldnewsapi.com/search-news?api-key=ce038b3a95ec4fdda1714cf58ee5a944&text=technology&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=91cbc42864b44c1da1386d8c4d2a9b6b&text=technology&language=en&number=${number}&offset=${offset}`
    // const url = `https://api.worldnewsapi.com/search-news?api-key=87155e4e91e74611b54817c8a156e5cd&text=technology&language=en&number=${number}&offset=${offset}`
 


  
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        articles: data.news || [],
        loading: false,
        page: page,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ articles: [], loading: false });
    }
  }
  


  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country ||
      prevProps.pagesize !== this.props.pagesize
    ) {
      this.fetchNews(1); // reset to page 1 when category/country/pagesize changes
    }
  }

  handleNext = () => {
    this.fetchNews(this.state.page + 1);
  };

  handlePrevious = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsNova - Top Headlines</h1>
        {this.state.loading ? (
          <Spinner /> // Display Spinner while loading is true
        ) : (
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-3 d-flex align-items-stretch mb-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.text}
                  imageurl={element.image || "https://via.placeholder.com/150"}
                  newsurl={element.url}
                  date={element.publish_date}
                />
              </div>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-between mt-4">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            ⬅ Previous
          </button>
          <button className="btn btn-dark" onClick={this.handleNext}>
            Next ➡
          </button>
        </div>
      </div>
    );
  }
}


