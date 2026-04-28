
import {type ChangeEvent, useState, type KeyboardEvent} from "react";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

type CreateItemTitleFormType = {
    createTitle: (title: string) => void
    maxTitleLength?: number
    minTitleLength?: number
}


export const CreateItemTitleForm = ({createTitle}: CreateItemTitleFormType) => {
    const [titleInputValue, setTitleInputValue] = useState('')

    const [error, setError] = useState<string | null>(null)

    const changeTitleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTitleHandler()
        }
    }

    const createTitleHandler = () => {
        const trimmedItemTitle = titleInputValue.trim()
        if (trimmedItemTitle !== '') {
            createTitle(trimmedItemTitle)
            setTitleInputValue('')
        } else {
            setError('Title is required')
        }
    }


    return (
        <div>
            <TextField
                variant={'standard'}
                size={"small"}
                className={error ? 'error' : ''}
                value={titleInputValue}
                onChange={changeTitleInputHandler}
                onKeyDown={createTaskOnEnterHandler}
                helperText={error && 'Enter valid title'}
            />
            <IconButton
                size={'small'}
                onClick={createTitleHandler}
                disabled={!titleInputValue}
            >
                <AddBoxIcon fontSize={'large'}/>
            </IconButton>
            {error && <div className={'error-message'}>{error}</div>}
            {/*{!error && titleInputValue.length < minTitleLength && <div>Min title length is {minTitleLength} characters</div>}*/}
            {/*{!error && titleInputValue.length < maxTitleLength && <div>Max title length is {maxTitleLength} characters</div>}*/}
        </div>
    );
};

