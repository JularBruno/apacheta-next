// This file contains type definitions for  data.

export interface User {
    id: string;
    // name: string;
    email: string;
    password: string;
    // role: string;
    // balance: string;
};
  
export interface Category {
    createdAt?: string;
    id: string;
    name: string;
    updatedAt?: string;
    userId: string;
  };
  
export interface Tag {
    createdAt?: string;
    id?: string;
    categoryId: string;
    name: string;
    updatedAt?: string;
    userId: string;
  };
  