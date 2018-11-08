'use strict';

/* eslint-env browser */
/* eslint-disable class-methods-use-this */
/* globals React, ReactDOM */

class RedditNav extends React.Component {
  render() {
    return ( <nav>Reddit Clone</nav> );
  }
}

class RedditNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: true,
            post: {
                title: '',
                author: '',
                body: '',
                image: 'https://www.fillmurray.com/300/200'
            }
        };

        this.createNewPost = this.createNewPost.bind(this);
        this.updateField = this.updateField.bind(this);
    }
    
    createNewPost(e) {
        e.preventDefault();
        this.props.createNewPost(this.state.post);
    }

    updateField(e) {
        const post = Object.assign({}, this.state.post);
        post[e.target.name] = e.target.value;

        let submitDisabled = false;
        ['title', 'author', 'body', 'image'].forEach(e => {
            if (post[e] === '') {
                submitDisabled = true;
            }
        })

        this.setState({submitDisabled, post});
    }

    render() {
        const post = this.state.post;
        const isDisabled = this.state.submitDisabled;
        const submitClass = (isDisabled ? 'button-disabled' : 'button-primary');

        return ( 
            <form onSubmit={this.createNewPost}>
                <hr />
                <label htmlFor="title">Title</label>
                <input className={`u-full-width${post.title?'':' invalid'}`} type="text" 
                    name="title" value={post.title} onChange={this.updateField} />

                <label htmlFor="body">Body</label>
                <textarea className={`u-full-width${post.body?'':' invalid'}`}
                     name="body" value={post.body} onChange={this.updateField} />

                <label htmlFor="author">Author</label>
                <input className={`u-full-width${post.author?'':' invalid'}`} type="text" 
                    name="author" value={post.author} onChange={this.updateField} />

                <label htmlFor="image">Image</label>
                <input className={`u-full-width${post.image?'':' invalid'}`} type="text" 
                    name="image" value={post.image} onChange={this.updateField} />
                <label>
                    <input className={submitClass} type="submit" disabled={isDisabled} value="Create Post" />
                </label>
                <hr />
            </form>
        );
    }
}

class RedditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewPostForm: false,
        };

        this.toggleNewPostForm = this.toggleNewPostForm.bind(this);
        this.createNewPost = this.createNewPost.bind(this);
    }

    toggleNewPostForm() {
        this.setState({showNewPostForm: !this.state.showNewPostForm});
    }

    createNewPost(data) {
        this.setState({showNewPostForm: false});
        this.props.createNewPost(data);
    }

    render() {
        const postForm = this.state.showNewPostForm ? 
            <RedditNewPost createNewPost={this.createNewPost} /> : ''

        return ( <header>
            <input className="filter" name="filter" type="text" placeholder="Filter" 
                onChange={e => this.props.setFilter(e.target.value)}/>
            Sort by: {' '}
            <select name="sort" id="sort" 
                onChange={e => this.props.setSort(e.target.value)}>
                <option value="votes">Votes</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
            </select>
            <button className="u-pull-right button-primary" 
                onClick={this.toggleNewPostForm}>New Post</button>
            { postForm }
        </header>
        );
    }
}

class RedditPostComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {newComment: ''}
        this.addNewComment = this.addNewComment.bind(this);
    }

    addNewComment() {
        this.props.addComment(this.state.newComment, this.props.post.key);
        this.setState({newComment:''});
    }

    render() {
        const comments = this.props.post.comments
            .map(e => <div className="comment" key={e}>{e}</div>);
        return ( <div className="comments">
            {comments}
            <input onChange={e => this.setState({newComment: e.target.value})} value={this.state.newComment} />
            <button onClick={this.addNewComment}>Add Comment</button>
            </div>);
    }
}

class RedditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showComments: false };
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
    }

    upvote() {
        this.props.vote('up', this.props.post.key);
    }
    
    downvote() {
        this.props.vote('down', this.props.post.key);
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }

    render() {
        const post = this.props.post;
        const s = (post.comments.length === 1) ? '' : 's';

        return ( 
        <section className="post">
            <img src={post.image} alt={post.title} />
            <div className="title">{post.title}</div>
            <div className="votes">
                <i className="fas fa-arrow-up" onClick={this.upvote}></i> 
                <i className="fas fa-arrow-down" onClick={this.downvote}></i> 
                {' '}{post.votes}
            </div>
            <div className="author">{post.author}</div>
            <div className="content">{post.body}</div>

            <div className="comments">{moment(post.date).fromNow()} | {' '}
                <span onClick={this.toggleComments}>
                    <i className="fas fa-comment-alt"></i> {post.comments.length} Comment{s}
                </span>
                {this.state.showComments ? 
                    <RedditPostComments post={post} addComment={this.props.addComment} /> : ''}
            </div>
        </section> 
        );
    }
}

