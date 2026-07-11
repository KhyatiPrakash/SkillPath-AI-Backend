import Career from "../models/Career.js";

// Create Career
export const createCareer = async (req, res) => {
  const {
  title,
  description,
  category,
  requiredSkills,
  averageSalary,
  difficulty,
  futureScope,
  roadmap,
  learningResources,
} = req.body;

  if (!title || !description || !category || !averageSalary || !futureScope) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const careerExists = await Career.findOne({ title });

  if (careerExists) {
    res.status(400);
    throw new Error("Career already exists");
  }

  const career = await Career.create({
  title,
  description,
  category,
  requiredSkills,
  averageSalary,
  difficulty,
  futureScope,
  roadmap,
  learningResources,
});

  res.status(201).json(career);
};

// Get All Careers
export const getCareers = async (req, res) => {
  const careers = await Career.find({});
  res.status(200).json(careers);
};

// Get Career By ID
export const getCareerById = async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    res.status(404);
    throw new Error("Career not found");
  }

  res.status(200).json(career);
};

// Update Career
export const updateCareer = async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    res.status(404);
    throw new Error("Career not found");
  }

  const updatedCareer = await Career.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCareer);
};

// Delete Career
export const deleteCareer = async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) {
    res.status(404);
    throw new Error("Career not found");
  }

  await career.deleteOne();

  res.status(200).json({
    message: "Career deleted successfully",
  });
};

// Search Careers
export const searchCareers = async (req, res) => {
  const keyword = req.query.keyword;

  const careers = await Career.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
  });

  res.status(200).json(careers);
};

// Filter Careers by Category
export const filterCareers = async (req, res) => {
  const category = req.query.category;

  const careers = await Career.find({
    category: category,
  });

  res.status(200).json(careers);
};