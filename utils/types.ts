import { definitions } from '../types/supabase';

export interface CommentType {
  id: number;
  slug: string;
  title: string;
  content: string;
  authorId: string;
  parentId: any;
  createdAt: string;
  isPublished: boolean;
  updatedAt: string;
  author: definitions['users'];
  isPinned: boolean;
  responsesCount: number;
  responses: CommentType[];
  parent?: CommentType;
  live: boolean;
  depth: number;
  justAuthored?: boolean;
  continueThread?: boolean;
  highlight?: boolean;
  isDeleted: boolean;
  isApproved: boolean;
  totalChildrenCount?: number;
  pageIndex?: number;
  path: number[];
  votes: number;
  upvotes: number;
  downvotes: number;
  userVoteValue: number;
  pathVotesRecent: number[];
  pathLeastRecent: number[];
  pathMostRecent: number[];
}

export interface User {
  handle?: string;
  name?: string;
  role?: any;
  id: string;
  image?: string;
}