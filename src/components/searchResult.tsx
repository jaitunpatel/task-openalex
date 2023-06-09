// Import necessary dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Text } from '@mantine/core';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

// Define a function to make HTTP requests to the OpenAlex API
const searchArticles = async (query: string) => {
  const response = await axios.get(`https://api.openalex.org/institutions?search=${query}`);
    // const response = await axios.get(`https://api.openalex.org/articles?search=${query}`);
    // const response = await axios.get(`https://api.openalex.org/works?filter=institutions.id:https://openalex.org/I97018004`);
    // const response = await axios.get(`https://api.openalex.org/institutions?search=standford`);
    // console.log(response.data.results)
    return response.data;
  };
  
// Define a functional component for the search form
const SearchForm = ({ onSearch }: { onSearch: (query: string) => void }, props: TextInputProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  const theme = useMantineTheme();

  return (
    <form onSubmit={handleSubmit}>
        <TextInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon type="submit" size={32} radius="xl" color={theme.primaryColor} variant="filled">
                {theme.dir === 'ltr' ? (
                    <IconArrowRight size="1.1rem" stroke={1.5} />
                ) : (
                    <IconArrowLeft size="1.1rem" stroke={1.5} />
                )}
                </ActionIcon>
            }
            placeholder="Enter a search term"
            rightSectionWidth={42}
            {...props}
        />

    </form>
  );
};

// Define a functional component for displaying search results
interface Result {
  id: number;
  display_name: string;
  // abstract: string;
  // authors: string[];
  // publicationDate: string;
}

const SearchResultList = ({ results }: { results: Result[] }) => {
  console.log("RESULTSSSS",results)
  return (
    <div>
      {
        results.length ? results.map((result) => (
                  <div key={result.id}>
                    <Text size="lg">{result.display_name}</Text>
                    <Text>{result.display_name}</Text>
                  </div>))
           : <div>no results</div>
      }
    </div>
  );
};

// Define the main functional component for the page
const ArticleSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  


  const handleSearch = async (query: string) => {
    try {
      const articles = await searchArticles(query);      
      setResults(articles.results);
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
     {results.length && <SearchResultList results={results} />}
    </div>
  );
};

export default ArticleSearchPage;