const sortBy = {
    votes: (a,b) => b.votes - a.votes,
    date: (a,b) => new Date(b.date) - new Date(a.date),
    title: (a,b) => a.title.localeCompare(b.title)
};

class RedditPosts extends React.Component {
  render() {
    const posts = this.props.posts
        .sort(sortBy[this.props.sortBy])
        .map(post => <RedditPost post={post} key={post.key} 
                      vote={this.props.vote} addComment={this.props.addComment} />)
    return ( <div>{posts}</div> );
  }
}

class RedditClone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts,
            sortBy: 'votes',
            filter: ''
        };

        this.createNewPost = this.createNewPost.bind(this);  
        this.vote = this.vote.bind(this);
        this.addComment = this.addComment.bind(this);    
    }

    createNewPost(data) {
        data.votes = 0;
        data.date = new Date();
        data.key = this.state.posts.length + 1;
        data.comments = [];
        this.setState({posts: this.state.posts.concat(data)});
    }

    getPostByKey(posts, key) {
        for (let i=0; i<posts.length; i++) {
            if (posts[i].key === key) {
                return posts[i];
            }
        }
    }

    vote(ud, key) {
        const posts = this.state.posts.slice();
        const post = this.getPostByKey(posts, key);

        if (post) {
            if (ud === 'up') {
                post.votes++;
            }
            else {
                post.votes = Math.max(0, post.votes-1);
            }
            this.setState(posts);
        }
    }

    addComment(comment, key) {
        const posts = this.state.posts.slice();
        const post = this.getPostByKey(posts, key);

        if (post) {
            post.comments.push(comment);
            this.setState(posts);
        }
    }

    render() {
        return (
        <div className="reddit-clone">
            <RedditNav />
            <div className="container">
                <RedditHeader 
                    filter={this.state.filter}
                    setFilter={filter => this.setState({filter})}
                    setSort={sortBy => this.setState({sortBy})}
                    createNewPost={this.createNewPost}
                />
                <RedditPosts 
                    posts={this.state.posts.filter(e => e.title.toLowerCase().match(this.state.filter.toLowerCase()))} 
                    sortBy={this.state.sortBy} 
                    vote={this.vote}
                    addComment={this.addComment} 
                />
                </div>
        </div>
        );
    }
}

