// src/controllers/index.ts

import { Request, Response } from 'express';

interface CreateExampleRequest {
  // Define your request body type here
  data: any;
}

export const getExample = (req: Request, res: Response): void => {
  try {
    res.status(200).json({
      message: "This is an example response from the controller"
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

export const createExample = (
  req: Request<{}, {}, CreateExampleRequest>,
  res: Response
): void => {
  try {
    const data = req.body;
    
    if (!data) {
      return res.status(400).json({
        error: "Request body is required"
      });
    }

    // Logic to handle data creation
    res.status(201).json({
      message: "Data created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};