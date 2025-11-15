import Author from "../models/authors.js";
import logger from "../utils/logger.js";

const createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;
    logger.info("Create Author Endpoint");
    // Check if author already exists
    const existingAuthor = await Author.findOne({ name });

    if (existingAuthor) {
      logger.warn("Author already exists");
      return res.status(400).json({
        success: false,
        message: `Author already exists with the name "${name}"`,
      });
    }

    // Create and save new author
    const newAuthor = await Author.create({ name, email });
    logger.info("Author is created");
    return res.status(201).json({
      success: true,
      message: "Author successfully created",
      author: newAuthor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listAuthor = async (req, res) => {
  try {
    logger.info("List All Author endpoint ... ");

    const authorlist = await Author.find();

    if (authorlist.length === 0) {
      logger.warn("There is no author list in db ");
      return res.status(200).json({
        success: true,
        message: "There is no author in db",
        list: [],
      });
    }

    return res.status(201).json({
      success: true,
      list: authorlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const id = req.params;
    const updateData = req.body;

    logger.info("Updating Author Endpoint... ");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid author ID",
      });
    }

    const author = await Author.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!author) {
      logger.warn("Author doesn't exist");

      return res.status(404).json({
        success: false,
        message: "Author not found ",
      });
    }

    logger.info("Updated Author successfully... ");

    return res.status(200).json({
      success: true,
      message: "Update Author successfully... ",
      author: author,
    });
  } catch (error) {
    return res.status(500).status({
      success: false,
      message: error.message,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Deleting Author by id endpoint");

    // find the author with id
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      logger.warn("Author doesn't exist with id");
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    logger.info("Author is deleted successfully");

    return res.status(200).json({
      success: true,
      message: "Author is deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createAuthor, listAuthor, deleteAuthor, updateAuthor };
