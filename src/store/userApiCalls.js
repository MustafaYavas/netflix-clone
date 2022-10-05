import { userActions } from './user-slice';

import { Navigate } from 'react-router-dom';

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

export const signinUser = async(user, dispatch) => {

    try {
        const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
            method: 'GET',
            headers: {
                'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk'
            }
        });

        const datas = await res.json();
        let userInfos = null;
        let userList = null;

        datas.data.rows.forEach(row => {
            if(row.columns[2].cell_value === user.email) {
                userInfos = row;
                userList = row.columns[0].cell_value.split(',')
            }    
        })
        
        if(userInfos !== null) dispatch(userActions.signinUser({
            email: userInfos.columns[2].cell_value,
            movieList: userList
        }));
        
    } catch (error) {
        console.log('Something went wrong while signing in!')
    }
    
}