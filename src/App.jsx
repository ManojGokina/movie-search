import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  setSearchText,
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "./redux/action";

const App = () => {
  const dispatch = useDispatch();
  const { searchText, movies, error } = useSelector((state) => state);
  const [disabled, setDisabled] = useState(false);
  const [searchType, setSearchType] = useState()

  const handleSearchTextChange = (e) => {
    const newText = e.target.value;
    dispatch(setSearchText(newText));
  };

  const API_KEY = "333fad7c";

  const handleSearch = () => {
    if (!searchText.trim()) {
      dispatch(fetchMoviesFailure("Please enter a movie title."));
      return;
    }
    setDisabled(true);
    dispatch(fetchMoviesRequest());

    const apiUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}&plot=full`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False") {
          dispatch(fetchMoviesFailure("No results found. Please try again."));
          setDisabled(false);
        } else {
          dispatch(fetchMoviesSuccess(data.Search || []));
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setDisabled(false);
        dispatch(
          fetchMoviesFailure("Error fetching movie data. Please try again.")
        );
      });
  };

  const handleSearchTypeChange = (e) => {
    console.log(e)
    setSearchType(e.target.value);
  }

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          fontWeight: "bold",
          backgroundImage: "linear-gradient(to right, #3f51b5, #2196f3)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Movie Search
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            label="Enter movie title"
            variant="outlined"
            value={searchText}
            size="small"
            onChange={handleSearchTextChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="search-type-label">Search Type</InputLabel>
            <Select
              labelId="search-type-label"
              id="search-type"
              value={searchType}
              onChange={(e) => handleSearchTypeChange(e)}
              size="small"
            >
              <MenuItem value="t">Full</MenuItem>
              <MenuItem value="s">Short</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={disabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography variant="body2" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      {movies.length > 0 && (
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={movie.Title}
                    height="140"
                    image={movie.Poster}
                    style={{ objectFit: "fill", height: "330px" }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Year: {movie.Year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default App;
