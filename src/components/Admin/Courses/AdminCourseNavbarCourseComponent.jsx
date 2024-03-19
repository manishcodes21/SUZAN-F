"use client";
import Dropdown from "@/components/TailwindComponents/Dropdown";
import { FaSearch, FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import React, { useState } from "react";
import CoursesTable from "./CoursesTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropdown2 from "@/components/TailwindComponents/FormDropdown";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const AdminCourseNavbarCourseComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  const programs = ["Btech", "Mtech"];
  const fieldsOfStudy = ["CSE", "ECE"];
  const semesters = ["I", "II", "III", "IV"];

  //form useStates
  const [formselectedProgram, setFormSelectedProgram] = useState("");
  const [formSelectedFieldOfStudy, setFormSelectedFieldOfStudy] = useState("");
  const [formSelectedSemesters, setFormSelectedSemesters] = useState("");
  const [courseDetails, setCourseDetails] = useState({
    course_name: "",
    course_code: "",
    course_type: "",
    credits: 0,
    college_name: "",
    instructor_name: "",
    instructor_photo: "",
    syllabus: "",
    resources: [""],
    notes: [""],
    pyq: [""],
  });

  // Dummy courses data
  const courses = [
    // Array of course objects with properties like course code, course name, credits, professor name, view Button,  edit Button
    // Example:
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 1,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 2,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 3,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 4,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 5,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 6,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 7,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 8,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 9,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 10,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 11,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 12,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 13,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 14,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 15,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      credits: 16,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS104",
      name: "Introduction to Computer Science",
      credits: 17,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS103",
      name: "Introduction to Computer Science",
      credits: 18,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
    {
      code: "CS102",
      name: "Introduction to Computer Science",
      credits: 19,
      professor: "Dr. John Doe",
      // Add your view and edit Button  functionality here
      viewButton: (
        <Button onClick={() => handleView(course)}>
          <FaEye size={20} />
        </Button>
      ),
      editButton: (
        <Button onClick={() => handleEdit(course)}>
          <MdEdit size={20} />
        </Button>
      ),
      deleteButton: (
        <Button onClick={() => handleDelete(course)}>
          <MdDelete size={20} />
        </Button>
      ),
    },
  ];

  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (field, index, value) => {
    const newDetails = { ...courseDetails };
    newDetails[field][index] = value;
    setCourseDetails(newDetails);
  };

  const handleAddField = (field) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ""],
    }));
  };

  const handleDeleteField = (field, index) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };
  return (
    <div>
      {/* dropdowns */}
      <div className="flex justify-end items-center pb-2 md:pb-5">
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5"
        >
          Add Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-5 ">
        <Dropdown
          name="Program"
          options={programs}
          onSelect={setSelectedProgram}
        />
        <Dropdown
          name="Field Of Study"
          options={fieldsOfStudy}
          onSelect={setSelectedFieldOfStudy}
        />
        <Dropdown
          name="Semester"
          options={semesters}
          onSelect={setSelectedSemester}
        />
        <div className="w-full md:w-[250px]">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Program"
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      {/* tables */}
      <div className="py-2 md:py-5">
        <CoursesTable courses={courses} />{" "}
        {/* Include the CoursesTable component and pass current courses */}
      </div>

      {/* Modal */}
      <Modal
        //  style={{ zIndex: 9999 }}
        open={modalOpen}
        // onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,

            width: "50%",
            "@media (max-width: 1024px)": {
              width: "60%",
            },
            "@media (max-width: 768px)": {
              width: "90%",
              maxHeight: "95vh",
            },
            maxHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            X
          </Button>
          <div
            // onSubmit={handleSubmit}
            className="flex  flex-col w-full h-full py-6 text-center bg-white "
          >
            <h3 className="pb-5  text-[25px]  md:text-[35px]  font-extrabold text-dark-grey-900">
              Add Course Details
            </h3>
            <div className="py-2 md:pt-3 flex flex-col">
              <label
                htmlFor="programName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Program*
              </label>
              <Dropdown2
                name="Program"
                options={programs}
                onSelect={setFormSelectedProgram}
              />
            </div>
            <div className="pb-2  flex flex-col">
              <label
                htmlFor="fieldofstudyName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Field Of Study*
              </label>
              <Dropdown2
                name="FieldOfStudy"
                options={fieldsOfStudy}
                onSelect={setFormSelectedFieldOfStudy}
              />
            </div>
            <div className="pb-2 md:pb-8 flex flex-col">
              <label
                htmlFor="semesterName"
                className="mb-2 text-sm text-start text-grey-900 "
              >
                Select Semester*
              </label>
              <Dropdown2
                name="Semester"
                options={semesters}
                onSelect={setFormSelectedSemesters}
              />
            </div>

            {/* Inputs */}
            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Name*
            </label>
            <input
              id="coursename"
              type="text"
              value={courseDetails.course_name}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Code*
            </label>
            <input
              id="coursecode"
              type="text"
              value={courseDetails.course_code}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="CS3010"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Course Type*
            </label>
            <input
              id="coursetype"
              type="text"
              value={courseDetails.course_type}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Compulsory "
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Credits*
            </label>
            <input
              id="credits"
              type="number"
              value={courseDetails.credits}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Instructor Name*
            </label>
            <input
              id="instructorname"
              type="text"
              value={courseDetails.instructor_name}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Sraban Mohanty"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Instructor Photo*
            </label>
            <input
              id="instructorphoto"
              type="upload"
              value={courseDetails.instructor_photo}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="fieldofstudyName"
              className="mb-2 text-sm text-start text-grey-900 "
            >
              Upload Syllabus*
            </label>
            <input
              id="syllabus"
              type="text"
              value={courseDetails.syllabus}
              onChange={(e) => setCourseDetails(e.target.value)}
              placeholder="Data Structures and Algorithms"
              className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm
                lg:text-[16px] font-medium outline-none focus:border-black mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300 "
              required
            />

            <label
              htmlFor="resources"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Resources*
            </label>
            {courseDetails.resources.map((resource, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={resource}
                  onChange={(e) =>
                    handleInputChange("resources", index, e.target.value)
                  }
                  placeholder="Resource Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden "
                      onClick={() => handleDeleteField("resources", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("resources", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button
              onClick={() => handleAddField("resources")}
              cariant="outlined"
            >
              + Add More Resources
            </Button>

            <label
              htmlFor="notes"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload Notes*
            </label>
            {courseDetails.notes.map((note, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={note}
                  onChange={(e) =>
                    handleInputChange("notes", index, e.target.value)
                  }
                  placeholder="Note Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden "
                      onClick={() => handleDeleteField("notes", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("notes", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button onClick={() => handleAddField("notes")} cariant="outlined">
              + Add More Notes
            </Button>

            <label
              htmlFor="pyq"
              className="mb-2 text-sm text-start text-grey-900"
            >
              Upload PYQ*
            </label>
            {courseDetails.pyq.map((pyq, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  value={pyq}
                  onChange={(e) =>
                    handleInputChange("pyq", index, e.target.value)
                  }
                  placeholder="PYQ Name"
                  className="flex items-center w-full px-2 py-2 md:px-5 md:py-3 mr-2 text-sm lg:text-[16px] font-medium outline-none focus:border-black  placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-md border border-gray-300"
                  required
                />
                {index > 0 && (
                  <>
                    <Button
                      style={{ textTransform: "none" }}
                      className="max-md:hidden "
                      onClick={() => handleDeleteField("pyq", index)}
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      className="md:hidden"
                      onClick={() => handleDeleteField("pyq", index)}
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </div>
            ))}
            <Button onClick={() => handleAddField("pyq")} cariant="outlined">
              + Add More PYQs
            </Button>

            <div className="pb-2 pt-4">
              {/* <p className="text-red-500 text-sm  text-center">{error}</p> */}
              <Button variant="outlined">Add Course</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCourseNavbarCourseComponent;
