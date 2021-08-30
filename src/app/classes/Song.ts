export class Song {
    id: number;
    name?: string;
    src?: string;
    // type?: string;
    // date?: Date;
    singer?: string;
    // count_like?: number;
    // count_views?: number;
    // albumId?: number;
    // title?: string;
    // subtitle?: string;
    image?: string;
    // content?: string;
    // isPerformance?:boolean;
    constructor (id: number, name: string, src: string, singer: string, image: string) {
        this.id = id;
        this.name = name;
        this.src = src;
        this.singer = singer;
        this.image = image;
    }
}