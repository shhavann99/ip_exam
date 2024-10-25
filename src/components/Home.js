import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles')
      .then(response => response.json())
      .then(data => setArticles(data));
  }, []);

  const ChevronRightIcon = React.createElement(ChevronRight, {
    className: 'ml-2',
    size: 16,
  });

  return React.createElement(
    'div',
    { className: 'container mx-auto py-10' },
    React.createElement(
      'h1',
      { className: 'text-4xl font-bold mb-8 text-center' },
      'Career Guidance Articles'
    ),
    React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
      articles.map(article =>
        React.createElement(
          'div',
          {
            key: article.id,
            className:
              'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
          },
          React.createElement(
            'h2',
            { className: 'text-2xl font-semibold mb-4' },
            article.title
          ),
          React.createElement(
            'p',
            { className: 'text-gray-600 mb-4' },
            `${article.body.substring(0, 100)}...`
          ),
          React.createElement(
            'a',
            {
              href: `/article/${article.id}`,
              className:
                'flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300',
            },
            'Read more',
            ChevronRightIcon
          )
        )
      )
    )
  );
}

export default Home;