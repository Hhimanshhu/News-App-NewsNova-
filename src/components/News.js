import React, { useState, useEffect, useRef, useCallback } from "react";
import NewsItem from "./NewsItem";
import NewsSkeleton from "./NewsSkeleton";
import ScrollToTopButton from "./ScrollToTopButton.js";
import "./News.css";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const News = ({
  pagesize = 12,
  country = "in",
  category = "latest",
  loadingBarRef,
  searchQuery,
}) => {
  const { category: categoryParam } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const loaderRef = useRef(null);
  const seenUrlsRef = useRef(new Set());

  const actualCategory =
    categoryParam === "home"
      ? "top"
      : (categoryParam || "latest").toLowerCase();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNews = useCallback(
    async (pageUrl = null) => {
      setLoading(true);
      loadingBarRef?.current?.continuousStart();

      const apiKey = "pub_858716e13bf04ff077807ae24bb431879554e";
      const safeCategory = actualCategory;

      // const safeCategory = category === "home" ? "top" : category.toLowerCase();
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
        newArticles.forEach((article) => seenUrlsRef.current.add(article.link));
        setNextPage(data.nextPage || null);
        setHasMore(!!data.nextPage);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
        loadingBarRef?.current?.complete();
      }
    },
    [actualCategory, country, loadingBarRef]
  );

  useEffect(() => {
    document.title = `${
      actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1)
    } - NewsNova`;
  }, [actualCategory]);

  useEffect(() => {
    setArticles([]);
    setHasMore(true);
    setNextPage(null);
    seenUrlsRef.current.clear();
    fetchNews();
  }, [actualCategory, country, pagesize, fetchNews]);

  useEffect(() => {
    // On new search, scroll to top (optional for better UX)
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const displayCategory =
    actualCategory === "top"
      ? "Top"
      : actualCategory.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container my-3">
      <div className="headingg">
        <h1 className="text-center" style={{ margin: "1px 50px" }}>
          NewsNova - {displayCategory} Headlines
        </h1>
      </div>
      {filteredArticles.length === 0 && !loading && (
        <div className="text-center text-muted my-3">
          No results found for "{searchQuery}"
        </div>
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
        <div className="text-center text-muted my-3">
          No more articles to load
        </div>
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
