import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const entries = Object.fromEntries(params.entries());

  const handleCopy = (key) => {
    const value = entries[key];
    navigator.clipboard.writeText(value)
      .then(() => {
        setMessage('Copied to clipboard 🤓');
      })
      .catch((err) => {
        setMessage('Failed to copy to clipboard 😢');
        console.error(err);
      });
  };

  useEffect(() => {
    if (! message) {
      return;
    }
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <main>
      {message && <span className="message">{message}</span>}
      {Object.keys(entries).length === 0 && (
        <p>
          No query string parameters found 😬<br/>
          <a href="/?foo=bar&fizz=buzz">Example</a>
        </p>
      )}
      {Object.keys(entries).map((key) => (
        <article
          key={key}
          onClick={() => handleCopy(key)}
          title="Click to copy to clipboard"
        >
          <strong>{key}</strong><br/>
          <span>{entries[key]}</span>
        </article>
      ))}
    </main>
  )
}

export default App
