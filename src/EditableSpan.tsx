import {useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    title: string
    createItemTitle: (editTitle: string) => void
}


export const EditableSpan = ({title, createItemTitle}: EditableSpanType) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [itemTitle, setItemTitle] = useState<string>(title)
    const onEdit = () => setIsEdit(true)
    const offEdit = () => {
        setIsEdit(false)
        createItemTitle(itemTitle)
    }



    return (
        isEdit
            ? <TextField
                autoFocus
                onBlur={offEdit}
                value={itemTitle}
                onChange={e => setItemTitle(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        offEdit()
                    }
                }}
            />
            : <span onDoubleClick={onEdit}>{title}</span>
    );
};

