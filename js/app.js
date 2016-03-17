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

  componentDidMount: function() {
    var _this = this;
    //simulating ajax request
    setTimeout(function() {
      _this.setState({ data: comments});
    }, 5000);
  },

  render: function() {
    return (
      //state can and will change due to CommentBox
      <div className="commentBox">
        <CommentList data={this.state.data}/>
        <CommentForm />
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
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

ReactDOM.render(
  //using url due to using ajax
  //jsonplaceholder.typicode.com
  <CommentBox url="http://localhost:3000/comments" />,
  document.getElementById('content')
);
