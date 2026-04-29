import {SxProps} from '@mui/material'

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean):SxProps => ({
    p: 0,
    fontWeight: isDone ? 'normal' : 'bold',
    fontStyle: isDone ? 'italic' : 'none',
    opacity: isDone ? 0.5 : 1,
})