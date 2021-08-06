import React from 'react';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://hlygsa8lmf.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <div className='f3 pa3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='f1'>
          {`${this.props.entries}`}
        </div>
        <div className='f3 pa3'>
          {`Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}

export default Rank;