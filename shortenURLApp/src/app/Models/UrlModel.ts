export interface Url {
    id: number;
    longURL: string;
    shortURL: string;
    startingDate: any;
    expiryDate: any;
    urlStatList: UrlStatList[];
}

export interface UrlStatList {
    id: number;
    clickDate: any;
    browser: string;
    platform: string;
}