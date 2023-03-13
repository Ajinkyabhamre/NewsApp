import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello ! i am constructor from News components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    console.log("componentDidMount");
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=90be0cc1fdfa4e6584bc9961cbd6c68e&page=1";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }
  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 8)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=90be0cc1fdfa4e6584bc9961cbd6c68e&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      });
    }
  };
  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=90be0cc1fdfa4e6584bc9961cbd6c68e&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container my-4">
        <h2>News - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((ele) => {
            return (
              <div className="col-md-3" key={ele.url}>
                <NewsItem
                  title={ele.title ? ele.title : ""}
                  description={ele.description ? ele.description : ""}
                  imgUrl={ele.urlToImage}
                  newsUrl={ele.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-evenly">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            Previous Page
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-danger"
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default News;
