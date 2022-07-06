import React, { useState, useEffect} from "react"
import { FaQuoteLeft, FaTwitterSquare, FaTumblrSquare, FaGithubSquare } from "react-icons/fa"

export default function App() {
    const [ quoteShown, setQuoteShown ] = useState("")
    const [ newQuote, setNewQuote ] = useState(false)
    const [ color, setColor ] = useState("#123456")
    const [ textFade, setTextFade ] = useState({opacity: 0, transition: "ease 500ms"})

    useEffect(()=>{
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(r => r.json())
        .then(d => {
            let random = Math.floor(Math.random() * d.quotes.length)
            setQuoteShown(d.quotes[random])
            setColor(generateRandomHexColor())

            setTextFade({opacity: 1, transition: "ease 1500ms"})
        })
    }, [newQuote])

    const generateRandomHexColor = () => {
        const digits = "0123456789abcdef"
        let newColor = ''
        for( let i = 0; i < 6; i++ ) {
            newColor += digits[Math.floor(Math.random() * 16)]
        }
        return `#${newColor}`
      }

    function handleClick() {
        setNewQuote(prev => !prev)
        setTextFade({opacity: 0})
    }
    const background = {background: color, transition: "ease-in-out 1500ms"}
    const colorset = {color: color, transition: "ease-in-out 1500ms"}

    return (
        <div 
        className="app-container"
        style={background}
        >
            <div 
            className="quote-card">
                <h1
                  style={textFade} 
                  className="main-text">
                    <FaQuoteLeft />
                    {quoteShown.quote}
                </h1>
                <p 
                  style={textFade}
                  className="author">- {quoteShown.author}</p>
                <div className="btn-container">
                    <a
                      target="_blank"
                      href="https://twitter.com/intent/tweet"
                    ><FaTwitterSquare 
                      
                      style={colorset}
                      className="icon"/></a>

                    <a
                      target="_blank" 
                      href="https://www.tumblr.com/explore/trending?source=homepage_explore"><FaTumblrSquare 
                    style={colorset}
                    className="icon"/></a>
                    <button 
                      style={background}
                      className="btn"
                      onClick={handleClick}>New Quote</button>
                </div>
                
            </div>
            <footer className="footer">
              <a href="https://fazzolari17.github.io/personalPortfolio/" target={"_blank"}><FaGithubSquare className="github icon" style={colorset}/></a>
                Created By: Giuseppe Fazzolari 2022 © 
                
            </footer>
        </div>
    )
}