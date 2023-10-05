export interface Joke {
    created_at: string,
    icon_url: string,
    id: string,
    updated_at: string,
    url: string,
    value: string,
};

export interface FetchData {
    result: Array<Joke>;
    total: number,
};
