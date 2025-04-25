// src/controllers/index.ts

export const getExample = (req, res) => {
    res.send("This is an example response from the controller.");
};

export const createExample = (req, res) => {
    const data = req.body;
    // Logic to handle data creation
    res.status(201).send({ message: "Data created successfully", data });
};

// Add more controller functions as needed