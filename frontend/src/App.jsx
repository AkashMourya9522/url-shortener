import { useState } from "react";
import "./App.css";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";

function App() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  function handleInput(e) {
    setInput(e.target.value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/create", {
        url: input,
      });
      console.log(res.data);
      setShortUrl("http://localhost:3000/api/redirect/" + res.data.short_url);
    } catch (error) {
      console.log("There seems to be an error i guess");
    }
  }

  async function handleRedirectForm(e) {
    e.preventDefault();
    console.log(shortUrl);
    window.location.href = shortUrl;
  }

  return (
    <div className="min-h-screen bg-slate-300 flex justify-center items-center">
      <div className="bg-white p-5 flex flex-col rounded-lg gap-5 shadow-lg sm:w-md">
        <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
          <h1 className="text-xl font-medium text-center">URL Shortener</h1>
          <p className="">Enter Your URL</p>
          <input
            value={input}
            onChange={handleInput}
            type="text"
            className="p-3 bg-slate-200 rounded-lg focus:outline-none"
            placeholder="Enter Your URL make sure to have https:// too"
          />
          <button
            type="submit"
            className="p-3 text-white text-lg bg-green-400 rounded-lg font-medium hover:opacity-90 hover:cursor-pointer"
          >
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <form onSubmit={handleRedirectForm}>
            <p>Generated Link is</p>
            <a
              href={shortUrl}
              target="_blank"
              type="submit"
              className="text-green-400 "
            >
              {shortUrl}
            </a>
            <FaRegCopy
              onClick={() => {navigator.clipboard.writeText(shortUrl);setCopied(true)}}
              className="hover:cursor-pointer inline ml-2"
            />
            {
              copied && <p>Copied</p>
            }
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
