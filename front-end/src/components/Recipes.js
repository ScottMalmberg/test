import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import DeleteRecipe from './DeleteRecipe';

const RECIPES_QUERY = gql`
    {
        recipes {
            id
            createdAt
            title
            ingredients
            instructions
        }
    }
`;

const ViewRecipes = () => {
    const { loading, error, data } = useQuery(RECIPES_QUERY);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :(</p>;
    console.log(data);
    return data.recipes.sort((a,b) => b.createdAt - a.createdAt).map(({ id, title, ingredients, instructions }) => (
        <div className="recipe-card mb-3 p-4" key={ id } style={{
          backgroundColor: `#d3d3d347`,
          borderRadius: `5px`,
        }}>
            <DeleteRecipe id={ id }/>
            <h1>{title}</h1>
            <p><strong>Ingredients: </strong>{ingredients}</p>
            <p><strong>Instructions: </strong>{instructions}</p>
        </div>
    ))
}

export { RECIPES_QUERY };
export default ViewRecipes;