import React, { Component } from 'react';

class TextAnalyzer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      uniqueWordsCount: 0,
      charCount: 0,
      searchString: '',
      replaceString: ''
    };
  }

  // Update state on text change and calculate stats
  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState({ text }, this.updateStatistics);
  };

  // Update word count and character count
  updateStatistics = () => {
    const { text } = this.state;
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    const charCount = (text.match(/[a-zA-Z0-9]/g) || []).length;

    this.setState({
      uniqueWordsCount: uniqueWords.size,
      charCount: charCount
    });
  };

  // Handle string replacement
  handleReplace = () => {
    const { text, searchString, replaceString } = this.state;
    const updatedText = text.split(searchString).join(replaceString);
    this.setState({ text: updatedText });
  };

  render() {
    return (
      <div className="text-analyzer">
        <textarea 
          value={this.state.text}
          onChange={this.handleTextChange}
          rows="10"
          cols="50"
          placeholder="Type here..."
        />

        <div className="stats">
          <p>Unique Word Count: {this.state.uniqueWordsCount}</p>
          <p>Character Count (Excluding spaces/punctuation): {this.state.charCount}</p>
        </div>

        <div className="replacement">
          <input
            type="text"
            placeholder="Search string"
            value={this.state.searchString}
            onChange={(e) => this.setState({ searchString: e.target.value })}
          />
          <input
            type="text"
            placeholder="Replace with"
            value={this.state.replaceString}
            onChange={(e) => this.setState({ replaceString: e.target.value })}
          />
          <button onClick={this.handleReplace}>Replace All</button>
        </div>
      </div>
    );
  }
}

export default TextAnalyzer;
