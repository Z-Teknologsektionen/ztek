export type CommitteMember = {
    role: string,
    name: string,
    email: string,
    imageUrl: string,
    prio: number
}


export type Committee = {
    route: string,
    name: string,
    description: string,
    longDescription: string,
    imageUrl: string,
    email: string,
    members: Array<CommitteMember>
}