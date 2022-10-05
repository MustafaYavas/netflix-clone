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