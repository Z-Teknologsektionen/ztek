import useSWR from 'swr'
import { Committee } from '../interfaces'
import sektionsorgan from './sektionsorgan.json'

const fetcher = (url: string) => {
    return fetch(url).then(r => r.json())
}

const mockCommitteeFetcher = () => {
    // setTimeout(() => {return sektionsorgan}, 1000);
    return sektionsorgan
}

export default function getAllCommittees() {
    const { data, error, isLoading } = useSWR(`/api/committees`, mockCommitteeFetcher)

    return {
        committees: data,
        isLoading,
        isError: error
    }
}