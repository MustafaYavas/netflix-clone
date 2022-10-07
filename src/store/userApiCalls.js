import { userActions } from './user-slice';

export const createUser = async(user, dispatch) => {
    try {
        await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk',
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
                                    "cell_data": user.password
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
        const newUser = {
            email: user.email,
            movieList: []
        }
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk'
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk',
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk'
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk',
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk'
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
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk',
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