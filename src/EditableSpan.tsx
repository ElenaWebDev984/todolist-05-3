import {useState} from "react";

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
            ? <input
                autoFocus
                onBlur={offEdit}
                value={itemTitle}
                onChange={e => setItemTitle(e.target.value)}
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        offEdit()
                    }
                }}
            />
            : <span onDoubleClick={onEdit}>{title}</span>
    );
};

