/*-CommentBox
  -CommentList
    -Comment
  -CommentForm */

var comments = [
  {id: 1, author: "Tony", text: "React is cool"},
  {id: 2, author: "Jesse", text: "Redux is **Da Bomb**"},
];

//createClass is a contstructor method, able to create bark functiions, etc. etc.
var CommentBox = React.createClass({
  //use getInitialState since props can't change
  getInitialState: function() {
    return { data: [] };
  },

  loadCommentsFromServer: function() {
    // var _this = this;
    // //simulating ajax request
    // setTimeout(function() {
    //   _this.setState({ data: comments});
    // }, 5000);

    /***now doing ajax request***/
    $.ajax({
      url: this.props.url,
      method: 'get',
      dataType: 'json',
      success: function(data){
        this.setState({ data: data });
      }.bind(this)
    });
  },
  handleCommitSubmit: function(comment){
    console.log(comment);
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 1000);
  },

  render: function() {
    return (
      //state can and will change due to CommentBox
      <div className="commentBox">
        <CommentList
          data={this.state.data}
        />
        <CommentForm
          onCommentSubmit={this.handleCommitSubmit}
        />
      </div>
    );
  }
});


var CommentList = React.createClass({
  render: function() {
    //map - takes an array and changes it
    //changes from array to comments components
    //props will not change, diff from state above
    var commentNodes = this.props.data.map(function(comment, index){
      return (
        <Comment
        author={comment.author}
        key={index}
        >
          {comment.text}
        </Comment>
      );
    });
    // [
    // <Comment author="Tony">React is Cool</Comment>
    // <Comment author="Jesse">Redux is **really** Cool</Comment>
    // ];
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function(){
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e){
    this.setState({ author: e.target.value })
  },
  handleTextChange: function(e){
    this.setState({ text: e.target.value })
  },
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.state.author;
    var text = this.state.text;

    this.props.onCommentSubmit({ author: author, text: text});

    this.setState({ author: '', text: '' });
    // e.target.reset();
  },
  render: function() {
    return (
      <form
        className="commentForm"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something .."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button type="submit">Post</button>

      </form>
    );
  }
});

ReactDOM.render(
  //using url due to using ajax
  //jsonplaceholder.typicode.com
  //url should point to where your json server is
  <CommentBox url="http://localhost:3000/comments" />,
  document.getElementById('content')
);
