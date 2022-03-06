const { useState} = React;

function Navbar() {
    return (
        <nav className="nav">
            <div className="logo">
                <img src="../images/logo.png"></img>
                <h1>Meme Generator</h1>
            </div>            
        </nav>
    )
}

let memesData = [
    {
        img: "../images/image1.png",
    },
    {
        img: "../images/image2.png"
    },
    {
        img: "../images/image3.png"
    }
]

function ChooseMeme() {
    let [meme, setMeme] = useState(
        {
            firstInput: "",
            secondInput: "",
            randomImage: "../images/image3.png"
        }
    )
    
    let [allMemes, setAllMemes] = useState([]);

    React.useEffect(() => {
        async function getMemes() {
            let res = await fetch("https://api.imgflip.com/get_memes")
            let data = await res.json();
            setAllMemes(data.data.memes)
        }
        getMemes();
    },[])
    
    function handleClick(e) {
        e.preventDefault();
        let random = Math.floor(Math.random() * allMemes.length);
        let url = allMemes[random].url;
        setMeme(prevState => 
            {
                return {
                    ...prevState,
                    randomImage: url
                }
            }
        )
    }
    
    function handleChange(e) {
        setMeme(prevMemeData => {
            let {name, value} = e.target;
            return {
                ...prevMemeData,
                [name]: value
            }
        })
    }


    return (
        <div className="choose-meme">
            <form>
                <div className="inputs">
                    <input 
                        type="text"
                        name="firstInput"
                        placeholder="First..."
                        value={meme.firstInput}
                        className="first-input"
                        onChange={handleChange}
                        />
                    <input 
                        type="text"
                        name="secondInput"
                        placeholder="Second..."
                        value={meme.secondInput}
                        className="second-input" 
                        onChange={handleChange}
                    />
                </div>

                <button 
                    className="input-btn" 
                    onClick={handleClick}
                >
                    random meme image
                </button>
                
                <div className="image">
                    <img src={meme.randomImage} />
                    <p>{meme.firstInput}</p>
                    <p>{meme.secondInput}</p>
                </div>
            </form>
        </div>
    )
}

function App() {
    return (
        <div>
            <Navbar />
            <ChooseMeme/>
        </div>
    )
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
)