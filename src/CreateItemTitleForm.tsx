import {Button} from "./Button.tsx";
import {type ChangeEvent, useState, type KeyboardEvent} from "react";

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
            <input className={error ? 'error' : ''}
                   value={titleInputValue}
                   onChange={changeTitleInputHandler}
                   onKeyDown={createTaskOnEnterHandler}
            />
            <Button title={'+'}
                    onClick={createTitleHandler}
            />
            {error && <div className={'error-message'}>{error}</div>}
            {/*{!error && titleInputValue.length < minTitleLength && <div>Min title length is {minTitleLength} characters</div>}*/}
            {/*{!error && titleInputValue.length < maxTitleLength && <div>Max title length is {maxTitleLength} characters</div>}*/}
        </div>
    );
};

