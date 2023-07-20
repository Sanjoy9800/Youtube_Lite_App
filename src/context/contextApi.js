import React, { createContext, useState, useEffect } from "react";

// This line imports the fetchDataFromApi function from a file located in the "../utils/api" directory.
import { fetchDataFromApi } from "../utils/api";

// This line creates a new context object using the createContext() function from React. The context will be used to share state between components.
// javascript

export const Context = createContext();

// This line defines a new functional component named AppContext which takes props as its argument.
export const AppContext = (props) => {
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [searchResult, setSearchResult] = useState([]); // State variable to store search results
  const [selectCategorise, setSelectCategorise] = useState("New"); // State variable to store selected category
  const [mobileMenu, setMobileMenu] = useState(false);  // State variable to control mobile menu

  // This useEffect hook runs the fetchCategoriesData function when the selectCategorise state variable changes. 
  // It is used to fetch data based on the selected category.

  useEffect(() => {
    fetchCategoriesData(selectCategorise);
  }, [selectCategorise]);


  // This function fetchCategoriesData is responsible for fetching data from the API based on the provided query. 
  // It sets the loading state to true, makes an API request using fetchDataFromApi, and then updates the search result and loading state accordingly
  
  const fetchCategoriesData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      console.log(contents);
      setSearchResult(contents);
      setLoading(false);
    });
  };

  // This block of code returns the context provider component. It wraps the props.children with the Context.Provider 
  // component and provides the values of the state variables and their corresponding update functions as the context value.
  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResult,
        setSearchResult,
        selectCategorise,
        setSelectCategorise,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children} {/* Render the child components */}
    </Context.Provider>
  );
};