const posts = [
    {
        title: 'The Haunter in the Dark',
        body: 'Horrible beyond conception was the Frye yard. The natives, all of a tangible object with measureable dimensions could so easily lead back at the virtual identity, and reflecting on what had set out through the solid form. One definite flash I shall go mad itself at Plate XII, which represented in gruesome detail a butcher’s shop of the frightful position of subordination and pleading. Noyes’s tones exuded a kind of jewellery that the kylix parted, and Willett appeared in the dark. Only once in a throaty voice of my prospective host. From his cursory survey were made. From the very moment I decided that the visions (rather than the worst had happened.',
        author: 'Robert Blake',
        image: 'https://r.hswstatic.com/w_907/gif/stufftoblowyourmind-23-2014-04-The_Haunter_of_the_Dark_by_PeteAmachree.jpg',
        votes: 5,
        date: '2014-03-01T21:28:56.782Z',
        key: 1,
        comments: ['First post', 'Welcome to 1996, bro.', 'Eat it, old man!']
    },
    {
        title: 'The Shadow over Innsmouth',
        body: 'The most we said almost nothing, for I had been turned back by the marine Old Ones. Heating devices were new and almost prostrating those in the centre of top probably breathing aperture. At end of torso, corresponding to projections at other end. This, I realised, was my first subconscious glance and supplied the rest—and of course it would be no use . . She’d have got me ye Sarcophagus of ye Spheres beyond. Have ye Wordes that bringe up YOGGE-SOTHOTHE, and sawe for ye firste Time that fface spoke of the arch was known to him, was to die. The life-glow—he knows how much had still to tell the audient void.',
        author: 'Obed Marsh',
        image: 'https://mcrassus.files.wordpress.com/2015/04/shadow-over-innsmouth.jpg',
        votes: 16,
        date: '2005-08-19T23:15:30.000Z',
        key: 2,
        comments: ['This is the only comment']
    },
    {
        title: 'The Colour out of Space',
        body: 'There was something more. The butler, tougher-fibred than I, did not wish to go thither because it suggests something Wilcox had told no one could perhaps crawl inconspicuously through the arched gate into Celephaïs and in charge of the lower hall, at one point there lay a trim white Nahum Gardner house amidst its fertile gardens and watch the dense personnel of such a doubt, although no ghostly evidence was damnably vast and imposing labyrinths of stone with a notorious cult-leader, lately expelled from England, who had suffered but little idea of any hippocephalic bird. Its outline against the walls of slippery thumping.',
        author: 'Nahum Gardner',
        image: 'https://f4.bcbits.com/img/a2106523465_10.jpg',
        votes: 2,
        date: '2013-06-02T13:38:16.002Z',
        key: 3,
        comments: []
    },
    {
        title: 'A Shadow out of Time',
        body: 'I was sure he had lately been so gruesomely musty. As it was, we hoped to descend and beard the unknown outer sky, but there is no common case—it is a human voice which Akeley said he was doing very well in his small motor, he thought he had exhausted the resources of his quest, and terrors unutterable and unimaginable abysses from unimaginable outer hells. It is stubborn but you can if you wish to go to marvel-shadowed Innsmouth. We shall see that she had been able to go down entirely, despite the Society’s unvarying determination not to flee for our crossing through the flume-like strait and into nighted plains of obscene fungi, soon commencing to climb one of which I had never been stirred up something intangible.',
        author: 'Nathan Peaslee',
        image: 'https://i.ytimg.com/vi/y7jp1CT1h6c/maxresdefault.jpg',
        votes: 8,
        date: '2011-03-08T09:28:16.002Z',
        key: 4,
        comments: []
    },
    {
        title: 'The Dunwich Horror',
        body: 'The most we said nothing of antiquarian rambles in the undergrowth. Upon everything was a subterrene staircase. Again and again the fear of such overmantels as still use speech. Their main immediate abode is a sheer perpendicular cliff at whose end were great globes of luminous crystal serving as commander of the things came to Toledo. My Arkham-born grandmother had seemed too anxious to preserve a means of receiving impressions are absurdly few, and in closing the bungalow itself. Willett now tried to get fourteen huge specimens to the plaza of twin lions and descend at last that the marking was the change in the same way since a change of habits really was.',
        author: 'Wilbur Whatley',
        image: 'https://vignette.wikia.nocookie.net/vsbattles/images/c/cd/Dunwich_horror.jpg',
        votes: 4,
        date: '2011-03-08T09:28:16.002Z',
        key: 5,
        comments: []
    },
    {
        title: 'The Statement of Randolph Carter',
        body: 'When a traveller in north central Massachusetts takes the wrong side of the orders brought them by the crude abodes indeed being dugouts on the right eye. As for me, and then flew to great heights or over long distances with their wings. The many slender tentacles into which the Great Ones in their reeking talons the remnants of puny, war-exhausted mankind—of a day when his removal to other and higher levels, and wide streets with blossom-laden urns and basins there to the right place, atween the rock held more temples than private homes, and in a while I saw the same stock—undoubtedly surviving through a jagged aperture perhaps five feet from the great peaks are of a burglar-alarm still shrilling from the application of profound and very monstrous meaning in the same unknown and inhuman frightfulness of the tragedy. There was an odd craving to plunge into the large amounts of meat from the same grim, pervasive irony in the year 1850, and of our long voyage, and had thereafter sold his cottage in West Fourteenth Street which disgusted me much less than an inch thick and puffy, about 2 a.m., Hart observed the unfinished College edifice. At the Essex Institute. About the fourteen biological specimens was to loose them on the southwest slope of the dark realm is enough to keep him silent. This, though, was chiefly disturbed by certain forbidden cults which have no other than disjointed fragments seemingly without clear motivation.',
        author: 'Harley Warren',
        image: 'http://www.epilogue.net/sites/default/files/imagecache/gallery_lg/images/08/02/29636_1199854800.jpg',
        votes: 11,
        date: '2011-03-08T09:28:16.002Z',
        key: 6,
        comments: []
    },
    {
        title: 'Facts Concerning the Late Arthur Jermyn and His Family',
        body: 'When a rise in temperature might, if prolonged, affect him fatally; and the workmen he appeared to develop into a gold, silver, and scarlet land of dreams to the variable, storm-ravaged surface, since light meant nothing to justify my course led in another unknown alphabet—this one of the temple or monastery. Some phosphorescent fish inside it gave me strange impressions of weaker men. I could not move much, and glistened too brightly in the autumn of 1918, and with archaic myths lurking in the moonlight. Half unconscious, I opened the door opened. The torch, flashing over the heap; here and there. He regretted coming clear of the same characters that the colonial army when news of my fathers had summoned me to lean and ill-favoured, were unclothed and packed in crates for other needs of his own living features in the night train to Arkham, and apologised for their geologic setting proved them to terms before the rest entities from the foothills where the river was now safe in the old myths avoided it—or perhaps all allusions had for some of the incident of the damnable honeycombs inside them, and rode off northward in his day, and the enormous bholes; but he replied that I must break through all the while the very large rocks, this one particular village of Newfane, reached in less than a hundred yards ahead of us.',
        author: 'Wade Jermyn',
        image: 'http://s1.thingpic.com/images/G4/ucEqybipnkojk9TB2vGyVDj3.jpeg',
        votes: 1,
        date: '2011-03-08T09:28:16.002Z',
        key: 7,
        comments: []
    },
    {
        title: 'The Thing on the Doorstep',
        body: 'The most individual feature about the anniversary of the sounds finally reached our consciousness—the first sounds we had found remained in the cold waste north of Pawtuxet; being afterward driven up the hill . . .” He paused exhausted, as the weeks of hideous Leng with its bizarre contents, and saw that our battery supply had had freaks and changes of personality that permitted explorations in remote corners and sing among themselves in barking and show of physical violence would bring a touch of foetor had been on his face and hands, the really marvellous drills that had come to earth or sky, no hearer was ever admitted to the Arkham without returning to the strange days, and knew that his base would need a paowerful sight o’ queer stuff in every line of bases, but no observer was in Newport, Boston, and later spent a month before—the nightmare creeping death. There was something vaguely appropriate about our early work: of our quest for scenes and effects out to be the land city was many million years older. It was noon now, but things were supposed to land and marine saurians and primitive mammals, find singular local wounds or injuries to bony structure not attributable to any thing right or wrong in my right knee and shoulder against a troubled antarctic sky and bedded itself in the Innsmouth folk was stronger there. There likewise appeared to be native to Innsmouth. I paused and drew into a stupor. After an hour to quiet him, but still he kept on.',
        author: 'Daniel Upton',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Asenath-Waite.jpg/170px-Asenath-Waite.jpg',
        votes: 7,
        date: '2011-03-08T09:28:16.002Z',
        key: 8,
        comments: []
    },
    {
        title: 'At the Mountains of Madness',
        body: 'West of that earthquake-born tempest which must have a few special contributions, financed the expedition; hence our first impression was one of his home in a locked mahogany cabinet once gracing the Ward home, where the trees in the escape. Many, indeed, feel that his genius and bound with cements of incredible skill and determination utterly alien in every respect like the animals for those denizens of the box’s inner wall near the steps, and so many moving shadows in that soil was fairly black with scrolls, flutings, and arabesques of inlaid gold. Tall and many-windowed were the hellish whine of accursed flutes.',
        author: 'William Dyer',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1432425468i/14957532._SX540_.jpg',
        votes: 21,
        date: '2011-03-08T09:28:16.002Z',
        key: 9,
        comments: []
    },
    {
        title: 'The Whisperer in Darkness',
        body: 'After twenty-two years of custom as a hopeless howl of chorused anguish and stricken flesh without mind would return from my mouth and begun to climb. The projecting locks were poor supports; but as I can give to history, philosophy, and the whir of the deaths of Merwin and Zenas had disappeared. There was left and reeled out of water, this transition was not of earth had flung off the current, conscious of the tongues during my memory and the mammals were standing in a kind of apologetic hacking or whispering sound drew my automatic pistol. Toward morning I telegraphed Akeley that I could barely distinguish voices in imitation of their crouching gait.',
        author: 'Henry Akeley',
        image: 'https://vignette.wikia.nocookie.net/lovecraft/images/3/31/Screenshot_20171022-090458.jpg',
        votes: 12,
        date: '2012-10-09T19:28:16.002Z',
        key: 10,
        comments: []
    }
];

const appDiv = document.querySelector('#redditclone');
ReactDOM.render(<RedditClone posts={posts} />, appDiv);
