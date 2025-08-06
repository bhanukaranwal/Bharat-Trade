import React, { useState } from "react";

const tutorials = [
  {
    id: 1,
    title: "How to Trade on NSE",
    content:
      "Learn the basics of trading on the National Stock Exchange (NSE) including placing orders, types of orders, and trading hours.",
  },
  {
    id: 2,
    title: "Understanding Systematic Investment Plans (SIPs)",
    content:
      "A beginner's guide to SIPs, their benefits, and how to start an SIP with mutual funds in India.",
  },
  {
    id: 3,
    title: "Basics of Options Trading",
    content:
      "Introduction to options trading, including call and put options, strike price, expiry, and risk considerations.",
  },
];

const glossary = [
  { term: "DP Charges", definition: "Demat Participant charges for maintaining your demat account." },
  { term: "AMFI", definition: "Association of Mutual Funds in India, regulating the mutual fund industry." },
  { term: "SEBI", definition: "Securities and Exchange Board of India, the regulatory body for securities markets." },
  { term: "STT", definition: "Securities Transaction Tax levied on stock market transactions." },
  { term: "SPAN Margin", definition: "Standard Portfolio Analysis of Risk, margining system for futures and options." },
  { term: "MIS Order", definition: "Margin Intraday Square-off order type for intraday trading." },
];

const resourceLinks = [
  { name: "SEBI Official Website", url: "https://www.sebi.gov.in/" },
  { name: "NSE India", url: "https://www.nseindia.com/" },
  { name: "BSE India", url: "https://www.bseindia.com/" },
  { name: "AMFI", url: "https://www.amfiindia.com/" },
  { name: "RBI", url: "https://www.rbi.org.in/" },
];

const Education = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(tutorials[0].id);

  const handleSelectTutorial = (id) => {
    setSelectedTutorial(id);
  };

  const tutorialContent = tutorials.find((t) => t.id === selectedTutorial)?.content;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Educational Resources</h2>

      {/* Tutorials Section */}
      <section aria-labelledby="tutorials-heading">
        <h3 id="tutorials-heading" className="text-2xl font-semibold mb-4">
          Tutorials for Beginners
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <nav
            aria-label="Tutorial list"
            className="md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded shadow h-full"
          >
            <ul className="space-y-2">
              {tutorials.map((tutorial) => (
                <li key={tutorial.id}>
                  <button
                    onClick={() => handleSelectTutorial(tutorial.id)}
                    className={`w-full text-left p-2 rounded ${
                      selectedTutorial === tutorial.id
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100 dark:hover:bg-gray-700"
                    }`}
                    aria-current={selectedTutorial === tutorial.id ? "true" : "false"}
                  >
                    {tutorial.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded shadow">
            <p>{tutorialContent}</p>
          </article>
        </div>
      </section>

      {/* Glossary Section */}
      <section aria-labelledby="glossary-heading">
        <h3 id="glossary-heading" className="text-2xl font-semibold mb-4">
          Glossary of Indian Financial Terms
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-3xl mx-auto">
          {glossary.map(({ term, definition }) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="ml-4">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Useful Resources Section */}
      <section aria-labelledby="resources-heading">
        <h3 id="resources-heading" className="text-2xl font-semibold mb-4">
          Useful Links
        </h3>
        <ul className="list-disc pl-6 space-y-2 max-w-md mx-auto">
          {resourceLinks.map(({ name, url }) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                aria-label={`Visit ${name} website`}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Education;
