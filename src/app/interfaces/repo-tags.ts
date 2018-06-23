export interface RepoTags {
  repos: Repos;
  tags: Tags;
}

export interface Repos {
  [id: number]: string[];
}

export interface Tags {
  [tag: string]: number[];
}
