
export interface KTab {
    _id: string,
    difficulty: number,
    keysCount: number,
    interpreter: string,
    source: string,
    text: string,
    title: string,
    updated: Date,
    youtube: string,
}

export const getKTabSort = (sortField: string) => {
    let sort = {}
    switch (sortField) {
        case 'title':
            sort = {title: 1, _id: 1}
            break;
        case 'interpreter':
            sort = {interpreter: 1, title: 1, _id: 1}
            break;
        case 'difficulty':
            sort = {difficulty: 1, title: 1, _id: 1}
            break;
        case 'updated':
            sort = {updated: -1, _id: 1}
            break;
        case 'difficulty_desc':
            sort = {difficulty: -1, title: 1, _id: 1}
            break;
        default:
            sort = {title: 1, _id: 1}
            break;
    }
    return sort
}