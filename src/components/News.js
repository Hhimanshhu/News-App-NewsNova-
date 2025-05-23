import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsItem from "./NewsItem";
import NewsSkeleton from "./NewsSkeleton";
import ScrollToTopButton from "./ScrollToTopButton.js";
import "./News.css";
import { useMemo } from "react";
import PropTypes from "prop-types";

const categoryMap = {
  home: "top",          // 👈 ensure it matches your route
  politics: "politics",
  technology: "technology",
  business: "business",
  entertainment: "entertainment",
  sports: "sports",
  health: "health",
  science: "science",
  environment: "environment",
  education: "education",
  crime: "crime",
  international: "world",
};


const News = ({ pagesize = 12, country = "in", category = "latest", loadingBarRef, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const loaderRef = useRef(null);
  const seenUrlsRef = useRef(new Set());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNews = useCallback(async (pageUrl = null) => {
    setLoading(true);
    loadingBarRef?.current?.continuousStart();

    const apiKey = "pub_82467b684518b4921693a70737906473a9172";
    const safeCategory = categoryMap[category?.toLowerCase()] ?? "top";
    const url = pageUrl
      ? `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=${safeCategory}&country=${country.toLowerCase()}&page=${pageUrl}`
      : `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=${safeCategory}&country=${country.toLowerCase()}`;

    try {
      console.log("Fetching news from:", url);
      const response = await fetch(url);
      const data = await response.json();

      console.log("API Response:", data);

      if (response.status === 429) {
        console.error("Rate limited: Too many requests (429)");
        setHasMore(false);
        return;
      }

      if (!Array.isArray(data.results)) {
        console.error("Malformed response: 'results' is not an array", data);
        setHasMore(false);
        return;
      }

      const newArticles = data.results.filter(
        (article) =>
          article.title &&
          article.description &&
          article.image_url &&
          article.link &&
          !seenUrlsRef.current.has(article.link)
      );

      setArticles((prev) => [...prev, ...newArticles]);
      newArticles.forEach(article => seenUrlsRef.current.add(article.link));
      setNextPage(data.nextPage || null);
      setHasMore(!!data.nextPage);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      loadingBarRef?.current?.complete();
    }
  }, [category, country, loadingBarRef]);

  useEffect(() => {
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - NewsNova`;
  }, [category]);

  useEffect(() => {
  setArticles([]);
  setHasMore(true);
  setNextPage(null);
  seenUrlsRef.current.clear();
  fetchNews();
}, [category, country, pagesize, fetchNews]);



 useEffect(() => {
  // On new search, scroll to top (optional for better UX)
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchNews(nextPage);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextPage, loading, hasMore, fetchNews]);

const filteredArticles = useMemo(() => {
  if (!searchQuery.trim()) return articles;
  const lowerQuery = searchQuery.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery)
  );
}, [articles, searchQuery]);

  return (
    <div className="container my-3">
      <div className="headingg">
        <h1 className="text-center" style={{ margin: "1px 50px" }}>
          NewsNova - Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
        </h1>
      </div>
      {filteredArticles.length === 0 && !loading && (
        <div className="text-center text-muted my-3">No results found for "{searchQuery}"</div>
      )}
        {searchQuery.trim() && (
        <h5 className="text-muted text-center mb-3">
          Showing search results for: <strong>{searchQuery}</strong>
        </h5>
      )}

      <div className="row">
        {filteredArticles.map((element) => (
          <div
            className="col-md-3 col-sm-6 col-12 d-flex align-items-stretch mb-3"
            key={`${element.link}-${element.pubDate}`}
          >
            <NewsItem
              title={element.title}
              description={element.description}
              imageurl={element.image_url}
              newsurl={element.link}
              date={element.pubDate}
              source={element.source_id}
            />
          </div>
        ))}
      </div>
      {loading && <NewsSkeleton count={9} />} 
      <div ref={loaderRef} style={{ height: "20px" }}></div>
      {!hasMore && (
        <div className="text-center text-muted my-3">No more articles to load</div>
      )}
      <ScrollToTopButton />
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  loadingBarRef: PropTypes.object,
};

export default News;


