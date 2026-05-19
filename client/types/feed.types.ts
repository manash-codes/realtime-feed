interface Feed {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { Feed };