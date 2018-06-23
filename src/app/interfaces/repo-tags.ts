export interface RepoTags {
  repos: Repos;
  tags: Tag[];
}

export interface Repos {
  [id: number]: string[];
}

export interface Tag {
  name: string;
  repos: number[];
  count: number;
}
