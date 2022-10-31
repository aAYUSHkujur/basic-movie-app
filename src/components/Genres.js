import { Chip, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import React from 'react';

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
      
    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);

    };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

            setGenres(data.genres);
        };

        console.log(genres);

        useEffect(() => {
            fetchGenres();
            // eslint-disable-next-line
        }, []);

    return ( 
    <div style={{ padding: "6px 0" }}> 
      <ThemeProvider theme={darkTheme}>
       {selectedGenres && selectedGenres.map((genre) => (
        <Chip label={genre.name}
            style={{margin: 2}}
            size="small" 
            color="secondary"
            key={genre.id}
            clickable
            onDelete={() => handleRemove(genre)}
            
            />
      ))}

      {genres && genres.map((genre) => (
        <Chip label={genre.name}
            style={{margin: 2}}
            size="small" 
            key={genre.id}
            clickable
            onClick={() => handleAdd(genre)}
            />
      ))}
      </ThemeProvider>
      
        
    </div>
    );
};

export default Genres;
