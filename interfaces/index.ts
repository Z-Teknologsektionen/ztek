export type CommitteeMember = {
    role: string,
    name: string,
    email: string,
    imageUrl: string,
    prio: number
}


export type Committee = {
    route: string,
    name: string,
    type: string,
    description: string,
    longDescription: string,
    imageUrl: string,
    email: string,
    members: Array<CommitteeMember>
}


export type ZtekCard = {
    title: string,
    description: string,
    imageUrl: string,
    email?: string,
    phoneNumber?: string
}