export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
    author: string;
    category?: string;
}