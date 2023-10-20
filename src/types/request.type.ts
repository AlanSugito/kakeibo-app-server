import express from "express";

interface IRequest extends express.Request {
  user: string;
}

export type { IRequest };
