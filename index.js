'use strict';

/* eslint-env browser */
/* globals React, ReactDOM */

// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('redditclone')
//   );


const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button', {
                onClick: () => this.setState({
                    liked: true
                })
            },
            'Like'
        );
    }
}

const domContainer = document.querySelector('#redditclone');
ReactDOM.render(e(LikeButton), domContainer);
