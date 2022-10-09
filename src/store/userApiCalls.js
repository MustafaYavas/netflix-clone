import { userActions } from './user-slice';

import bcrypt from 'bcryptjs';

export const createUser = async(user, dispatch) => {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(user.password, 12);
    } catch (error) {
        return console.log(error);
    }
    try {
        await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': process.env.REACT_APP_DB_KEY,
            },
            body: JSON.stringify(
                {
                    "data": [
                        {
                            "columns": [
                                {
                                    "column_id": "uvvHlpp5t9uosBWm",
                                    "cell_data": ''
                                },
                                {
                                    "column_id": "dboK4av90BWKy9Ym",
                                    "cell_data":  hashedPassword
                                },
                                {
                                    "column_id": "33pTqMgvanB4wvcm",
                                    "cell_data": user.email
                                }
                            ]
                        }
                    ]
                }
            )
        })

        const authExpDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
        const newUser = {
            email: user.email,
            movieList: [],
            expDate: authExpDate
        }

        localStorage.setItem('userData', JSON.stringify(
            {
                user: user.email,
                movieList: [],
                expiration: authExpDate.toISOString()
            }
        ));

        dispatch(userActions.setUser(newUser));
    } catch(err) {
        console.log('Something went wrong while creating new user!')
    }
}

export const addMovie = async(movie, user, dispatch) => {
    try {
        const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'GET',
            headers: {
                'ApiKey': process.env.REACT_APP_DB_KEY
            }
        });
        const datas = await res.json();
        
        let rowDatas = {};
        datas.data.rows.forEach(row => {
            if(row.columns[2].cell_value === user) rowDatas = row;           
        })
        
        let newList = rowDatas.columns[0].cell_value === '' ? `${movie}` : `${rowDatas.columns[0].cell_value},${movie}`;
        
        await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': process.env.REACT_APP_DB_KEY,
            },
            body: JSON.stringify({
                "rows": [
                    {
                        "row_id": rowDatas.row_id,
                        "columns": [
                            {
                                "column_id": rowDatas.columns[0].column_id,
                                "update_cell_data": newList
                            }
                        ]
                    },
                ]
            })
        })

        dispatch(userActions.addMovieToList(movie))
    } catch (error) {
        console.log(error);
    }
}

export const removeMovie = async(movie, user, dispatch) => {
    try {
        const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'GET',
            headers: {
                'ApiKey': process.env.REACT_APP_DB_KEY
            }
        });
        const datas = await res.json();
        let rowDatas = {};
        datas.data.rows.forEach(row => {
            if(row.columns[2].cell_value === user) rowDatas = row;           
        })
        
        let newList = rowDatas.columns[0].cell_value.split(',').filter(item => (item !== movie.toString()));
        
        await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': process.env.REACT_APP_DB_KEY,
            },
            body: JSON.stringify({
                "rows": [
                    {
                        "row_id": rowDatas.row_id,
                        "columns": [
                            {
                                "column_id": rowDatas.columns[0].column_id,
                                "update_cell_data": newList.join(',')
                            }
                        ]
                    },
                ]
            })
        })
        dispatch(userActions.removeMovieFromList(movie))
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async(user, dispatch) => {
    try {
        const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'GET',
            headers: {
                'ApiKey': process.env.REACT_APP_DB_KEY
            }
        });
        const datas = await res.json();
        let rowId = '';
        datas.data.rows.forEach(row => {
            if(row.columns[2].cell_value === user) rowId = row.row_id;           
        })
        
        await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': process.env.REACT_APP_DB_KEY,
            },
            body: JSON.stringify(
                {
                    "row_ids": [
                        rowId
                    ]
                }
            )
        })

        dispatch(userActions.signoutUser())
    } catch (error) {
        console.log(error);
    }
}